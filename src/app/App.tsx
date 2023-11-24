import "@/app/assets/scss/base.scss"
import "@/app/assets/scss/app.scss"
import "react-i18n-editor/dist/styles/main.css"

import i18next from "i18next"
import { StrictMode, Suspense, useState } from "react"
import { I18nEditorContainer, I18nextMiddleware } from "react-i18n-editor"
import { I18nextProvider, useTranslation } from "react-i18next"
import { Provider } from "react-redux"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { Link } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import { localeCurrent } from "@/i18n/config"
import { ModalContainer } from "@/modules/modal/container"
import { Modal } from "@/modules/modal/controller"
import store from "@/redux/store"
import { classWithModifiers } from "@/utils/common"

import Button from "./components/common/Button/Button"
import ButtonLink from "./components/common/Button/ButtonLink"
import Icon from "./components/common/Icon/Icon"
import PopupForm from "./components/popups/PopupForm"
import ErrorBoundary from "./components/services/ErrorBoundary"
import ErrorView from "./views/error/ErrorView"
import HomeView from "./views/home/HomeView"

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <I18nextProvider defaultNS={localeCurrent} i18n={i18next}>
            <I18nEditorContainer middleware={I18nextMiddleware}>
              <Suspense fallback="Loading...">
                <ErrorBoundary fallback="Error">
                  <Header />
                  <Main />
                  <ModalContainer />
                  <ToastContainer />
                </ErrorBoundary>
              </Suspense>
            </I18nEditorContainer>
          </I18nextProvider>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  )
}

function Header() {
  const { t } = useTranslation("translation", { keyPrefix: "header" })
  const [expanded, setExpanded] = useState(false)

  return (
    <header>
      <div className="topbar">
        <div aria-label="Home">
          <img src="/static/images/logo.svg" alt="logo" className="topbar__logo" />
          <img src="/static/icons/logo.svg" alt="logo" className="topbar__logo topbar__logo--mobile" />
          <Link className="ghost" to="/" />
        </div>
        <Icon className="topbar__trigger" name={expanded ? "cross" : "menu"} onClick={() => setExpanded(!expanded)} />
        <div className={classWithModifiers("topbar__right", expanded && "expanded")}>
          <div className="topbar-menu">
            <ButtonLink size="small" to="/mentors">{t("menu.mentors")}</ButtonLink>
            <Button size="small" onClick={() => Modal.open(PopupForm, { type: "become_mentor", weak: true })}>{t("menu.becomeMentor")}</Button>
          </div>
          <Button outline size="small" color="green" onClick={() => Modal.open(PopupForm, { type: "choose_mentor", weak: true })}>{t("findMentor")}</Button>
        </div>
      </div>
    </header>
  )
}



function Main() {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route index element={<HomeView />} />
        </Route>
        <Route path="/*" element={<ErrorView />} />
      </Routes>
    </main>
  )
}

export default App
