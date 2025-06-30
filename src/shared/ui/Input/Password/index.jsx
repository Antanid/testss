import React, { useState, useEffect } from 'react'
import styles from './PasswordInput.module.scss'
import { useLanguage } from '@/shared/lang'

const PasswordInput = ({
  name = 'password',
  id = 'inputPassword',
  required = true,
  value: propValue,
  onChange: propOnChange,
  onValidate,
  isTouched,
  passwordToCompare,
  withVisibilityToggle,
  ...props
}) => {
  const { language } = useLanguage()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [error, setError] = useState('')

  const isControlled = propValue !== undefined
  const [internalValue, setInternalValue] = useState(propValue || '')
  const value = isControlled ? propValue : internalValue

  const showToggleButton = withVisibilityToggle !== undefined ? withVisibilityToggle : false

  const placeholder = language === 'en' ? 'Enter password' : 'Введите пароль'
  const invalidMessage = language === 'en' ? '≥8 · A-Z · 0-9 👈' : '≥8 · A-Z · 0-9 👈'

  const validatePassword = password => {
    if (!password && required) {
      return language === 'en' ? 'Password is required' : 'Пароль обязателен 👈'
    }

    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)

    if (password.length < minLength || !hasUpperCase || !hasNumber) {
      return invalidMessage
    }

    return ''
  }

  const handleChange = e => {
    const newValue = e.target.value

    if (!isControlled) {
      setInternalValue(newValue)
    }

    if (propOnChange) {
      propOnChange(e)
    }

    let errorMessage = validatePassword(newValue)

    if (passwordToCompare !== undefined && newValue !== passwordToCompare) {
      errorMessage = language === 'en' ? 'Passwords do not match' : 'Пароли не совпадают'
    }

    setError(errorMessage)

    if (onValidate) {
      onValidate({ value: newValue, error: errorMessage })
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev)
  }

  useEffect(() => {
    if (isTouched) {
      handleChange({ target: { value } })
    }
  }, [isTouched])

  useEffect(() => {
    if (value && passwordToCompare !== undefined) {
      handleChange({ target: { value } })
    }
  }, [passwordToCompare])

  return (
    <div className={styles.PasswordInput_container}>
      <input
        className={`${styles.PasswordInput_input} ${error ? styles.PasswordInput_input_error : ''}`}
        type={isPasswordVisible ? 'text' : 'password'}
        name={name}
        id={id}
        autoComplete="current-password"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
        {...props}
      />
      {showToggleButton && (
        <button
          type="button"
          className={styles.PasswordInput_toggleButton}
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
        >
          <img
            src={isPasswordVisible ? 'login/password_view.svg' : 'login/password.svg'}
            alt=""
            className={styles.PasswordInput_icon}
          />
        </button>
      )}
      {error && <div className={styles.PasswordInput_errorMessage}>{error}</div>}
    </div>
  )
}

export default PasswordInput
