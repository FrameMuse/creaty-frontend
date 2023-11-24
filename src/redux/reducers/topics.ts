import { Dispatch } from "redux"

import { ValuesOf } from "@/interfaces/common"
import { MapActions } from "@/interfaces/reducer"
import { TagType, TopicType } from "@/interfaces/types"


const initialState: {
  list: TopicType[]
  tags: TagType[]
} = {
  list: [],
  tags: []
}

interface Actions {
  TOPICS_UPDATE: Partial<typeof initialState>
}

type Action = ValuesOf<MapActions<Actions>>

export default (state = initialState, action: Action): typeof initialState => {
  switch (action.type) {

    case "TOPICS_UPDATE":
      return { ...state, ...action.payload }

    default:
      return state
  }
}

/* Plain Redux Actions */

export const topicsUpdate = (payload: Partial<typeof initialState>) => ({
  type: "TOPICS_UPDATE",
  payload
})