import { UserSettingsFields } from '@/features/settings/types/types'
import { CURRENCIES, COUNTRIES } from '@/data/app.consts'
import { FormFieldType } from '@/types/form-field.types'

export const settingsPageFields: FormFieldType<UserSettingsFields>[] = [
  {
    key: 'email',
    label: 'Email',
    component: 'input',
    type: 'string',
    disabled: true,
    placeholder: 'Email',
    required: true
  },
  {
    key: 'username',
    label: 'Username',
    component: 'input',
    type: 'string',
    placeholder: 'Username',
    required: true
  },
  {
    key: 'firstName',
    label: 'First Name',
    component: 'input',
    type: 'string',
    placeholder: 'First Name',
    required: false
  },
  {
    key: 'lastName',
    label: 'Last Name',
    component: 'input',
    type: 'string',
    placeholder: 'Last Name',
    required: false
  },
  {
    key: 'preferredCurrency',
    label: 'Your Preferred Currency',
    component: 'select',
    type: 'string',
    placeholder: 'Currency',
    required: false,
    selectItems: [...CURRENCIES]
  },
  {
    key: 'preferredCountry',
    label: 'Your Country',
    component: 'select',
    type: 'string',
    placeholder: 'Country',
    required: false,
    selectItems: [...COUNTRIES]
  }
]
