import type { ModalProps } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Col, Form, Modal, Row, Stack } from "../bootstrap"
import { LoadingButton } from "../buttons"
import Input from "../forms/Input"
import PasswordInput from "../forms/PasswordInput"
import { CreateUserWithEmailAndPasswordData } from "./hooks"

export default function OrgSignUpModal({
  show,
  onHide
}: Pick<ModalProps, "show" | "onHide">) {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm<CreateUserWithEmailAndPasswordData>()

  const onSubmit = handleSubmit(newOrg => {
    console.log("sign up new org", newOrg)
  })

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="sign-up-org-modal"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="sign-up-org-modal">
          Organization or Legislator Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col md={11} className="mx-auto">
          <Form noValidate onSubmit={onSubmit}>
            <Stack gap={3} className="mb-4">
              <p>
                Your account will be authenticated and ready for use within 72
                hours. Please be sure to verify your email address after
                registering.
              </p>

              <Input
                label="Email"
                type="email"
                bottomLabel="Please use your professional or government email."
                {...register("email", { required: "An email is required." })}
                error={errors.email?.message}
              />

              <Input
                label="Full Name"
                type="text"
                {...register("fullName", {
                  required: "A full name is required."
                })}
                error={errors.fullName?.message}
              />

              <Input
                label="Nickname"
                type="text"
                {...register("nickname", {
                  required: "A nickname is required."
                })}
                error={errors.nickname?.message}
              />

              <Row className="g-3">
                <Col md={6}>
                  <PasswordInput
                    label="Password"
                    {...register("password", {
                      required: "A password is required.",
                      minLength: {
                        value: 8,
                        message: "Your password must be 8 characters or longer."
                      },
                      deps: ["confirmedPassword"]
                    })}
                    error={errors.password?.message}
                  />
                </Col>

                <Col md={6}>
                  <PasswordInput
                    label="Confirm Password"
                    {...register("confirmedPassword", {
                      required: "You must confirm your password.",
                      validate: confirmedPassword => {
                        const password = getValues("password")
                        return confirmedPassword !== password
                          ? "Confirmed password must match password."
                          : undefined
                      }
                    })}
                    error={errors.confirmedPassword?.message}
                  />
                </Col>
              </Row>
            </Stack>

            <Stack gap={4}>
              <LoadingButton type="submit" className="w-100" loading={false}>
                Sign Up
              </LoadingButton>
            </Stack>
          </Form>
        </Col>
      </Modal.Body>
    </Modal>
  )
}
