import { Dispatch } from "redux"

import { ValuesOf } from "@/interfaces/common"
import { MapActions } from "@/interfaces/reducer"
import { FormType } from "@/interfaces/types"


const initialState: Partial<Record<FormType["type"], FormType>> = {}

interface Actions {
  FORMS_UPDATE: typeof initialState
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "FORMS_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

/* Plain Redux Actions */

export const formsUpdate = (payload: Partial<typeof initialState>) => ({
  type: "FORMS_UPDATE",
  payload
})
