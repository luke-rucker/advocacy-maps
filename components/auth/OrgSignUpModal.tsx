import { useEffect } from "react"
import type { ModalProps } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { Alert, Col, Form, Modal, Row, Stack } from "../bootstrap"
import { LoadingButton } from "../buttons"
import Input from "../forms/Input"
import PasswordInput from "../forms/PasswordInput"
import Select from "../forms/Select"
import {
  CreateOrgWithEmailAndPasswordData,
  useCreateOrgWithEmailAndPassword
} from "./hooks"

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
  } = useForm<CreateOrgWithEmailAndPasswordData>()

  const createOrgWithEmailAndPassword = useCreateOrgWithEmailAndPassword()

  useEffect(() => {
    if (!show) {
      reset()
      createOrgWithEmailAndPassword.reset()
    }
    // could not add a reference to createUserWithEmailAndPassword.reset to dep array without triggering an infinite effect, so:
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [show, reset])

  const onSubmit = handleSubmit(newOrg => {
    createOrgWithEmailAndPassword.execute(newOrg)
  })

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="org-sign-up-modal"
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="org-sign-up-modal">
          Organization or Legislator Sign Up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col md={11} className="mx-auto">
          {createOrgWithEmailAndPassword.error ? (
            <Alert variant="danger">
              {createOrgWithEmailAndPassword.error.message}
            </Alert>
          ) : null}

          <Form noValidate onSubmit={onSubmit}>
            <Stack gap={3} className="mb-4">
              <Select
                label="Organization Type"
                options={[
                  { label: "Organization", value: "organization" },
                  { label: "Legislator", value: "legislator" }
                ]}
                {...register("role", {
                  required: "An organization type is required."
                })}
                error={errors.role?.message}
              />

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

            <Stack gap={3}>
              <LoadingButton
                type="submit"
                className="w-100"
                loading={createOrgWithEmailAndPassword.loading}
              >
                Sign Up
              </LoadingButton>

              <p className="text-center">
                Your account will be authenticated and ready for use within 72
                hours. Please be sure to verify your email address after signing
                up.
              </p>
            </Stack>
          </Form>
        </Col>
      </Modal.Body>
    </Modal>
  )
}
