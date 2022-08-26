import { useId } from "@react-aria/utils"
import clsx from "clsx"
import { forwardRef } from "react"
import type { FormSelectProps } from "react-bootstrap"
import { Form, FloatingLabel } from "../bootstrap"

type Option = {
  value: string | number
  label: string
}

type SelectProps = Omit<
  FormSelectProps,
  // we manage these props, so we want ts to yell at you if you pass them in
  "aria-label" | "isInvalid" | "aria-invalid" | "aria-describedby"
> & {
  label: string
  options: Option[]
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, ...restProps }, ref) => {
    const id = useId(restProps?.id)
    const errorId = `${id}-error`

    const hasError = Boolean(error)

    return (
      <Form.Group controlId={id} className={className}>
        <FloatingLabel controlId={id} label={label}>
          <Form.Select
            {...restProps}
            ref={ref}
            aria-label={label}
            isInvalid={hasError}
            aria-invalid={hasError}
            aria-describedby={clsx(hasError && errorId)}
          >
            {options.map(option => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>

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

Select.displayName = "Select"

export default Select
