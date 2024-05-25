import { Field } from 'payload/types'

import PerfumeMilSelector from '../../../app/_components/PerfumeMilSelector'

export const CustomSelectField: Field = {
  name: 'customSelectField',
  type: 'text',
  admin: {
    components: {
      Field: PerfumeMilSelector,
    },
  },
}
