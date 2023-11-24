import "./HomeView.scss"

import { useTranslation } from "react-i18next"
import { useParams } from "react-router"

import HaveQuestions from "@/app/components/other/HaveQuestions/HaveQuestions"
import MentorSearch from "@/app/components/other/MentorSearch/MentorSearch"
import BigComment from "@/app/components/UI/BigComment/BigComment"
import InfoSection from "@/app/components/UI/InfoSection/InfoSection"
import useScrollToTop from "@/hooks/useScrollToTop"

import BecomeMentor from "./BecomeMentor/BecomeMentor"
import DynamicPrimaryInfo from "./DynamicPrimaryInfo/DynamicPrimaryInfo"
import HelpfulCreaty from "./HelpfulCreaty/HelpfulCreaty"
import HowItWorks from "./HowItWorks/HowItWorks"
import MailingSubscribe from "./MailingSubscribe/MailingSubscribe"


function HomeView() {
  useScrollToTop()
  const { t } = useTranslation("translation", { keyPrefix: "views.home" })
  const params = useParams<"shortcut">()

  return (
    <div className="home-view">
      <div className="home-view__header">
        <DynamicPrimaryInfo firstHeadingShortcut={params.shortcut} />
        <div className="home-view__search">
          <MentorSearch />
        </div>
      </div>
      <div className="home-view__comment">
        <BigComment>{t("bigComment")}</BigComment>
      </div>
      <div className="home-view__help">
        <InfoSection type="2" display="flex" {...t("help")}>
          1
        </InfoSection>
      </div>
      <div className="home-view__how-it-works">
        <HowItWorks />
      </div>
      <div className="home-view__helpful-creaty">
        <HelpfulCreaty />
      </div>
      <div className="home-view__faq">
        <h2 className="heading">{t("QAndA.title")}</h2>
      </div>
      <div className="home-view__have-questions">
        <HaveQuestions />
      </div>
      <div className="home-view__become-mentor">
        <BecomeMentor />
      </div>
      <div className="home-view__mailing-subscribe">
        <MailingSubscribe />
      </div>
    </div>
  )
}

export default HomeView
