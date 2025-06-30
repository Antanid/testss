import styles from '../ui/HomePage.module.scss'
import { useNavigate } from 'react-router-dom'

export const FeaturesBlock = ({ language, Icons, Images }) => {
  const navigate = useNavigate()

  return (
    <>
      <section className={styles.b1}>
        <div className={styles.features_cont}>
          <div className={styles.features_subcont}>
            <div className={`${styles.features_item} ${styles.first}`}>
              <Images.BgStars />
              <div>
                <h2>
                  {language === 'en'
                    ? 'Instant execution of operations'
                    : 'Мгновенное проведение операций'}
                </h2>
              </div>
              <div>
                <div>
                  <Icons.ClockIcon />
                  <h4>
                    {language === 'en'
                      ? 'Most exchanges take place automatically and take no more than 5 minutes'
                      : 'Большинство обменов проходят автоматически и занимают не более 5 минут'}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.features_subcont}>
            <div className={`${styles.features_item} ${styles.second}`}>
              <div className={styles.exchange_arrows_container}>
                <Images.ChangeArrows className={styles.exchange_arrows} />
              </div>
              <div className={styles.features_item_seconds_text}>
                <h2>
                  {language === 'en' ? 'Start exchanging now' : 'Начни обменивать уже сейчас'}
                </h2>
              </div>
              <button
                className={styles.features_item_seconds_button}
                onClick={() => {
                  navigate('/exchange')
                }}
              >
                <h4>{language === 'en' ? 'Open exchanger' : 'Перейти к обменнику'}</h4>
                <span>
                  <Icons.ArrowRightIcon />
                </span>
              </button>
            </div>
            <div className={`${styles.features_item} ${styles.third}`}>
              <svg fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M188 74C188 98.3005 207.699 118 232 118H291C299.284 118 306 124.716 306 133V363C306 371.284 299.284 378 291 378H15C6.71573 378 2.77854e-07 371.284 0 363V15C5.6054e-06 6.71573 6.71573 1.32878e-07 15 0H173C181.284 0 188 6.71573 188 15V74Z" />
              </svg>
              <div className={styles.overlay}></div>
              <div className={styles.features_item_subcont}>
                <div
                  onClick={() => {
                    navigate('/exchange')
                  }}
                >
                  <span className={styles.redir_icon}>
                    <Icons.ArrowCornerIcon />
                  </span>
                </div>
              </div>
              <div className={styles.content}>
                <div>
                  <h2>99+</h2>
                </div>
                <div>
                  <h4>
                    {language === 'en'
                      ? `Our service offers
                        more than 99 options
                        exchange of funds`
                      : `Наш сервис предлагает
                        больше 99 вариантов
                        обмена средств`}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="sl" />
    </>
  )
}
