import React, { useState, useEffect } from 'react'
import styles from './EmailInput.module.scss'
import { useLanguage } from '@/shared/lang'

const EmailInput = ({
  name = 'email',
  id = 'inputEmail',
  required = true,
  value: propValue,
  onChange: propOnChange,
  onValidate,
  isTouched,
  ...props
}) => {
  const { language } = useLanguage()
  const [error, setError] = useState('')

  const isControlled = propValue !== undefined
  const [internalValue, setInternalValue] = useState(propValue || '')
  const value = isControlled ? propValue : internalValue

  const placeholder = language === 'en' ? 'Enter email' : 'Введите почту'
  const invalidMessage = language === 'en' ? 'example@email.com' : 'example@email.com 👈'

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const handleChange = e => {
    const newValue = e.target.value

    if (!isControlled) {
      setInternalValue(newValue)
    }

    if (propOnChange) {
      propOnChange(e)
    }

    let errorMessage = ''
    if (required && !newValue) {
      errorMessage = language === 'en' ? 'Email is required' : 'Почта обязательна 👈'
    } else if (newValue && !validateEmail(newValue)) {
      errorMessage = invalidMessage
    }

    setError(errorMessage)

    if (onValidate) {
      onValidate({ value: newValue, error: errorMessage })
    }
  }

  useEffect(() => {
    if (isTouched) {
      handleChange({ target: { value } })
    }
  }, [isTouched])

  return (
    <div className={styles.EmailInput_container}>
      <input
        className={`${styles.EmailInput_input} ${error ? styles.EmailInput_input_error : ''}`}
        type="email"
        name={name}
        id={id}
        autoComplete="email"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        {...props}
      />
      <img src="login/email.svg" alt="" className={styles.EmailInput_icon} />
      {error && <div className={styles.EmailInput_errorMessage}>{error}</div>}
    </div>
  )
}

export default EmailInput
