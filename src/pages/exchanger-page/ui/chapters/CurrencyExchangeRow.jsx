import React from 'react'
import { InputSendCoins } from '@/pages/exchanger-page/components/Inputs.jsx'
import { coinsData } from '@/utils/coinsData.jsx'

import AutoCompleteWithIcon from '@/pages/exchanger-page/components/AutoComplete/AutoCompleteWithIcon.jsx'
import { CoinSelectDisplay } from '@/pages/exchanger-page/ui/chapters/CoinSelectDisplay.jsx'
import { useLanguage } from '@/shared/lang/index.jsx'

export const CurrencyExchangeRow = ({
  sendCurrency,
  getCurrency,
  coinsSend,
  setCoinsSend,
  commissionRate,
  formatNumber,
  swapCurrency,
  setGetCurrency,
  setSendCurrency,
}) => {
  const { language } = useLanguage()

  const initialAmount = coinsData[sendCurrency].multiplier[getCurrency] * coinsSend // Итого до вычета комисси
  const amountCommission = initialAmount - initialAmount * (1 - commissionRate / 100) // Вычет комиссии
  const amountReceived = initialAmount * (1 - commissionRate / 100) // Итого после вычета комиссии

  const coinOptions = Object.entries(coinsData).map(([key, coin]) => ({
    id: key,
    title: coin.id,
    chain: coin.chain,
    icon: coin.icon,
  }))

  return (
    <>
      <div
        style={{
          position: 'relative',
        }}
      >
        <button
          className="exchanger__swap"
          onClick={swapCurrency}
          aria-label={language === 'en' ? 'Swap currencies' : 'Поменять валюты'}
        >
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.1552 21.3798L6.62108 26.914M6.62108 26.914L1.08691 21.3798M6.62108 26.914V1.08789M15.8447 6.62205L21.3788 1.08789M21.3788 1.08789L26.913 6.62205M21.3788 1.08789V26.914"
              strokeWidth="2"
            />
          </svg>
        </button>
        {[...Array(2)].map((_, index) => {
          return (
            <div
              key={index}
              className={`container_manual exchanger__currency ${
                index === 0 ? 'exchanger__currency_send' : 'exchanger__currency_get'
              }`}
              style={{
                marginTop: '14px',
              }}
            >
              {/* Верхний контейнер */}
              <div className="exchanger__currency__row exchanger__currency__top">
                {index === 0 ? (
                  <>
                    <h4 className="text text_h4">{language === 'en' ? 'Send' : 'Отправить'}</h4>
                    {coinsSend < coinsData[sendCurrency].min && (
                      <h4 className="text text_h4 text_error">
                        {language === 'en'
                          ? `Min ${coinsData[sendCurrency].min}`
                          : `Минимум ${coinsData[sendCurrency].min}`}
                      </h4>
                    )}
                    {coinsSend > coinsData[sendCurrency].max && (
                      <h4 className="text text_h4 text_error">
                        {language === 'en'
                          ? `Max ${coinsData[sendCurrency].max}`
                          : `Максимум ${coinsData[sendCurrency].max}`}
                      </h4>
                    )}
                  </>
                ) : (
                  <>
                    <h4 className="text text_h4">{language === 'en' ? 'Get' : 'Получить'}</h4>
                    <h5 className="text text_h5 text_commission">
                      ~ {formatNumber(amountCommission.toFixed(1)) || 0}$ ({commissionRate}%{' '}
                      {language === 'en' ? 'commission' : 'комиссии'})
                    </h5>
                  </>
                )}
              </div>

              {/* Средний контейнер */}
              <div className="exchanger__currency__row exchanger__currency__center">
                <AutoCompleteWithIcon
                  options={coinOptions}
                  onOptionClick={option => {
                    if (index === 0) {
                      setSendCurrency(option.id)
                    } else {
                      setGetCurrency(option.id)
                    }
                  }}
                  placeholder={language === 'en' ? 'Find coin' : 'Найти валюту'}
                  headerTitle={
                    language === 'en'
                      ? index === 0
                        ? 'Select a coin to send'
                        : 'Select a coin to receive'
                      : index === 0
                        ? 'Выберите валюту для отправки'
                        : 'Выберите валюту для получения'
                  }
                  value={coinsData[index === 0 ? sendCurrency : getCurrency]}
                >
                  <CoinSelectDisplay
                    isSend={index === 0}
                    sendCurrency={sendCurrency}
                    getCurrency={getCurrency}
                    coinsData={coinsData}
                  />
                </AutoCompleteWithIcon>

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
                    ? `${coinsData[sendCurrency].chain} ${language === 'en' ? 'chain' : 'цепочка'}`
                    : `${coinsData[getCurrency].chain} ${language === 'en' ? 'chain' : 'цепочка'}`}
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
    </>
  )
}
