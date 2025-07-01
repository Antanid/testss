import React, { useState } from 'react'
import { InputSendCoins } from '@/pages/exchanger-page/components/Inputs.jsx'
import { coinsData } from '@/utils/coinsData.jsx'
import SlideModal from '@/pages/exchanger-page/components/Modal/Modal.jsx'
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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSendCurrencySelect, setIsSendCurrencySelect] = useState(true)

  const initialAmount = coinsData[sendCurrency].multiplier[getCurrency] * coinsSend // Итого до вычета комисси
  const amountCommission = initialAmount - initialAmount * (1 - commissionRate / 100) // Вычет комиссии
  const amountReceived = initialAmount * (1 - commissionRate / 100) // Итого после вычета комиссии

  const coinOptions = Object.entries(coinsData).map(([key, coin]) => ({
    id: key,
    title: coin.id,
    chain: coin.chain,
    icon: coin.icon,
  }))

  const handleCoinSelectClick = isSendCurrency => {
    setIsSendCurrencySelect(isSendCurrency)
  }

  const handleCurrencySelect = selectedId => {
    if (isSendCurrencySelect) {
      setSendCurrency(selectedId)
    } else {
      setGetCurrency(selectedId)
    }
    setIsModalOpen(false)
  }

  return (
    <>
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
                <AutoCompleteWithIcon
                  options={coinOptions}
                  onOptionClick={option => {
                    if (index === 0) {
                      setSendCurrency(option.id)
                    } else {
                      setGetCurrency(option.id)
                    }
                  }}
                  placeholder="Find coin"
                  headerTitle={
                    language === 'en'
                      ? index === 0
                        ? 'Select a coin to send' // English: Choose coin for sending
                        : 'Select a coin to receive' // English: Choose coin for receiving
                      : index === 0
                        ? 'Выберите валюту для отправки' // Русский: Выберите валюту для отправки
                        : 'Выберите валюту для получения' // Русский: Выберите валюту для получения
                  }
                  value={coinsData[index === 0 ? sendCurrency : getCurrency]}
                >
                  <CoinSelectDisplay
                    isSend={index === 0}
                    sendCurrency={sendCurrency}
                    getCurrency={getCurrency}
                    coinsData={coinsData}
                    onClick={() => handleCoinSelectClick(index === 0)}
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
      <SlideModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        options={coinOptions}
        onSelect={handleCurrencySelect}
        title={isSendCurrencySelect ? 'Select Send Currency' : 'Select Get Currency'}
        placeholder="Find coin"
        position="bottom"
      />
    </>
  )
}
