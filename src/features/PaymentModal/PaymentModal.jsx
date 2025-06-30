import { useState } from 'react'
import { toast } from 'react-toastify'
import './PaymentModal.scss'

const PaymentModal = ({ isOpen, onClose, operation, language }) => {
  if (!isOpen) return null

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Логические состояния
  const [isPaymentMethod, setPaymentMethod] = useState('crypto') // Метод операции
  const [amount, setAmount] = useState('') // Сумма операции
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Визуал состояния
  const isDeposit = operation === 'deposit'
  const [methodShow, setMethodToggle] = useState(false)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Конфиг
  const paymentConfig = {
    deposit: {
      min: 8,
      max: 200000,
    },
    withdraw: {
      min: 10,
      max: 50000,
    },
  }
  const config = paymentConfig[operation] || { min: 5, max: 100000 }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Методы операций
  const paymentMethods = {
    deposit: [
      {
        id: 'crypto',
        ru: 'Крипта',
        en: 'Crypto',
        manager: false,
      },
      {
        id: 'card',
        ru: 'Карта',
        en: 'Card',
        manager: false,
      },
      {
        id: 'iban',
        ru: 'IBAN',
        en: 'IBAN',
        manager: false,
      },
      {
        id: 'other',
        ru: 'Другой счет (уточню у менеджера)',
        en: 'Other account (I will check with the manager)',
        manager: true,
      },
    ],

    withdraw: [
      {
        id: 'crypto',
        ru: 'Крипта',
        en: 'Crypto',
        manager: false,
      },
      {
        id: 'card',
        ru: 'Карта',
        en: 'Card',
        manager: false,
      },
      {
        id: 'iban',
        ru: 'IBAN',
        en: 'IBAN',
        manager: false,
      },
      {
        id: 'other',
        ru: 'Другой счет (уточню у менеджера)',
        en: 'Other account (I will check with the manager)',
        manager: true,
      },
    ],
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Поиск метода
  const handleFindMethod = e => {
    const value = e.target.value
    setSearchTerm(value)
  }
  // Фильтрафия
  const filteredMethods = paymentMethods[operation].filter(method => {
    const label = method[language]?.toLowerCase() || ''
    return label.includes(searchTerm.toLowerCase())
  })
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Выбор метода
  const handleSelectMethod = (method, manager) => {
    setPaymentMethod(method)

    if (manager) {
      toast(
        <div className="manager-toast">
          ❗️Это индивидуальное направление, необходимо связаться с менеджером для уточнения условий
          обмена по выбранному направлению - <b>@wozaexchange</b>
        </div>,
        {
          position: 'bottom-center',
          autoClose: 10000,
          theme: 'dark',
        },
      )
    }
    //setMethodToggle(prev => !prev)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Отправка запроса
  const handleSendOperation = () => {
    toast(language === 'en' ? '⚙️ In development...' : '⚙️ В разработке...', {
      position: 'top-center',
      autoClose: 3000,
      theme: 'dark',
    })
    console.log(isPaymentMethod)
  }
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Форматирование суммы
  const formatNumberWithCommas = num => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  // Валдиация суммы
  const handleInputChange = e => {
    const value = e.target.value
    const numericValue = value.replace(/[^\d]/g, '')

    setAmount(numericValue)

    // Валидация
    if (!numericValue) {
      setError(language === 'en' ? `min ${config.min}$` : `минимум ${config.min}$`)
    } else if (Number(numericValue) < config.min) {
      setError(language === 'en' ? `min ${config.min}$` : `минимум ${config.min}$`)
    } else if (Number(numericValue) > config.max) {
      const formattedMax = formatNumberWithCommas(config.max)
      setError(language === 'en' ? `max ${formattedMax}$` : `максимум ${formattedMax}$`)
    } else {
      setError('')
    }
  }
  // Отображение суммы
  const displayValue = amount ? formatNumberWithCommas(amount) : ''
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  return (
    <div className="payment-modal">
      <div className="payment-modal__overlay" onClick={onClose}></div>
      <div className="payment-modal__content">
        <div className="payment-modal__container payment-modal__main">
          <h3 className="text text_h3">
            {isDeposit
              ? language === 'en'
                ? 'Deposit balance'
                : 'Пополнение баланса'
              : language === 'en'
                ? 'Withdraw balance'
                : 'Вывод баланса'}
          </h3>

          <div className="payment-modal__details">
            {/* ===========| Выбор метода операции |=========== */}
            <div className="payment-modal__details__item">
              <h4 className="text text_h4 text_h4_light">
                {isDeposit
                  ? language === 'en'
                    ? 'Select a deposit method'
                    : 'Выберите способ пополнения'
                  : language === 'en'
                    ? 'Select a withdrawal method'
                    : 'Выберите способ вывода'}
              </h4>
              <div className="payment-modal__details__item__input-container select-container">
                <div className="icon__container" onClick={() => setMethodToggle(prev => !prev)}>
                  <svg
                    className={`icon__svg ${methodShow && 'icon__svg_active'}`}
                    viewBox="0 0 11 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 2L9 9.5L2 17" strokeWidth="3" />
                  </svg>
                </div>

                <input
                  className={`input ${methodShow && 'input_edit'}`}
                  type="text"
                  value={
                    paymentMethods[operation].find(method => method.id === isPaymentMethod)?.[
                      language
                    ]
                  }
                  readOnly
                  onClick={() => setMethodToggle(prev => !prev)}
                />

                {/* ===========| Окно выбора |=========== */}
                <div
                  className={`payment-modal__container payment-modal__method ${methodShow ? 'payment-modal__method_show' : ''}`}
                >
                  <div className="payment-modal__method__title">
                    <h4 className="text text_h4 select-method__title">
                      {isDeposit
                        ? language === 'en'
                          ? 'Select a deposit method'
                          : 'Выбрать метод пополнения'
                        : language === 'en'
                          ? 'Select a withdrawal method'
                          : 'Выбрать метод вывода'}
                      <button
                        className="select-method__close button_close"
                        onClick={() => setMethodToggle(false)}
                      >
                        ✕
                      </button>
                    </h4>
                  </div>

                  <div className="select-method__container">
                    <div className="input-container select-method__input-container">
                      <input
                        type="text"
                        className="input input_find select-method__input"
                        onChange={handleFindMethod}
                        placeholder={
                          isDeposit
                            ? language === 'en'
                              ? 'Deposit method'
                              : 'Метод пополнения'
                            : language === 'en'
                              ? 'Withdraw method'
                              : 'Метод вывода'
                        }
                      />

                      <div className="select-method__icon-container">
                        <svg
                          className="icon select-method__icon"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.3333 14.3333L21 21M8.77778 16.5556C4.48223 16.5556 1 13.0733 1 8.77778C1 4.48223 4.48223 1 8.77778 1C13.0733 1 16.5556 4.48223 16.5556 8.77778C16.5556 13.0733 13.0733 16.5556 8.77778 16.5556Z"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="select-method__items-wrapper">
                      <div className="select-method__items">
                        {isDeposit
                          ? filteredMethods.map((method, index) => (
                              <button
                                className={`select-method__item 
                              ${isPaymentMethod === method.id ? 'select-method__item_select' : ''}
                              ${method.manager ? 'select-method__item_manager' : ''}
                              `}
                                key={index}
                                onClick={() => handleSelectMethod(method.id, method.manager)}
                              >
                                <h4 className="text text_h4 text_h4_light">
                                  {method[language]}
                                  <span className="select-point">
                                    <svg
                                      className="icon"
                                      viewBox="0 0 15 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M1.66797 5.00002L5.66825 9L13.668 1"
                                        strokeWidth="2"
                                      />
                                    </svg>
                                  </span>
                                </h4>
                              </button>
                            ))
                          : '321'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ======================================== */}
            </div>
            {/* ============================================== */}

            {/* ===========| Ввод суммы операции |=========== */}
            <div className="payment-modal__details__item">
              <h4 className="text text_h4 text_h4_light">
                {isDeposit ? (
                  language === 'en' ? (
                    <>
                      Amount to deposit{' '}
                      {error && <span className="input-error-label">{error}</span>}
                    </>
                  ) : (
                    <>
                      Сумма пополнения {error && <span className="input-error-label">{error}</span>}
                    </>
                  )
                ) : language === 'en' ? (
                  <>
                    Amount to withdraw {error && <span className="input-error-label">{error}</span>}
                  </>
                ) : (
                  <>Сумма вывода {error && <span className="input-error-label">{error}</span>}</>
                )}
              </h4>
              <div className="payment-modal__details__item__input-container">
                <input
                  className={`input ${error && 'input_error'}`}
                  type="text"
                  value={displayValue}
                  onChange={handleInputChange}
                  placeholder={`${config.min}$ - ${formatNumberWithCommas(config.max)}$`}
                />
              </div>
            </div>
            {/* ============================================== */}

            {/* ===========| Подтверждение операции |=========== */}
            <button className="button button_accent button_submit" onClick={handleSendOperation}>
              {isDeposit
                ? language === 'en'
                  ? 'Proceed to payment'
                  : 'Перейти к оплате'
                : language === 'en'
                  ? 'Start withdrawing funds'
                  : 'Начать вывод средств'}
            </button>
            {/* ============================================== */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
