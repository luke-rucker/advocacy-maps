import { useId } from "@react-aria/utils"
import clsx from "clsx"
import { forwardRef } from "react"
import type { FormControlProps } from "react-bootstrap"
import { Form, FloatingLabel } from "../bootstrap"

type InputProps = Omit<
  FormControlProps,
  // we manage these props, so we want ts to yell at you if you pass them in
  "placeholder" | "isInvalid" | "aria-invalid" | "aria-describedby"
> & {
  label: string
  error?: string
  bottomLabel?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, bottomLabel, ...restProps }, ref) => {
    const id = useId()
    const errorId = `${id}-error`
    const bottomLabelId = `${id}-bottom-label`

    const hasError = Boolean(error)

    return (
      <Form.Group controlId={id} className={className}>
        <FloatingLabel controlId={id} label={label}>
          <Form.Control
            {...restProps}
            ref={ref}
            placeholder={label}
            isInvalid={hasError}
            aria-invalid={hasError}
            aria-describedby={clsx(hasError && errorId, bottomLabelId)}
          />

          {!hasError && bottomLabel ? (
            <Form.Text id={bottomLabelId}>{bottomLabel}</Form.Text>
          ) : null}

          {hasError ? (
            <Form.Control.Feedback type="invalid" id={errorId}>
              {error}
            </Form.Control.Feedback>
          ) : null}
        </FloatingLabel>
      </Form.Group>
    )
  }
)

Input.displayName = "Input"

export default Input
