import { useState } from 'react'
import { CurrencyExchangeRow } from '@/pages/exchanger-page/ui/chapters/CurrencyExchangeRow.jsx'
import { useLanguage } from '@/shared/lang/index.jsx'
import { coinsData } from '@/utils/coinsData.jsx'
import { Textarea } from '@/pages/exchanger-page/components/Textarea/index.js'

// Валютная логика
const commissionRate = 3 // Тестовый модификатор комиссии (В идале вынести в конфиг админки)

export const CryptoToQr = () => {
  const { language } = useLanguage()

  const [sendCurrency, setSendCurrency] = useState('eth') // Валюта на отправку
  const [getCurrency, setGetCurrency] = useState('usdt') // Валюта на получение
  const [coinsSend, setCoinsSend] = useState(coinsData[sendCurrency].min) // Монет на отправку
  const [textValue, setTextValue] = useState('')

  const swapCurrency = () => {
    setSendCurrency(getCurrency)
    setGetCurrency(sendCurrency)
  }

  // Форматирование текста
  const formatNumber = (value, options = {}) => {
    const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options

    const num = Number(value)
    if (isNaN(num)) return '0.00'

    return num.toLocaleString('en-US', {
      minimumFractionDigits,
      maximumFractionDigits,
    })
  }

  return (
    <>
      <div className="exchanger__exchange">
        <button className="exchanger__swap" onClick={swapCurrency}>
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12.1552 21.3798L6.62108 26.914M6.62108 26.914L1.08691 21.3798M6.62108 26.914V1.08789M15.8447 6.62205L21.3788 1.08789M21.3788 1.08789L26.913 6.62205M21.3788 1.08789V26.914"
              strokeWidth="2"
            />
          </svg>
        </button>
        <CurrencyExchangeRow
          sendCurrency={sendCurrency}
          getCurrency={getCurrency}
          coinsSend={coinsSend}
          setCoinsSend={setCoinsSend}
          commissionRate={commissionRate}
          formatNumber={formatNumber}
        />

        <div style={{ marginTop: '1rem' }}>
          <Textarea
            value={textValue}
            onChange={setTextValue}
            placeholder={
              language === 'en'
                ? 'Write all additional information here'
                : 'Напишите сюда всю дополнительную информацию'
            }
          />

          <div
            className="exchanger__next-stage"
            style={{
              marginTop: '1rem',
            }}
          >
            <button className="button button_accent" onClick={() => console.log('CREATE')}>
              {language === 'en' ? 'Create request' : 'Создать заявку'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
