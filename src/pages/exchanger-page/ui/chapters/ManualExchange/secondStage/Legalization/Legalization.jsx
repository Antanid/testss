import styles from './Legalization.module.scss'
import { useLanguage } from '@/shared/lang/index.jsx'
import { MANAGER_CONTACT } from '@/utils/constants.js'

export const Legalization = () => {
  const { language } = useLanguage()

  return (
    <div>
      <div className={styles.root}>
        <p className="text text_h4">
          {language === 'en'
            ? `❗️This is a personalized service. Please contact the manager to clarify the exchange conditions for the selected direction – ${MANAGER_CONTACT}`
            : `❗️Это индивидуальное направление, необходимо связаться с менеджером для уточнения условий обмена по выбранному направлению - ${MANAGER_CONTACT}`}
        </p>
      </div>

      <div
        className="exchanger__next-stage"
        style={{
          marginTop: '1rem',
        }}
      >
        <button className="button button_accent" onClick={() => console.log('CREATE')}>
          {language === 'en' ? 'Contact the manager' : 'Связаться с менеджером'}
        </button>
        <button className="button button_accent" onClick={() => console.log('CREATE')}>
          {language === 'en' ? 'Article' : 'Статья'}
        </button>
      </div>
    </div>
  )
}
