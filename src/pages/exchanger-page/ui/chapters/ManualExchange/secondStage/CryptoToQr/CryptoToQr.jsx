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
        <CurrencyExchangeRow
          sendCurrency={sendCurrency}
          getCurrency={getCurrency}
          coinsSend={coinsSend}
          setCoinsSend={setCoinsSend}
          commissionRate={commissionRate}
          formatNumber={formatNumber}
          swapCurrency={swapCurrency}
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
