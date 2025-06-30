import styles from '../ui/HomePage.module.scss';
import * as Icons from '@/shared/ui/icons';

export const WelcomeBlock = ({language, Icons}) => (
  <section className={styles.b1}>
    <div className={styles.title_cont}>
      <div className={styles.title_subcont}>
        <div className={styles.title_stars}>
          <div><Icons.Y2kStarIcon /></div>
          <div><Icons.Y2kStarIcon /></div>
        </div>
        <h1>
          {language === 'en' ?
            'Fast and Reliable' :
            'Быстрый и Надежный'}
          <br />
          {language === 'en' ?
            'Exchange ' :
            'Обмен '}
          <i>
            {language === 'en' ?
              'Cryptocurrencies' :
              'Криптовалют'}
          </i>
        </h1>
      </div>
      <h3>
        {language === 'en' ?
        'Most exchanges take place automatically and take no more than 5 minutes' :
        'Большинство обменов проходят автоматически и занимают не более 5 минут'}
        <br />
      </h3>
    </div>
  </section>
);