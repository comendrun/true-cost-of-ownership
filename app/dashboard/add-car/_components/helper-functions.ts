import { formStepIdMap } from '../_consts/consts'
import { FormStepsIDs } from './_types/types'

export function onNextStep(
  currentStep: string,
  currentIndex: number,
  setState: React.Dispatch<React.SetStateAction<FormStepsIDs>>
) {
  console.log(`Current Step: ${currentStep}, Current Index: ${currentIndex}`)
  if (currentIndex < 0 || currentIndex >= 11) return
  const nextStepIndex = currentIndex + 1
  const nextStepID: FormStepsIDs = formStepIdMap[nextStepIndex]
  console.log(`Next Step Index: ${nextStepIndex}, Next Step ID: ${nextStepID}`)
  return setState(nextStepID)
}

export function onPreviousStep(
  currentStep: string,
  currentIndex: number,
  setState: React.Dispatch<React.SetStateAction<FormStepsIDs>>
) {
  console.log(`Current Step: ${currentStep}, Current Index: ${currentIndex}`)
  if (currentIndex === 0) return
  const previousStepIndex = currentIndex - 1
  const previousStepID: FormStepsIDs = formStepIdMap[previousStepIndex]
  console.log(
    `Previous Step Index: ${previousStepIndex}, Previous Step ID: ${previousStepID}`
  )
  return setState(previousStepID)
}
