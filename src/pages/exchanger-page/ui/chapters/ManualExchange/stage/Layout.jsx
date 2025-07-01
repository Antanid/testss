import { useLanguage } from '@/shared/lang/index.jsx'
import HintButton from '@/features/HintButton.jsx'

export const ManualLayout = ({ children, activeStage, exchangeStages, selectedDirection }) => {
  const { language } = useLanguage()

  return (
    <>
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
      <div className="exchanger__stages">
        <h3 className="text text_h3">{selectedDirection[language]}</h3>
        <div className="exchanger__stages-visual">
          {exchangeStages.map((stage, index) => {
            const stageNumber = index + 1
            const isCompletedOrActive = stageNumber <= activeStage

            return (
              <span
                key={index}
                className={`exchanger__stages-visual__stage ${
                  isCompletedOrActive ? 'exchanger__stages-visual__stage_active' : ''
                }`}
              ></span>
            )
          })}
        </div>

        {children}
      </div>
    </>
  )
}
