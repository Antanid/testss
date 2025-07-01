import HintButton from '@/features/HintButton.jsx'
import { useLanguage } from '@/shared/lang/index.jsx'
import { CaretRight } from 'phosphor-react'
import AutocompleteSelect from '@/pages/exchanger-page/components/AutoComplete/AutoComplete.jsx'

export const ManualFirstStage = ({ activeStage, exchangeStages, nextStageButton }) => {
  const { language } = useLanguage()

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
        options={['Направление 1', 'Направление 2', 'Направление 3']}
        onOptionClick={option => console.log('Выбрали:', option)}
        headerTitle={language === 'en' ? 'Find a direction' : 'Выбрать направление'}
        placeholder={language === 'en' ? 'Find a direction' : 'Найти направление'}
      >
        <div className="manual_exchange_root">
          <p className="text text_h4">
            {language === 'en'
              ? 'Select destinations from the list'
              : 'Выбрать направления из списка'}
          </p>

          <div className="manual_exchange_select">
            <p className="text text_h3">Крипто &gt; Наличные</p>
            <CaretRight size={24} />
          </div>
        </div>
      </AutocompleteSelect>

      {/* ~~~~~~~~~~~~~~~| Следующий этап |~~~~~~~~~~~~~~~~~~ */}

      <div className="exchanger__next-stage">{nextStageButton()}</div>
    </>
  )
}
