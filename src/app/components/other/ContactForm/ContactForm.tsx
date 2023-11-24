import "./ContactForm.scss"

import { ChangeEvent, useState } from "react"
import { useTranslation } from "react-i18next"
import ReactMarkdown from "react-markdown"
import { useSelector } from "react-redux"

import Button from "@/app/components/common/Button/Button"
import Input, { InputStrainType as InputMaskType } from "@/app/components/UI/Input/Input"
import LoaderCover from "@/app/components/UI/Loader/LoaderCover"
import { FormFieldType, FormType } from "@/interfaces/types"


interface ContactFormProps {
  type: FormType["type"]

  submitText?: string
  onSubmit?(): void
}

function ContactForm(props: ContactFormProps) {
  const { t } = useTranslation("translation", { keyPrefix: "components.contactForm" })
  const form = useSelector(state => state.forms[props.type])
  const [submitted, setSubmitted] = useState(false)
  const [socialMask, setSocialMask] = useState<InputMaskType<string>>()

  if (submitted) {
    return (
      <div className="contact-form">
        <p className="contact-form__content">{form?.post_send}</p>
      </div>
    )
  }

  function onPhoneOrNickChange(event: ChangeEvent<HTMLInputElement>, mask?: InputMaskType<FormFieldType["type"]>) {
    if (!mask) return
    if (["whats_app", "viber"].includes(mask.value)) {
      const target = event.currentTarget
      const maskedValue = target.value.replace(/(?:(\d+))(\d{3})(\d{3})(\d{2})(\d{2})$/gm, "+$1 ($2) $3 $4-$5")

      target.value = maskedValue
    }
  }

  const includesSocial = (field: FormFieldType) => ["telegram", "facebook", "whats_app", "viber"].includes(field.type)
  const name = form?.fields.find(field => field.type === "name")
  const email = form?.fields.find(field => field.type === "email")
  const social = form?.fields.find(field => socialMask?.value ? (field.type === socialMask?.value) : includesSocial(field))
  const about = form?.fields.find(field => field.type === "about")

  function mapInputMasks() {
    if (form == null) return []
    return form.fields.filter(includesSocial).map(field => {
      return {
        title: t("fields")[field.type as "telegram", "facebook", "whats_app", "viber"].title,
        value: field.type
      }
    })
  }
  return (
    <form className="contact-form">
      {form == null && (
        <LoaderCover />
      )}
      {!!form?.description?.length && (
        <div className="contact-form__content">
          <ReactMarkdown>{form.description}</ReactMarkdown>
        </div>
      )}
      <div className="contact-form__inputs">
        {name && (
          <Input placeholder={name.placeholder} type="text" name="name" required />
        )}
        {email && (
          <Input placeholder={email.placeholder} type="email" name="email" required />
        )}
        {social && (
          <Input placeholder={social.placeholder} name={socialMask?.value} required masks={mapInputMasks()} onChange={onPhoneOrNickChange} onMaskSelect={setSocialMask} />
        )}
        {about && (
          <div className="input">
            <textarea className="input__input" name="about" placeholder={about.placeholder}></textarea>
          </div>
        )}
      </div>
      <Button className="contact-form__submit" size="big" type="submit" color="dark" eventLabel="Contact Form">{props.submitText || t("submit")}</Button>
      <div className="contact-form__terms">{t("terms")}</div>
    </form>
  )
}

export default ContactForm
