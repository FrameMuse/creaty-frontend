import "./TopicTag.scss"

import { ReactNode } from "react"
import { classWithModifiers } from "utils/common"


interface TopicTagProps {
  noHash?: boolean
  children: ReactNode
}

function TopicTag(props: TopicTagProps) {
  return (
    <button className={classWithModifiers("topic-tag", props.noHash && "no-hash")} {...props} type="button" />
  )
}


export default TopicTag
