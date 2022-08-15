import { useState } from "react"
import { Button } from "../bootstrap"
import ForgotPasswordModal from "./ForgotPasswordModal"
import OrgSignUpModal from "./OrgSignUpModal"
import SignInModal from "./SignInModal"
import SignUpModal from "./SignUpModal"
import StartModal from "./StartModal"

interface Props {
  label?: string
  className?: string
}

type AuthModal =
  | "start"
  | "signIn"
  | "signUp"
  | "orgSignUp"
  | "forgotPassword"
  | null

export default function SignInWithModal({
  label = "Log in / Sign up",
  className
}: Props) {
  const [currentModal, setCurrentModal] = useState<AuthModal>(null)

  const close = () => setCurrentModal(null)

  return (
    <span className={className}>
      <Button variant="primary" onClick={() => setCurrentModal("start")}>
        {label}
      </Button>

      <StartModal
        show={currentModal === "start"}
        onHide={close}
        onSignInClick={() => setCurrentModal("signIn")}
        onSignUpClick={() => setCurrentModal("signUp")}
      />
      <SignInModal
        show={currentModal === "signIn"}
        onHide={close}
        onForgotPasswordClick={() => setCurrentModal("forgotPassword")}
      />
      <SignUpModal
        show={currentModal === "signUp"}
        onHide={close}
        onOrgSignUpClick={() => setCurrentModal("orgSignUp")}
      />
      <OrgSignUpModal show={currentModal === "orgSignUp"} onHide={close} />
      <ForgotPasswordModal
        show={currentModal === "forgotPassword"}
        onHide={() => setCurrentModal("signIn")}
      />
    </span>
  )
}
