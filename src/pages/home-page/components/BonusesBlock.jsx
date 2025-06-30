import styles from '../ui/HomePage.module.scss'
import useOnScreen from '@/shared/hooks/FadeIn/useOnScreen'
import StarPattern from '@/shared/star_pattern'
import HintButton from '../../../features/HintButton'

export const BonusesBlock = ({ language, Icons, Images }) => {
  const [refContainer, ContainerVisible] = useOnScreen()

  const bonusesContent = [
    {
      title: {
        ru: 'Вознаграждения распределяются на рефералов',
        en: 'Rewards are distributed to referrals',
      },
      description: {
        ru: 'Система, которая в случайный момент после успешного обмена дарит от 1 до 5 бесплатных обменов (без комиссии)',
        en: 'A system that randomly rewards you with 1 to 5 free exchanges (no fee) at some point after a successful exchange',
      },
    },
    {
      title: {
        ru: 'Пополняй баланс и закрывай комиссию',
        en: 'Top up your balance and cover the fee',
      },
      description: {
        ru: 'Система, которая в случайный момент после успешного обмена дарит от 1 до 5 бесплатных обменов (без комиссии)',
        en: 'A system that randomly rewards you with 1 to 5 free exchanges (no fee) at some point after a successful exchange',
      },
    },
  ]

  return (
    <section className={`${styles.b1} ${styles.bonuses}`}>
      <div className={styles.bonuses_bg_stars_pattern}>
        <Images.BgStars />
      </div>
      <div
        className={`${styles.bonuses_container_c1} ${ContainerVisible ? 'visible_top' : ''}`}
        ref={refContainer}
      >
        <div className={styles.bonuses_container_c1_star_pattern}>
          <Icons.Y2kStarIcon />
          <Icons.Y2kStarIcon />
        </div>

        <div className={styles.bonuses_container_c1_particle}>
          <img
            className={styles.bonuses_container_c1_particle_i1}
            src="bonuses_particle_1.svg"
            alt=""
          />
          <img
            className={styles.bonuses_container_c1_particle_i2}
            src="bonuses_particle_2.svg"
            alt=""
          />
        </div>

        <div className={styles.bonuses_container_c1_object}>
          <Images.BonusesObject />
        </div>

        <div className={styles.bonuses_container_c1_content}>
          <div className={styles.bonuses_container_c1_content_inner}>
            <h2>{language === 'en' ? 'Free exchange system' : 'Система бесплатных обменов'}</h2>
            <h4>
              {language === 'en'
                ? 'A system that, at a random moment after a successful exchange, will issue from 1 to 5 free exchanges (without commission)'
                : 'Система, которая в рандомный момент после успешного обмена выдаст от 1 до 5 бесплатных обменов (без комиссии)'}
            </h4>
          </div>
        </div>
      </div>

      <div className={styles.bonuses_container_c2}>
        {bonusesContent.map((item, index) => {
          const [ref, isVisible] = useOnScreen()
          return (
            <div
              className={`${styles.bonuses_container_c2_item} ${isVisible ? 'visible_bottom' : ''}`}
              key={index}
              ref={ref}
            >
              <div className={styles.bonuses_container_c2_item_content}>
                <div className={styles.bonuses_container_c2_item_content_top}>
                  <h2 className={styles.bonues_icon_title}>
                    {item.title[language] || item.title.ru}
                    <HintButton
                      direction="top"
                      title={{
                        ru: 'Вознаграждения для рефералов',
                        en: 'Referral rewards',
                      }}
                      text={{
                        ru: 'После успешного обмена случайным образом начисляются от 1 до 5 бесплатных обменов без комиссии.',
                        en: 'After a successful exchange, you may randomly receive 1 to 5 free exchanges with no fees.',
                      }}
                    />
                  </h2>
                </div>
                <div className={styles.bonuses_container_c2_item_content_bottom}>
                  <div className={styles.bonuses_container_c2_item_content_bottom_icon}>
                    <Icons.StarIcon />
                  </div>

                  <h4>{item.description[language] || item.description.ru}</h4>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
