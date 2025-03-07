import "./Subscribe.scss"

import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"

import Button from "@/app/components/common/Button/Button"
import { classWithModifiers } from "@/utils/common"


function Subscribe() {
  const { t } = useTranslation("translation", { keyPrefix: "components.subscribe" })
  const { value, isValueValid, onChange } = useInputValidation(/^\s*\w+@[a-zA-Z]+\.\w{2,}\s*$/m)
  const [subscribed, setSubscribed] = useState(false)
  return (
    <div className="subscribe">
      <div className="subscribe__header">
        <div className={classWithModifiers("subscribe__field", !isValueValid && "red", subscribed && "dark")}>
          {!subscribed && (
            <input className="subscribe__input" type="text" placeholder={t("placeholder")} onChange={onChange} />
          )}
          {subscribed && (
            <span>{t("thanks")}</span>
          )}
        </div>
        <Button outline size="small" color="green" eventLabel="Subscription">{t("button")}</Button>
      </div>
      <p className="subscribe__text">{t("terms")}</p>
    </div>
  )
}


function useInputValidation(validation?: RegExp) {
  const [value, setValue] = useState("")
  const [isValueValid, setIsValueValid] = useState(true)
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value
    setValue(value)

    if (validation) {
      if (!value.length) {
        setIsValueValid(true)
        return
      }

      setIsValueValid(validation.test(value))
    }
  }
  return {
    value,
    isValueValid,
    onChange
  }
}


export default Subscribe
