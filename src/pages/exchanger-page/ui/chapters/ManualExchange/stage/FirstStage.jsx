import HintButton from '@/features/HintButton.jsx'
import { useLanguage } from '@/shared/lang/index.jsx'
import { CaretRight } from 'phosphor-react'
import AutocompleteSelect from '@/pages/exchanger-page/components/AutoComplete/AutoComplete.jsx'
import { useTheme } from '@/shared/theme/index.jsx'
import { DirectionIds } from '@/pages/exchanger-page/ui/chapters/ManualExchange/stage/enum.js'

export const ManualFirstStage = ({
  activeStage,
  exchangeStages,
  nextStageButton,
  selectedDirection,
  setSelectedDirection,
}) => {
  const { language } = useLanguage()
  const { theme } = useTheme()

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

      <div
        style={{
          width: '100%',
        }}
      >
        <p
          className="text text_h4"
          style={{
            marginTop: 20,
          }}
        >
          {language === 'en' ? 'Select a direction from the list' : 'Выбрать направления из списка'}
        </p>

        <AutocompleteSelect
          options={options}
          onOptionClick={handleOptionClick}
          headerTitle={language === 'en' ? 'Find a direction' : 'Выбрать направление'}
          placeholder={language === 'en' ? 'Find a direction' : 'Найти направление'}
          value={selectedDirection}
        >
          <div className="manual_exchange_select">
            <p className="text text_h3">
              {language === 'en' ? selectedDirection.en : selectedDirection.ru}
            </p>
            <CaretRight size={24} color={theme === 'dark' ? '#fff' : '#000'} />
          </div>
        </AutocompleteSelect>
      </div>

      {/* ~~~~~~~~~~~~~~~| Следующий этап |~~~~~~~~~~~~~~~~~~ */}

      <div className="exchanger__next-stage">{nextStageButton()}</div>
    </>
  )
}

const directions = [
  {
    id: DirectionIds.CRYPTO_TO_CASH,
    ru: 'Крипта > наличные',
    en: 'Crypto > Cash',
  },
  {
    id: DirectionIds.CRYPTO_TO_CASHLESS,
    ru: 'Крипта > безналичные',
    en: 'Crypto > Cashless',
  },
  {
    id: DirectionIds.CRYPTO_TO_QR,
    ru: 'Крипта > QR Code (РФ)',
    en: 'Crypto > QR Code (RU)',
  },
  {
    id: DirectionIds.CASH_TO_CRYPTO,
    ru: 'Наличные > Крипто',
    en: 'Cash > Crypto',
  },
  {
    id: DirectionIds.CASH_TRANSFER_WORLDWIDE,
    ru: 'Перевод наличных по миру',
    en: 'Cash transfer worldwide',
  },
  {
    id: DirectionIds.INTERNATIONAL_PAYMENT,
    ru: 'Международная оплата услуг',
    en: 'International payment for services',
  },
  {
    id: DirectionIds.CRYPTO_EXCHANGE_RISK,
    ru: 'Обмен крипто-активов с любым % риска',
    en: 'Crypto assets exchange with any % risk',
  },
  {
    id: DirectionIds.LEGALIZATION,
    ru: 'Легализация средств',
    en: 'Legalization of funds',
  },
  {
    id: DirectionIds.OTHER,
    ru: 'Другое (предложу менеджеру)',
    en: 'Other (will consult manager)',
  },
]
