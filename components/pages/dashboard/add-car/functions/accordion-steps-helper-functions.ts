import { formStepIdMap } from '../consts/consts'
import { CarFormFields, FormSteps, FormStepsIDs } from '../../../../types/add-car/types'

export function onNextStep(
  currentStep: string,
  currentIndex: number,
  setState: React.Dispatch<React.SetStateAction<FormStepsIDs>>,
  advancedFormSteps: FormSteps<CarFormFields>[]
) {
  if (currentIndex < 0 || currentIndex >= advancedFormSteps.length - 1) return
  const nextStepIndex = currentIndex + 1
  const nextStepID: FormStepsIDs = formStepIdMap[nextStepIndex]
  return setState(nextStepID)
}

export function onPreviousStep(
  currentStep: string,
  currentIndex: number,
  setState: React.Dispatch<React.SetStateAction<FormStepsIDs>>
) {
  if (currentIndex === 0) return
  const previousStepIndex = currentIndex - 1
  const previousStepID: FormStepsIDs = formStepIdMap[previousStepIndex]
  return setState(previousStepID)
}
