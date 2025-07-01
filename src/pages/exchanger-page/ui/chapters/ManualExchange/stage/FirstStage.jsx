import HintButton from '@/features/HintButton.jsx'
import { useLanguage } from '@/shared/lang/index.jsx'
import { CaretRight } from 'phosphor-react'
import AutocompleteSelect from '@/pages/exchanger-page/components/AutoComplete/AutoComplete.jsx'
import { useState } from 'react'
import { useTheme } from '@/shared/theme/index.jsx'

export const ManualFirstStage = ({ activeStage, exchangeStages, nextStageButton }) => {
  const { language } = useLanguage()
  const { theme } = useTheme()

  const [selectedDirection, setSelectedDirection] = useState({
    id: 1,
    ru: 'Крипта > наличные',
    en: 'Crypto > Cash',
  })

  const options = directions.map(dir => ({
    id: dir.id,
    title: language === 'en' ? dir.en : dir.ru,
  }))

  const handleOptionClick = option => {
    const fullDir = directions.find(d => d.id === option.id)
    setSelectedDirection(fullDir)
  }

  return (
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
          {language === 'en' ? `Stage ${activeStage}/2` : `Этап ${activeStage}/2`}
        </h3>
        <div className="exchanger__stages-visual">
          {exchangeStages?.map((stage, index) => {
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

      <AutocompleteSelect
        options={options}
        onOptionClick={handleOptionClick}
        headerTitle={language === 'en' ? 'Find a direction' : 'Выбрать направление'}
        placeholder={language === 'en' ? 'Find a direction' : 'Найти направление'}
        value={selectedDirection}
      >
        <div className="manual_exchange_root">
          <p className="text text_h4">
            {language === 'en' ? 'Select direction' : 'Выберите направление'}
          </p>

          <div className="manual_exchange_select">
            <p className="text text_h3">
              {language === 'en' ? selectedDirection.en : selectedDirection.ru}
            </p>
            <CaretRight size={24} color={theme === 'dark' ? '#fff' : '#000'} />
          </div>
        </div>
      </AutocompleteSelect>

      {/* ~~~~~~~~~~~~~~~| Следующий этап |~~~~~~~~~~~~~~~~~~ */}

      <div className="exchanger__next-stage">{nextStageButton()}</div>
    </>
  )
}

const directions = [
  {
    id: 1,
    ru: 'Крипта > наличные',
    en: 'Crypto > Cash',
  },
  {
    id: 2,
    ru: 'Крипта > безналичные',
    en: 'Crypto > Cashless',
  },
  {
    id: 3,
    ru: 'Крипта > QR Code (РФ)',
    en: 'Crypto > QR Code (RU)',
  },
  {
    id: 4,
    ru: 'Наличные > Крипто',
    en: 'Cash > Crypto',
  },
  {
    id: 5,
    ru: 'Перевод наличных по миру',
    en: 'Cash transfer worldwide',
  },
  {
    id: 6,
    ru: 'Международная оплата услуг',
    en: 'International payment for services',
  },
  {
    id: 7,
    ru: 'Обмен крипто-активов с любым % риска',
    en: 'Crypto assets exchange with any % risk',
  },
  {
    id: 8,
    ru: 'Легализация средств',
    en: 'Legalization of funds',
  },
  {
    id: 9,
    ru: 'Другое (предложу менеджеру)',
    en: 'Other (will consult manager)',
  },
]
