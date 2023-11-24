import "./PopupLayout.scss"

import { ReactNode } from "react"

import { useModal } from "@/modules/modal/hook"

import ButtonIcon from "../common/Button/ButtonIcon"

interface PopupLayoutProps {
  title: string
  width?: string
  children: ReactNode
}

function PopupLayout(props: PopupLayoutProps) {
  const { close, component } = useModal()
  return (
    <div className="popup-layout" style={{ width: props.width }}>
      <div className="popup-layout__close">
        <ButtonIcon name="cross" size="small" color="white" outline onClick={close} />
      </div>
      <h3 className="popup-layout__title heading">{props.title}</h3>
      <div className="popup-layout__container">{props.children}</div>
    </div>
  )
}

export default PopupLayout
