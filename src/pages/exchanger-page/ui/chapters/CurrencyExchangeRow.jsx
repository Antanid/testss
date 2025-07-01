import React from 'react'
import { InputSendCoins } from '@/pages/exchanger-page/components/Inputs.jsx'
import { coinsData } from '@/utils/coinsData.jsx'

export const CurrencyExchangeRow = ({
  sendCurrency,
  getCurrency,
  coinsSend,
  setCoinsSend,
  commissionRate,
  formatNumber,
  swapCurrency,
}) => {
  const initialAmount = coinsData[sendCurrency].multiplier[getCurrency] * coinsSend // Итого до вычета комисси
  const amountCommission = initialAmount - initialAmount * (1 - commissionRate / 100) // Вычет комиссии
  const amountReceived = initialAmount * (1 - commissionRate / 100) // Итого после вычета комиссии

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <button className="exchanger__swap" onClick={swapCurrency}>
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
            className={`container_default exchanger__currency ${
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
                  <h4 className="text text_h4">Send</h4>
                  {coinsSend < coinsData[sendCurrency].min && (
                    <h4 className="text text_h4 text_error">Min {coinsData[sendCurrency].min}</h4>
                  )}
                  {coinsSend > coinsData[sendCurrency].max && (
                    <h4 className="text text_h4 text_error">Max {coinsData[sendCurrency].max}</h4>
                  )}
                </>
              ) : (
                <>
                  <h4 className="text text_h4">Get</h4>
                  <h5 className="text text_h5 text_commission">
                    ~ {formatNumber(amountCommission.toFixed(1)) || 0}$ ({commissionRate}%)
                  </h5>
                </>
              )}
            </div>

            {/* Средний контейнер */}
            <div className="exchanger__currency__row exchanger__currency__center">
              {/* Выбор валюты */}
              <div className="exchanger__coin__select-container">
                <div className="exchanger__coin__icon-container">
                  {index === 0
                    ? coinsData[sendCurrency].icon
                    : coinsData[getCurrency]?.icon || 'Coin'}
                </div>
                <div className="exchanger__coin__info">
                  <h2 className="text text_h2 text_select-coin">
                    {index === 0 ? coinsData[sendCurrency].id : coinsData[getCurrency].id}
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
                    {index === 0 ? coinsData[sendCurrency].chain : coinsData[getCurrency].chain}
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
  )
}
