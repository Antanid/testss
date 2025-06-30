import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InputAddress } from '../../../../shared/ui/Input/Address'
import { InputSendCoins } from '../../components/Inputs'
import HintButton from '../../../../features/HintButton'
import { BtnPrevStage } from '../../components/Buttons'

export const AutoExchange = ({
  language,
  activeStage,
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
  fixRateChecked,
  handleToggleFixRate,
  formatNumber,
  setActiveStage,
  setCoinsSend,
}) => {
  const navigate = useNavigate()
  const rateText = fixRateChecked

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Функция генерации случайного ID (20 символов, буквы + цифры)
  const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 15; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
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

  // Кнопка "Следующий этап"
  const nextStageButton = () => {
    return (
      <button className="button button_accent" onClick={handleNextStage}>
        {language === 'en' ? 'Next stage' : `Следующий этап`}
      </button>
    )
  }

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
                  ru: 'Автоматический обмен — для стандартных операций (крипта-крипта, крипта-рубль). Выполняется мгновенно без участия оператора.\n\nРучной обмен — для особых случаев: индивидуальные условия, очистка средств и другие запросы.',
                  en: 'Automatic exchange — for standard transactions (crypto-crypto, crypto-RUB). Instant execution without operator involvement.\n\nManual exchange — for special cases: individual terms, coin cleaning, and other requests.',
                }}
              />
            </h4>
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~| Этапы |~~~~~~~~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__stages">
            <h3 className="text text_h3">
              {language === 'en' ? `Stage ${activeStage}/4` : `Этап ${activeStage}/4`}
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
          {/* ~~~~~~~~~~~~~~~~~~~| Обмен |~~~~~~~~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__exchange">
            <button className="exchanger__swap" onClick={swapCurrency}>
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.1552 21.3798L6.62108 26.914M6.62108 26.914L1.08691 21.3798M6.62108 26.914V1.08789M15.8447 6.62205L21.3788 1.08789M21.3788 1.08789L26.913 6.62205M21.3788 1.08789V26.914"
                  strokeWidth="2"
                />
              </svg>
            </button>
            {[...Array(2)].map((item, index) => {
              return (
                // ~~~~~~~~~~| Отправить / Получить |~~~~~~~~~~~~~
                <div
                  key={index}
                  className={`container_default exchanger__currency ${
                    index === 0 ? 'exchanger__currency_send' : 'exchanger__currency_get'
                  }`}
                >
                  {/* Верхний контейнер */}
                  <div className="exchanger__currency__row exchanger__currency__top">
                    {index === 0 ? (
                      // Отправить
                      <>
                        <h4 className="text text_h4">{language === 'en' ? 'Send' : 'Отправить'}</h4>
                        {coinsSend < coinsData[sendCurrency].min && (
                          <h4 className="text text_h4 text_error">
                            Min {coinsData[sendCurrency].min}
                          </h4>
                        )}

                        {coinsSend > coinsData[sendCurrency].max && (
                          <h4 className="text text_h4 text_error">
                            Max {coinsData[sendCurrency].max}
                          </h4>
                        )}
                      </>
                    ) : (
                      // Получить
                      <>
                        <h4 className="text text_h4">{language === 'en' ? 'Get' : 'Получить'}</h4>
                        <h5 className="text text_h5 text_commission">
                          ~{' '}
                          {formatNumber(amountCommission.toFixed(1), {
                            style: 'currency',
                            currency: 'USD',
                          }) || 0}
                          $ ({commissionRate}%)
                        </h5>
                      </>
                    )}
                  </div>

                  {/* Средний контейнер */}
                  <div className="exchanger__currency__row exchanger__currency__center">
                    {/* Выбор валюты */}
                    <div className="exchanger__coin__select-container">
                      {/* Иконка валюты */}
                      <div className="exchanger__coin__icon-container">
                        {index === 0
                          ? coinsData[sendCurrency].icon
                          : coinsData[getCurrency]?.icon || 'Coin'}
                      </div>
                      {/* Информация валюты */}
                      <div className="exchanger__coin__info">
                        <h2 className="text text_h2 text_select-coin">
                          {index === 0
                            ? `${coinsData[sendCurrency].id}`
                            : `${coinsData[getCurrency].id}`}
                          <svg
                            className={`icon__svg`}
                            viewBox="0 0 11 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M2 2L9 9.5L2 17" strokeWidth="3" />
                          </svg>
                        </h2>
                        <h5 className="text text_h5">
                          {index === 0
                            ? `${coinsData[sendCurrency].chain}`
                            : `${coinsData[getCurrency].chain}`}
                        </h5>
                      </div>
                    </div>
                    {/* Ввод кол-во отправления */}
                    <div className="valutes-container">
                      {index === 0 ? (
                        <InputSendCoins coinsSend={coinsSend} setCoinsSend={setCoinsSend} />
                      ) : (
                        <h2 className="text text_h2">
                          {formatNumber(initialAmount, { style: 'currency', currency: 'USD' }) || 0}
                        </h2>
                      )}
                      <h2 className="text text_h2">
                        {index === 0 ? coinsData[sendCurrency].id : coinsData[getCurrency].id}
                      </h2>
                    </div>
                  </div>

                  {/* Нижний контейнер */}
                  <div className="exchanger__currency__row exchanger__currency__bottom">
                    <h5 className="text text_h5 text_chain">
                      {index === 0
                        ? `${coinsData[sendCurrency].chain} chain`
                        : `${coinsData[getCurrency].chain} chain`}
                    </h5>

                    <h5 className="text text_h5 text_convert">
                      {index === 0
                        ? `~${formatNumber(initialAmount.toFixed(2))}$`
                        : `~${formatNumber(amountReceived.toFixed(2))}$`}
                    </h5>
                  </div>
                </div>
              )
            })}
          </div>
          {/* ~~~~~~~~~~~~~| Фиксированный курс |~~~~~~~~~~~~~~~~ */}
          <div className="exchanger__fixed-rate">
            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-switch__input"
                checked={fixRateChecked}
                onChange={handleToggleFixRate}
              />
              <span className="toggle-switch__slider">
                <span className="toggle-switch__handle" />
              </span>
            </label>
            <h4 className="text text_h4">
              {fixRateChecked ? (
                <span className="text_toggle-rate_float">
                  {language === 'en' ? 'Floating rate' : 'Плавающий курс'}
                </span>
              ) : (
                <span className="text_toggle-rate_fix">
                  {language === 'en' ? 'Fixed rate' : 'Фикс. курс'}
                </span>
              )}

              {fixRateChecked ? (
                <HintButton
                  direction="top"
                  title={{
                    ru: 'Плавающий курс',
                    en: 'Floating rate',
                  }}
                  text={{
                    ru: 'Курс определяется в момент поступления оплаты и может измениться относительно момента создания заявки. Подходит, если вы готовы к возможным колебаниям курса.',
                    en: 'The exchange rate is determined at the time of payment receipt and may change compared to the time the request was created. Suitable if you are ready for possible exchange rate fluctuations.',
                  }}
                />
              ) : (
                <HintButton
                  direction="top"
                  title={{
                    ru: 'Фикс. курс',
                    en: 'Fixed rate',
                  }}
                  text={{
                    ru: 'Курс фиксируется на 10 минут в момент создания заявки и не меняется за это время. Подходит, если вам важна стабильность и предсказуемость суммы.',
                    en: 'The exchange rate is fixed for 10 minutes from the moment the request is created and does not change during this time. Suitable if you value stability and predictability of the amount.',
                  }}
                />
              )}
            </h4>
          </div>

          {/* ~~~~~~~~~~~~~~~| Следующий этап |~~~~~~~~~~~~~~~~~~ */}

          <div className="exchanger__next-stage">{nextStageButton()}</div>
        </>
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
              {language === 'en' ? `Stage ${activeStage}/4` : `Этап ${activeStage}/4`}
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
          <div className="exchanger__info container_default">
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
