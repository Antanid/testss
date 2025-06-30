import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/shared/lang'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { InputCopy } from '../../shared/ui/Input/Copy'

export const WaitingTransactionPage = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const transactionId = searchParams.get('transaction')

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Данные монет
  const coinsData = {
    eth: {
      id: 'ETH',
      chain: 'Etherium',
      multiplier: {
        usdt: 2824.84,
        usd: 2824.84,
        rub: 224299.0,
      },
      icon: (
        <svg viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30.7132 0C36.7863 0 42.7231 1.78879 47.7727 5.14018C52.8224 8.49156 56.7581 13.255 59.0822 18.8281C61.4062 24.4013 62.0143 30.5338 60.8295 36.4502C59.6447 42.3667 56.7202 47.8013 52.4259 52.0667C48.1315 56.3322 42.6602 59.2371 36.7037 60.4139C30.7473 61.5908 24.5732 60.9868 18.9624 58.6783C13.3515 56.3698 8.55585 52.4606 5.18179 47.4449C1.80773 42.4292 0.00683594 36.5323 0.00683594 30.5C0.00683594 22.4109 3.24196 14.6531 9.00052 8.93324C14.7591 3.21338 22.5694 0 30.7132 0Z"
            fill="white"
          />
          <path
            d="M30.7132 6.54918L46.8703 30.5305L30.7132 38.6158L14.5561 30.5L22.6346 18.5079L30.7132 6.54918ZM30.7132 41.846L15.4521 33.7579L30.7132 54.4508L45.9742 33.7579L30.7132 41.846Z"
            fill="#343434"
          />
          <path
            d="M30.7132 6.54918L38.7917 18.5079L46.8703 30.5L30.7132 24.4416V6.54918Z"
            fill="#343434"
          />
          <path d="M30.7132 41.846L46.005 33.7579L30.7132 54.4813V41.846Z" fill="#313131" />
          <path d="M30.7132 24.4416L46.8703 30.5L30.7132 38.5853V24.4416Z" fill="#151515" />
          <path
            d="M30.7132 6.54918L22.6346 18.5079L14.5561 30.5L30.7132 24.4416V6.54918Z"
            fill="#8C8C8C"
          />
          <path d="M30.7132 41.846L15.4521 33.7579L30.7132 54.4813V41.846Z" fill="#8A8A8A" />
          <path d="M30.7132 24.4416L14.5561 30.5L30.7132 38.5853V24.4416Z" fill="#353535" />
        </svg>
      ), // Тестовый вариант (далее выгружать из API)
      min: 0.5,
      max: 100000,
    },

    usdt: {
      id: 'USDT',
      chain: 'TRX',
      multiplier: {
        eth: 0.000355,
        usdt: 1,
        usd: 1,
      },
      icon: (
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_161_4227)">
            <path
              d="M27.5 55C42.6878 55 55 42.6878 55 27.5C55 12.3122 42.6878 0 27.5 0C12.3122 0 0 12.3122 0 27.5C0 42.6878 12.3122 55 27.5 55Z"
              fill="#26A17B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.8034 29.8776V29.8741C30.6144 29.8879 29.6398 29.9463 27.4656 29.9463C25.7297 29.9463 24.5077 29.8948 24.078 29.8741V29.8793C17.3955 29.5854 12.4077 28.4218 12.4077 27.0296C12.4077 25.6391 17.3955 24.4755 24.078 24.1765V28.7209C24.5145 28.7518 25.7658 28.8257 27.4948 28.8257C29.5694 28.8257 30.6092 28.7398 30.8034 28.7226V24.1799C37.4722 24.4773 42.448 25.6409 42.448 27.0296C42.448 28.4218 37.4722 29.582 30.8034 29.8776ZM30.8034 23.7073V19.6407H40.1087V13.4395H14.7727V19.6407H24.078V23.7055C16.5155 24.0527 10.8281 25.5515 10.8281 27.3459C10.8281 29.1402 16.5155 30.6373 24.078 30.9862V44.0177H30.8034V30.9827C38.3539 30.6355 44.0275 29.1385 44.0275 27.3459C44.0275 25.5532 38.3539 24.0562 30.8034 23.7073Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_161_4227">
              <rect width="55" height="55" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      min: 1,
      max: 100000,
    },

    rub: {
      id: 'RUB',
      chain: 'Rubles',
      multiplier: {
        usdt: 80,
        usd: 80,
      },
      icon: (
        <svg viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.5" cy="31.5" r="31.5" fill="white" fillOpacity="0.05" />
          <path
            d="M22.8 35.1V31.96H36.46C36.6867 31.96 36.9533 31.9467 37.26 31.92C37.58 31.8933 37.9133 31.84 38.26 31.76C39.5933 31.44 40.58 30.78 41.22 29.78C41.86 28.78 42.18 27.6333 42.18 26.34C42.18 25.5133 42.0467 24.7133 41.78 23.94C41.5133 23.1667 41.0867 22.4933 40.5 21.92C39.9267 21.3467 39.18 20.96 38.26 20.76C37.94 20.6667 37.6067 20.6133 37.26 20.6C36.9267 20.5867 36.66 20.58 36.46 20.58H28.36V17.2H36.58C36.78 17.2 37.0667 17.2067 37.44 17.22C37.8267 17.2333 38.2467 17.28 38.7 17.36C40.26 17.6 41.5667 18.1333 42.62 18.96C43.6867 19.7867 44.4867 20.8267 45.02 22.08C45.5533 23.3333 45.82 24.7267 45.82 26.26C45.82 28.54 45.22 30.4667 44.02 32.04C42.82 33.6 41.0467 34.5667 38.7 34.94C38.2467 35.0067 37.8267 35.0533 37.44 35.08C37.0667 35.0933 36.78 35.1 36.58 35.1H22.8ZM22.8 41.44V38.5H38.8V41.44H22.8ZM25.8 46V17.2H29.36V46H25.8Z"
            fill="#00FF00"
          />
        </svg>
      ),
      min: 1,
      max: 100000,
    },

    usd: {
      id: 'USD',
      chain: 'Dollars',
      multiplier: {
        usdt: 1,
      },
      icon: (
        <svg viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.5" cy="31.5" r="31.5" fill="white" fillOpacity="0.05" />
          <path
            d="M30.38 49.96V45.34H33.94V49.96H30.38ZM30.38 17.86V13.22H33.94V17.86H30.38ZM32.44 46.6C30.4933 46.6 28.74 46.2533 27.18 45.56C25.6333 44.8533 24.36 43.86 23.36 42.58C22.36 41.2867 21.7067 39.7667 21.4 38.02L24.9 37.44C25.3267 39.2133 26.2267 40.62 27.6 41.66C28.9867 42.7 30.6533 43.22 32.6 43.22C34.56 43.22 36.1467 42.7467 37.36 41.8C38.5733 40.8533 39.18 39.6333 39.18 38.14C39.18 37.0467 38.8533 36.1667 38.2 35.5C37.56 34.8333 36.48 34.2667 34.96 33.8L28.38 31.76C24.4467 30.5333 22.48 28.1867 22.48 24.72C22.48 23.0933 22.8733 21.6733 23.66 20.46C24.46 19.2333 25.5733 18.2867 27 17.62C28.44 16.94 30.1133 16.6067 32.02 16.62C33.8733 16.6333 35.5267 16.98 36.98 17.66C38.4333 18.3267 39.6333 19.2867 40.58 20.54C41.54 21.7933 42.1867 23.2933 42.52 25.04L38.92 25.7C38.7333 24.5667 38.32 23.5733 37.68 22.72C37.0533 21.8667 36.2533 21.2067 35.28 20.74C34.3067 20.26 33.2133 20.0133 32 20C30.8667 19.9867 29.8467 20.1733 28.94 20.56C28.0467 20.9467 27.34 21.4867 26.82 22.18C26.3 22.8733 26.04 23.6667 26.04 24.56C26.04 25.5333 26.4 26.36 27.12 27.04C27.8533 27.7067 29 28.28 30.56 28.76L35.96 30.36C38.3333 31.0667 40.0467 32.02 41.1 33.22C42.1533 34.4067 42.68 35.9933 42.68 37.98C42.68 39.7 42.2533 41.2067 41.4 42.5C40.56 43.7933 39.3667 44.8 37.82 45.52C36.2867 46.24 34.4933 46.6 32.44 46.6Z"
            fill="#00FF00"
          />
        </svg>
      ),
      min: 1,
      max: 100000,
    },
  } // Получать будет из API

  // Получаем переданные данные
  const { sendCurrency, getCurrency, coinsSend, initialAmount } = location.state || {}

  // Защита от прямого перехода
  useEffect(() => {
    if (!location.state || !transactionId) {
      navigate('/')
      return
    }
  }, [navigate, location.state, transactionId])

  const [timerDisplay, setTimerDisplay] = useState('1:30:00')
  const [isWarning, setIsWarning] = useState(false) // Состояние для класса

  useEffect(() => {
    if (!transactionId) return

    const totalDuration = 1 * 5 * 1000
    const startTime = new Date().getTime()

    const updateTimer = () => {
      const remaining = Math.max(0, totalDuration - (new Date().getTime() - startTime))
      const hours = Math.floor(remaining / (1000 * 60 * 60))
      const minutes = Math.floor((remaining / (1000 * 60)) % 60)
      const seconds = Math.floor((remaining / 1000) % 60)

      setTimerDisplay(
        `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      )

      if (remaining <= 1 * 60 * 1000) {
        setIsWarning(true)
      } else {
        setIsWarning(false)
      }
    }

    const interval = setInterval(updateTimer, 1000)

    // Вариант - заглушка - передавать в API еще на моменте стадий
    localStorage.setItem(
      'exchangeData',
      JSON.stringify({
        sendCurrency,
        getCurrency,
        coinsSend,
        initialAmount,
        handlerCopyID,
      }),
    )

    const timeout = setTimeout(() => {
      clearInterval(interval)
      navigate(`/exchange/completed?transaction=${transactionId}&status=cancel&reason=time_out`)
    }, totalDuration)

    updateTimer()

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [navigate, transactionId])

  const handlerCopyID = () => {
    navigator.clipboard
      .writeText(transactionId)
      .then(() => {
        toast.success(language === 'en' ? 'Transaction ID copied' : 'ID Транзакции скопирован', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        })
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }

  return (
    <div>
      <main className="page page__exchanger">
        <section className="section transaction__section">
          {/* Левый блок */}
          <div className="transaction__left transaction__container">
            {/* Стадии */}
            <div className="transaction__left__top transaction__left__container container_default">
              <h3 className="text text_h3">
                {language === 'en' ? 'Balance deposit' : `Пополнение средств 3/4`}
              </h3>
              <div className="exchanger__stages-visual">
                {[...Array(4)].map((_, index) => {
                  const isActive = index < 3

                  return (
                    <span
                      key={index}
                      className={`exchanger__stages-visual__stage ${
                        isActive ? 'exchanger__stages-visual__stage_active' : ''
                      }`}
                    ></span>
                  )
                })}
              </div>
            </div>
            {/* Валюта - отдаю */}
            <div className="transaction__left__center transaction__left__container container_default">
              <div className="exchanger__currency__row exchanger__currency__center">
                {/* Выбор валюты */}
                <div className="exchanger__coin__select-container">
                  {/* Иконка валюты */}
                  <div className="exchanger__coin__icon-container">
                    {coinsData[sendCurrency].icon}
                  </div>
                  {/* Информация валюты */}
                  <div className="exchanger__coin__info">
                    <h2 className="text text_h2 text_select-coin">{coinsData[sendCurrency].id}</h2>
                    <h5 className="text text_h5">{coinsData[sendCurrency].chain}</h5>
                  </div>
                </div>
              </div>
              <div className="transaction__info">
                <div className="transaction__amount">
                  <h3 className="text text_h2">{coinsSend}</h3>
                  <h4 className="text text_h4 text_h4_gray">
                    {coinsData[sendCurrency].multiplier.usd * coinsSend}$
                  </h4>
                </div>
                <div className="transaction__direction">
                  <div className="icon__container">
                    <svg
                      className="icon"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20L20 2M20 2H6.5M20 2V15.5"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Валюта - принимаю */}
            <div className="transaction__left__bottom transaction__left__container container_default">
              <div className="exchanger__currency__row exchanger__currency__center">
                {/* Выбор валюты */}
                <div className="exchanger__coin__select-container">
                  {/* Иконка валюты */}
                  <div className="exchanger__coin__icon-container">
                    {coinsData[getCurrency].icon}
                  </div>
                  {/* Информация валюты */}
                  <div className="exchanger__coin__info">
                    <h2 className="text text_h2 text_select-coin">{coinsData[getCurrency].id}</h2>
                    <h5 className="text text_h5">{coinsData[getCurrency].chain}</h5>
                  </div>
                </div>
              </div>
              <div className="transaction__info">
                <div className="transaction__amount">
                  <h3 className="text text_h2">{initialAmount.toFixed(2)}</h3>
                  <h4 className="text text_h4 text_h4_gray">
                    {(coinsData[getCurrency].multiplier.usd * initialAmount).toFixed(2)}$
                  </h4>
                </div>
                <div className="transaction__direction">
                  <div className="icon__container icon__container_get">
                    <svg
                      className="icon"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 20L20 2M20 2H6.5M20 2V15.5"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Мидл блок */}
          <div className="transaction__center transaction__container container_default">
            <div className="qr-button__container">
              <svg
                className="qr-button__icon"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 17H17M13 17H11V14M14 14H17V11H16M11 11H13M1 13.9997C1 13.0679 1 12.6019 1.15224 12.2344C1.35523 11.7443 1.74432 11.3552 2.23438 11.1522C2.60192 11 3.06786 11 3.99974 11C4.93163 11 5.39808 11 5.76562 11.1522C6.25568 11.3552 6.64467 11.7443 6.84766 12.2344C6.9999 12.6019 6.9999 13.0681 6.9999 14C6.9999 14.9319 6.9999 15.3978 6.84766 15.7654C6.64467 16.2554 6.25568 16.6447 5.76562 16.8477C5.39808 16.9999 4.93162 16.9999 3.99974 16.9999C3.06786 16.9999 2.60192 16.9999 2.23438 16.8477C1.74432 16.6447 1.35523 16.2557 1.15224 15.7656C1 15.3981 1 14.9316 1 13.9997ZM11 3.99974C11 3.06786 11 2.60192 11.1522 2.23438C11.3552 1.74432 11.7443 1.35523 12.2344 1.15224C12.6019 1 13.0679 1 13.9997 1C14.9316 1 15.3981 1 15.7656 1.15224C16.2557 1.35523 16.6447 1.74432 16.8477 2.23438C16.9999 2.60192 16.9999 3.06812 16.9999 4C16.9999 4.93188 16.9999 5.39783 16.8477 5.76537C16.6447 6.25542 16.2557 6.64467 15.7656 6.84766C15.3981 6.9999 14.9316 6.9999 13.9997 6.9999C13.0679 6.9999 12.6019 6.9999 12.2344 6.84766C11.7443 6.64467 11.3552 6.25568 11.1522 5.76562C11 5.39808 11 4.93163 11 3.99974ZM1 3.99974C1 3.06786 1 2.60192 1.15224 2.23438C1.35523 1.74432 1.74432 1.35523 2.23438 1.15224C2.60192 1 3.06786 1 3.99974 1C4.93163 1 5.39808 1 5.76562 1.15224C6.25568 1.35523 6.64467 1.74432 6.84766 2.23438C6.9999 2.60192 6.9999 3.06812 6.9999 4C6.9999 4.93188 6.9999 5.39783 6.84766 5.76537C6.64467 6.25542 6.25568 6.64467 5.76562 6.84766C5.39808 6.9999 4.93162 6.9999 3.99974 6.9999C3.06786 6.9999 2.60192 6.9999 2.23438 6.84766C1.74432 6.64467 1.35523 6.25568 1.15224 5.76562C1 5.39808 1 4.93163 1 3.99974Z"
                  strokeOpacity="0.5"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="transaction__center__title">
              <h3 className="text text_h3 text_title">
                {language === 'en'
                  ? 'Send the funds to the specified address'
                  : `Отправьте средства по указанному адресу`}
              </h3>
            </div>
            <div className="transaction__center__info">
              <InputCopy language={language} TransactionId={transactionId} />
              <div className="transaction__center__info__content">
                <h4 className="text text_h4">
                  <label className="text_label">
                    {language === 'en' ? 'Quantity:' : `Количество:`}
                  </label>{' '}
                  {coinsData[coinsSend]} {coinsSend} {coinsData[sendCurrency].id}
                </h4>
                <h4 className="text text_h4 text_accent">
                  <label className="text_label">{language === 'en' ? 'Chain:' : `Сеть:`}</label>{' '}
                  {coinsData[sendCurrency].chain}
                </h4>
              </div>
            </div>
            <div className="t343wqd">
              <p className="text text_desclaimer">
                <div className="point-hint">!</div>
                {language === 'en'
                  ? 'The transaction will confirm itself as soon as it gets N number of confirmations.'
                  : `Транзакция подтвердится сама как только наберет N количество подтверждений`}
              </p>
            </div>
          </div>
          {/* Блок таймера */}
          <div className="transaction__timer transaction__container container_accent">
            <div className="transaction__timer__top">
              <h1 className="text text_h1 text_timer">{timerDisplay}</h1>
              <h4 className="text text_h4 text_amount">
                {language === 'en'
                  ? `It remains until receipt ${coinsSend} ${coinsData[sendCurrency].id}`
                  : `Осталось до получения ${coinsSend} ${coinsData[sendCurrency].id}`}
              </h4>
            </div>

            <div className="transaction__timer__bottom">
              <h4 className="text text_h4">
                {language === 'en' ? 'ID Transaction:' : `ID Транзакции:`}
              </h4>
              <h4 className="text text_h4 text_h4_dark-gray text_copy" onClick={handlerCopyID}>
                {transactionId}

                <svg
                  className="copy-icon"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 7V4.2002C7 3.08009 7 2.51962 7.21799 2.0918C7.40973 1.71547 7.71547 1.40973 8.0918 1.21799C8.51962 1 9.08009 1 10.2002 1H15.8002C16.9203 1 17.4801 1 17.9079 1.21799C18.2842 1.40973 18.5905 1.71547 18.7822 2.0918C19.0002 2.51962 19.0002 3.07967 19.0002 4.19978V9.7998C19.0002 10.9199 19.0002 11.48 18.7822 11.9078C18.5905 12.2841 18.2839 12.5905 17.9076 12.7822C17.4802 13 16.921 13 15.8031 13H13M7 7H4.2002C3.08009 7 2.51962 7 2.0918 7.21799C1.71547 7.40973 1.40973 7.71547 1.21799 8.0918C1 8.51962 1 9.08009 1 10.2002V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H9.80355C10.9215 19 11.4805 19 11.9079 18.7822C12.2842 18.5905 12.5905 18.2839 12.7822 17.9076C13 17.4802 13 16.921 13 15.8031V13M7 7H9.8002C10.9203 7 11.4801 7 11.9079 7.21799C12.2842 7.40973 12.5905 7.71547 12.7822 8.0918C13 8.51921 13 9.079 13 10.1969L13 13"
                    stroke="white"
                    strokeOpacity="0.5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </h4>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
