import { useState } from 'react'

import { CurrencyExchangeRow } from '@/pages/exchanger-page/ui/chapters/CurrencyExchangeRow.jsx'
import AutocompleteSelect from '@/pages/exchanger-page/components/AutoComplete/AutoComplete.jsx'
import { CaretRight } from 'phosphor-react'
import { useLanguage } from '@/shared/lang/index.jsx'
import { useTheme } from '@/shared/theme/index.jsx'
import { coinsData } from '@/utils/coinsData.jsx'
import { Textarea } from '@/pages/exchanger-page/components/Textarea/index.js'

// Валютная логика
const commissionRate = 3 // Тестовый модификатор комиссии (В идале вынести в конфиг админки)

export const CashTransferWorld = () => {
  const { language } = useLanguage()
  const { theme } = useTheme()

  // Стейты выбранных городов: откуда и куда
  const [selectedCityFrom, setSelectedCityFrom] = useState({
    id: 1,
    ru: 'Нью-Йорк',
    en: 'New York',
  })

  const [selectedCityTo, setSelectedCityTo] = useState({
    id: 2,
    ru: 'Сочи',
    en: 'Sochi',
  })

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

  // Обработчики выбора городов
  const handleCityFromClick = option => {
    const fullCity = directions.find(d => d.id === option.id)
    setSelectedCityFrom(fullCity)
  }

  const handleCityToClick = option => {
    const fullCity = directions.find(d => d.id === option.id)
    setSelectedCityTo(fullCity)
  }

  const cityOptions = directions.map(dir => ({
    id: dir.id,
    title: language === 'en' ? dir.en : dir.ru,
  }))

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
          <p className="text text_h4">
            {language === 'en'
              ? 'Select the city where you will give cash'
              : 'Выбери город, в котором отдашь наличные'}
          </p>
          <AutocompleteSelect
            options={cityOptions}
            onOptionClick={handleCityFromClick}
            headerTitle={language === 'en' ? 'Select a city' : 'Выбрать город из списка'}
            placeholder={language === 'en' ? 'Find a city' : 'Найти город'}
            value={selectedCityFrom}
          >
            <div className="manual_exchange_select">
              <p className="text text_h3">
                {language === 'en' ? selectedCityFrom.en : selectedCityFrom.ru}
              </p>
              <CaretRight size={24} color={theme === 'dark' ? '#fff' : '#000'} />
            </div>
          </AutocompleteSelect>

          <div style={{ marginTop: '1rem' }}>
            <p className="text text_h4">
              {language === 'en'
                ? 'Select the city where you will receive cash'
                : 'Выбери город, в котором получишь наличные'}
            </p>
            <AutocompleteSelect
              options={cityOptions}
              onOptionClick={handleCityToClick}
              headerTitle={language === 'en' ? 'Select a city' : 'Выбрать город из списка'}
              placeholder={language === 'en' ? 'Find a city' : 'Найти город'}
              value={selectedCityTo}
            >
              <div className="manual_exchange_select">
                <p className="text text_h3">
                  {language === 'en' ? selectedCityTo.en : selectedCityTo.ru}
                </p>
                <CaretRight size={24} color={theme === 'dark' ? '#fff' : '#000'} />
              </div>
            </AutocompleteSelect>
          </div>

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

const directions = [
  { id: 1, ru: 'Нью-Йорк', en: 'New York' },
  { id: 2, ru: 'Сочи', en: 'Sochi' },
  { id: 3, ru: 'Кисловодск', en: 'Kislovodsk' },
  { id: 4, ru: 'Москва', en: 'Moscow' },
  { id: 5, ru: 'Петербург', en: 'Saint Petersburg' },
  { id: 6, ru: 'Лондон', en: 'London' },
  { id: 7, ru: 'Берлин', en: 'Berlin' },
  { id: 8, ru: 'Токио', en: 'Tokyo' },
  { id: 9, ru: 'Париж', en: 'Paris' },
]
