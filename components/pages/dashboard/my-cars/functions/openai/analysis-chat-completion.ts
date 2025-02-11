'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import {
  ChatCompletionResponseFormat,
  ChatCompletionResponseFormatSchema
} from './analysis-response-schema'
import { generateOpenAIAnalysisChatCompletionMessage } from './generate-analysis-chat-completion-message'
import { Json } from '@/database.types'

export async function openaiCostsAnalysisCompletion({
  userCarId
}: {
  userCarId: string | number
}) {
  console.log('Starting OpenAI costs analysis completion process')
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  const supabase = createClient()

  const {
    data: { user },
    error: getUserError
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('The User is not authenticated.')
  } else if (getUserError) return getUserError

  console.log('the user is authenticated: User id', user.id)

  const { data: userCar, error: getUserCarError } = await supabase
    .from('user_cars')
    .select()
    .eq('user_id', user.id)
    .eq('id', userCarId)
    .single()

  if (!userCar) {
    throw new Error(
      'No car found with the provided ID for the authenticated user.'
    )
  } else if (getUserCarError) {
    console.error(`Error fetching user car: ${getUserCarError}`)
    throw new Error(`Error fetching user car.`)
  }

  const { data: carAIResponseVersion, error: getCarAIResponseError } =
    await supabase
      .from('ai_responses')
      .select('version')
      .eq('car_id', userCarId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

  if (
    carAIResponseVersion?.version &&
    carAIResponseVersion.version === userCar.version
  ) {
    throw new Error(
      'There has been no changes since last AI Analysis generated.'
    )
  }

  console.log('the user car was found:', userCar)

  const content = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: generateOpenAIAnalysisChatCompletionMessage(userCar, user),
    max_tokens: 16384,
    response_format: zodResponseFormat(
      ChatCompletionResponseFormatSchema,
      'event'
    )
  })

  let chatCompletionResponse: ChatCompletionResponseFormat | null = null

  try {
    // Access the specific property that contains the string content
    const messageContent = content.choices[0].message.content
    console.log('message content', messageContent)

    // Remove markdown syntax (both leading and trailing backticks)
    const cleanedContent: string = messageContent
      ?.replace(/```(?:json)?/g, '')
      .replace(/```$/, '')
      .trim() as string

    console.log('cleanedContent', cleanedContent)

    chatCompletionResponse = JSON.parse(
      cleanedContent
    ) as ChatCompletionResponseFormat
  } catch (error) {
    console.error('There was an error while trying to parse the data', error)
  }

  if (!chatCompletionResponse) {
    console.error(
      'There was no proper result from AI Agent. Please try again later.'
    )
    throw new Error(
      'There was no proper result from AI Agent. Please try again later.'
    )
  }

  console.log('chatCompletionResponse', chatCompletionResponse)

  const { data: savedAIResponse, error: saveAIResponseError } = await supabase
    .from('ai_responses')
    .insert({
      // ...chatCompletionResponse,
      response: chatCompletionResponse.response,
      cost_saving_opportunities:
        chatCompletionResponse?.cost_saving_opportunities,
      analysis_metrics: JSON.stringify(
        chatCompletionResponse?.analysis_metrics
      ),
      analysis_summary: chatCompletionResponse.analysis_summary,
      version: carAIResponseVersion?.version,
      recommended_insurances: [chatCompletionResponse.recommended_insurances],
      car_id: Number(userCarId),
      suggested_driving_tips: chatCompletionResponse.suggested_driving_tips,
      feedback: chatCompletionResponse.feedback
    })
    .select()
    .single()

  if (saveAIResponseError) {
    console.error(
      'The was an error while saving the AI response',
      saveAIResponseError
    )
    throw new Error('There was an error while saving the AI response.')
  }

  revalidatePath(`/dashboard/my-cars/${userCarId}/edit`)
}
