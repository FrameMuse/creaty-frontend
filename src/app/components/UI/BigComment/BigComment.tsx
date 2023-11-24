import "./BigComment.scss"

import { ReactNode } from "react"

import Icon from "@/app/components/common/Icon/Icon"


interface BigCommentProps {
  children: ReactNode
}

function BigComment(props: BigCommentProps) {
  return (
    <div className="big-comment">
      <div className="big-comment__text">{props.children}</div>
      <Icon className="big-comment__icon" name="star-union" />
    </div>
  )
}


export default BigComment
