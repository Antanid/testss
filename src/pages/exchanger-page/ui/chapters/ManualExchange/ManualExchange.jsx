import { useState } from 'react'
import { InputAddress } from '../../../../../shared/ui/Input/Address'
import HintButton from '../../../../../features/HintButton'
import { BtnPrevStage } from '../../../components/Buttons'
import { ManualFirstStage } from '@/pages/exchanger-page/ui/chapters/ManualExchange/stage'
import { useLanguage } from '@/shared/lang/index.jsx'
import { useNavigate } from 'react-router-dom'

export const ManualExchange = ({
  exchangeStages,
  coinsData,
  sendCurrency,
  getCurrency,
  setSendCurrency,
  setGetCurrency,
  coinsSend,
  initialAmount,
  amountCommission,
  commissionRate,
  amountReceived,
  formatNumber,
  setCoinsSend,
}) => {
  const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 15; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const navigate = useNavigate()

  const { language } = useLanguage()

  const [activeStage, setActiveStage] = useState(1)

  const handlePrevStage = () => {
    if (activeStage === 1) {
      const transactionId = generateTransactionId()
      navigate(`/exchange/expect?transaction=${transactionId}`, {
        state: {
          sendCurrency,
          getCurrency,
          coinsSend,
          initialAmount,
          amountCommission,
          commissionRate,
          amountReceived,
        },
      })
    } else {
      setActiveStage(prev => prev - 1)
    }
  }

  const handleNextStage = () => {
    if (activeStage === 2) {
      const transactionId = generateTransactionId()
      navigate(`/exchange/expect?transaction=${transactionId}`, {
        state: {
          sendCurrency,
          getCurrency,
          coinsSend,
          initialAmount,
          amountCommission,
          commissionRate,
          amountReceived,
        },
      })
    } else {
      setActiveStage(prev => prev + 1)
    }
  }

  const nextStageButton = () => {
    return (
      <button className="button button_accent" onClick={handleNextStage}>
        {language === 'en' ? 'Next stage' : `Следующий этап`}
      </button>
    )
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Свап валют
  const swapCurrency = () => {
    setSendCurrency(getCurrency)
    setGetCurrency(sendCurrency)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Адрес кошелька
  const [userAddress, setUserAddress] = useState(null)

  const handlerChangeUserAddress = e => {
    const value = e.target.value
    setUserAddress(value)
    console.log(userAddress)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Переключатель деталей транзакции
  const [detailsOpen, setDetailsOpen] = useState(false)

  return (
    <>
      {/* 1 ЭТАП */}
      {activeStage === 1 && (
        <ManualFirstStage
          activeStage={activeStage}
          exchangeStages={exchangeStages}
          nextStageButton={nextStageButton}
        />
      )}
      {/* 2 ЭТАП */}
      {activeStage === 2 && (
        <>
          {/* ~~~~~~~~~~~~~~~~| Тип обмена |~~~~~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__types">
            <h4 className="text text_h4">
              {language === 'en' ? 'Exchange types' : 'Виды обменов'}
              <HintButton
                direction="bottom"
                title={{
                  ru: 'Выбор зависит от ваших потребностей:',
                  en: 'Choice depends on your needs:',
                }}
                text={{
                  ru: 'Автоматический обмен предназначен для стандартных операций — криптовалюта на криптовалюту или криптовалюта на рубли (с выводом на карту). Все сделки осуществляются автоматически, без участия оператора, что обеспечивает высокую скорость и удобство.\n\nРучной обмен подходит пользователям с особыми запросами — например, если вам требуется очистка криптовалюты или индивидуальный подход к условиям обмена.',
                  en: 'Automatic exchange is designed for standard transactions — cryptocurrency to cryptocurrency or cryptocurrency to rubles (with withdrawal to card). All transactions are carried out automatically, without operator involvement, which ensures high speed and convenience.\n\nManual exchange is suitable for users with special requests — for example, if you need cryptocurrency cleaning or an individual approach to exchange conditions.',
                }}
              />
            </h4>
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~| Этапы |~~~~~~~~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__stages">
            <h3 className="text text_h3">
              {language === 'en' ? `Stage ${activeStage}/2` : `Этап ${activeStage}/2`}
            </h3>
            <div className="exchanger__stages-visual">
              {exchangeStages.map((stage, index) => {
                const stageNumber = index + 1
                const isActive = activeStage === stageNumber

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
          {/* ~~~~~~~~~~~~| Информация транзакции |~~~~~~~~~~~~~~ */}
          <div className="exchanger__info container_manual">
            {/* Отправляете */}
            <div className="exchanger__info__item">
              {/* Верхний контейнер */}
              <div className="exchanger__info__item__top">
                <h4 className="text text_h4 text_h4_gray">
                  {language === 'en'
                    ? `Send ${coinsData[sendCurrency].id}`
                    : `Вы отправляете ${coinsData[sendCurrency].id}`}
                </h4>
              </div>
              {/* Средний контейнер */}
              <div className="exchanger__info__item__center">
                <h3 className="text text_h3">{coinsSend}</h3>
              </div>
              {/* Нижний контейнер*/}
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
            </div>
            <div className="exchanger__direction-icon">
              <svg
                className="icon"
                viewBox="0 0 29 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26 10L19.6111 17M26 10L19.6111 3M26 10H3" strokeWidth="5" />
              </svg>
            </div>
            {/* Получаете */}
            <div className="exchanger__info__item">
              {/* Верхний контейнер */}
              <div className="exchanger__info__item__top">
                <h4 className="text text_h4 text_h4_gray">
                  {language === 'en'
                    ? `Get ${coinsData[getCurrency].id}`
                    : `Вы получаете ${coinsData[getCurrency].id}`}
                </h4>
              </div>
              {/* Средний контейнер */}
              <div className="exchanger__info__item__center">
                <h3 className="text text_h3">{initialAmount.toFixed(2)}</h3>
              </div>
              {/* Нижний контейнер*/}
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
            </div>
          </div>
          {/* ~~~~~~~~~~~~~| Детали транзакции |~~~~~~~~~~~~~~~~~ */}
          <button
            className={`exchanger__details-button ${detailsOpen && 'exchanger__details-button_active'}`}
            onClick={() => setDetailsOpen(prev => !prev)}
          >
            <h4 className="text text_h4 text_h4_gray text_details">
              {language === 'en' ? 'More details about the transaction' : `Подробнее о транзакции`}
              <svg
                className="icon"
                viewBox="0 0 11 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 2L9 9.5L2 17" strokeWidth="3" />
              </svg>
            </h4>
          </button>

          {/* Окно */}
          <div className={`exchanger__details ${detailsOpen && 'exchanger__details_show'}`}>
            {/* Заголовок */}
            <div className="exchanger__details__title">
              <h3 className="text text_h3 text_title">
                {language === 'en' ? 'Transaction details' : `Детали транзакции`}
              </h3>
              <div className="exchanger__details__close" onClick={() => setDetailsOpen(false)}>
                <svg
                  className="icon"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.9999 15.4999L9 8.5M9 8.5L2 1.5M9 8.5L16 1.5M9 8.5L2 15.5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Информация */}
            <div className="exchanger__details__info">
              {/* Сумма отправления */}
              <div className="exchanger__details__info__row">
                <h4 className="text text_h4 text_h4_dark-gray">
                  {language === 'en'
                    ? `Send ${coinsData[sendCurrency].id}`
                    : `Вы отправляете ${coinsData[sendCurrency].id}`}
                </h4>
                <div className="exchanger__details__result__get">
                  <div className="icon__container">{coinsData[sendCurrency].icon}</div>
                  <h4 className="text text_h4">
                    {coinsSend} {coinsData[sendCurrency].id}
                  </h4>
                  <div className="mark-chain">{coinsData[sendCurrency].id}</div>
                </div>
              </div>
              {/* Плавающий курс */}
              <div className="exchanger__details__info__row">
                <h4 className="text text_h4 text_h4_dark-gray">
                  {language === 'en' ? `Floating rate` : `Плавающий курс`}
                </h4>
                <div className="exchanger__details__result__get">
                  <h4 className="text text_h4">
                    1 {coinsData[sendCurrency].id} ~{' '}
                    {coinsData[sendCurrency].multiplier[getCurrency]} {coinsData[getCurrency].id}
                  </h4>
                </div>
              </div>
              {/* Комиссия сервиса */}
              <div className="exchanger__details__info__row">
                <h4 className="text text_h4 text_h4_dark-gray">
                  {language === 'en' ? `Service commission` : `Комиссия сервиса`}
                </h4>
                <div className="exchanger__details__result__get">
                  <h4 className="text text_h4">
                    {amountCommission} {coinsData[getCurrency].id}
                  </h4>
                </div>
              </div>
            </div>

            {/* Получаете */}
            <div className="exchanger__details__result">
              <h4 className="text text_h4 text_h4_light">
                {language === 'en' ? 'Get' : `Вы получаете`}
              </h4>
              <div className="exchanger__details__result__get">
                <div className="icon__container">{coinsData[getCurrency].icon}</div>
                <h4 className="text text_h4">~ {amountReceived}</h4>
                <div className="mark-chain">{coinsData[getCurrency].id}</div>
              </div>
            </div>
          </div>

          {/* ~~~~~~~~~~~~~| Адресс транзакции |~~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__address">
            <InputAddress
              language={language}
              chain={coinsData[getCurrency].chain}
              onChange={handlerChangeUserAddress}
            />
          </div>
          {/* ~~~~~~~~~~~~~~~| Следующий этап |~~~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__next-stage">
            <BtnPrevStage handlePrevStage={handlePrevStage} />
            {nextStageButton()}
          </div>
        </>
      )}
    </>
  )
}
