import React, { useState } from 'react'
import { useLanguage } from '@/shared/lang'
import InputField from '@/shared/ui/Input/Field'
import PasswordInput from '@/shared/ui/Input/Password'
import EmailInput from '@/shared/ui/Input/Email'
import styles from './Auth.module.scss'
import { BtnAuthSubmit } from '@/features/Buttons'
import { useAuth } from '@/shared/hooks/useAuth'
import { toast } from 'react-toastify'

const Auth = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const { language } = useLanguage()
  const [isLogin, setIsLogin] = useState(true)

  // Форма входа
  const [emailData, setEmailData] = useState({ value: '', error: '' })
  const [passwordData, setPasswordData] = useState({ value: '', error: '' })

  // Форма регистрации
  const [confirmPasswordData, setConfirmPasswordData] = useState({ value: '', error: '' })

  const { login } = useAuth()

  const [isTouched, setIsTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Notify
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const isFormValid = () => {
    if (isLogin) {
      return emailData.error === '' && passwordData.error === ''
    } else {
      return emailData.error === '' && passwordData.error === '' && confirmPasswordData.error === ''
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsTouched(true)

    if (!isFormValid()) {
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      if (isLogin) {
        console.log('Вход:', { email: emailData.value, password: passwordData.value })
        if (emailData.value === 'admin@woza.com' && passwordData.value === 'Admin123') {
          login()
          toast.success(
            language === 'en' ? 'You have successfully logged in!' : 'Вы успешно вошли в аккаунт!',
            {
              position: 'top-center',
              autoClose: 3000,
              theme: 'dark',
            },
          )
          onClose()
        } else {
          toast.error(
            language === 'en'
              ? 'Authorization error. Check entered data!'
              : 'Ошибка авторизации. Проверьте введенные данные!',
            {
              position: 'top-center',
              autoClose: 3000,
              theme: 'dark',
            },
          )
        }
      } else {
        console.log('Регистрация:', {
          email: emailData.value,
          password: passwordData.value,
          confirmPassword: confirmPasswordData.value,
        })
        toast.success(
          language === 'en'
            ? 'You have successfully registered!'
            : 'Вы успешно зарегистрировались!',
          {
            position: 'top-center',
            autoClose: 3000,
            theme: 'dark',
          },
        )
        toast(
          language === 'en'
            ? 'A confirmation link has been sent to your email address.'
            : 'На вашу почту отправлено письмо с ссылкой для подтверждения',
          {
            position: 'top-center',
            autoClose: 10000,
            theme: 'dark',
          },
        )
        onClose()
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer}>
        <div className={styles.modalContent}>
          <div className={styles.modalContent_logo}>
            <img src="logo_full.png" alt="WoZa" />
          </div>

          <div className={styles.modalContent_categories}>
            <button
              className={`${styles.modalContent_categories_button} ${
                isLogin ? styles['modalContent_categories_button--active'] : ''
              }`}
              onClick={() => setIsLogin(true)}
            >
              {language === 'en' ? 'Log In' : 'Вход'}
            </button>
            <button
              className={`${styles.modalContent_categories_button} ${
                !isLogin ? styles['modalContent_categories_button--active'] : ''
              }`}
              onClick={() => setIsLogin(false)}
            >
              {language === 'en' ? 'Sign Up' : 'Регистрация'}
            </button>
          </div>

          <form className={styles.modalContent_form} onSubmit={handleSubmit} noValidate>
            {/* Форма входа */}
            {isLogin ? (
              <>
                <InputField labelEn="Email" labelRu="Почта">
                  <EmailInput
                    id="inputEmail"
                    name="email"
                    onValidate={data => setEmailData(data)}
                    isTouched={isTouched}
                  />
                </InputField>

                <InputField labelEn="Password" labelRu="Пароль">
                  <PasswordInput
                    id="inputPassword"
                    name="password"
                    onValidate={data => setPasswordData(data)}
                    isTouched={isTouched}
                    withVisibilityToggle
                  />
                </InputField>
              </>
            ) : (
              // Форма регистрации
              <>
                <InputField labelEn="Email" labelRu="Почта">
                  <EmailInput
                    id="inputEmail"
                    name="email"
                    onValidate={data => setEmailData(data)}
                    isTouched={isTouched}
                  />
                </InputField>

                <InputField labelEn="Password" labelRu="Пароль">
                  <PasswordInput
                    id="inputPassword"
                    name="password"
                    onValidate={data => setPasswordData(data)}
                    isTouched={isTouched}
                    withVisibilityToggle
                  />
                </InputField>

                <InputField labelEn="Confirm Password" labelRu="Подтвердите пароль">
                  <PasswordInput
                    id="inputConfirmPassword"
                    name="confirmPassword"
                    onValidate={data => setConfirmPasswordData(data)}
                    isTouched={isTouched}
                    passwordToCompare={passwordData.value}
                  />
                </InputField>
              </>
            )}

            <BtnAuthSubmit
              className={styles.modalContent_form_submit}
              disabled={(isTouched && !isFormValid()) || isLoading}
              type="submit"
            >
              {isLoading
                ? language === 'en'
                  ? 'Loading...'
                  : 'Загрузка...'
                : isLogin
                  ? language === 'en'
                    ? 'Login'
                    : 'Войти'
                  : language === 'en'
                    ? 'Sign Up'
                    : 'Зарегистрироваться'}
            </BtnAuthSubmit>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Auth
