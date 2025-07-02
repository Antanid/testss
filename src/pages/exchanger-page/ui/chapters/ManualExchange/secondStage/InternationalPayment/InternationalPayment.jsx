import styles from './InternationalPayment.module.scss'
import { useLanguage } from '@/shared/lang/index.jsx'
import { MANAGER_CONTACT } from '@/utils/constants.js'
import { useEffect, useState } from 'react'

export const InternationalPayment = () => {
  const { language } = useLanguage()

  const [isWide, setIsWide] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
          display: 'flex',
          flexDirection: isWide ? 'row' : 'column',
          gap: '0.5rem',
        }}
      >
        <button
          className="button button_accent"
          style={{ width: '100%' }}
          onClick={() => console.log('CREATE')}
        >
          {language === 'en' ? 'Contact the manager' : 'Связаться с менеджером'}
        </button>
        <button
          className="button button_accent"
          style={{ width: '100%' }}
          onClick={() => console.log('CREATE')}
        >
          {language === 'en' ? 'Article' : 'Статья'}
        </button>
      </div>
    </div>
  )
}
