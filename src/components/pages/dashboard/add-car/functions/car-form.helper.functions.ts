import { Dispatch, SetStateAction } from 'react'
import { openaiCostsAnalysisCompletion } from '../../my-cars/functions/openai/analysis-chat-completion'
import { toast } from 'sonner'

export async function handleGenerateAIAnalysis(
  id: string | number | null,
  setIsAnalysisGenerating?: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  if (id) {
    setIsAnalysisGenerating?.(true)
    try {
      const result = await openaiCostsAnalysisCompletion({
        userCarId: id
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        'There was an error while generating the AI Analysis:',
        error?.message
      )
      toast.error(
        error.message ||
          'There was an error while trying to generate the car analysis.'
      )
    } finally {
      setIsAnalysisGenerating?.(false)
    }
  }
}
