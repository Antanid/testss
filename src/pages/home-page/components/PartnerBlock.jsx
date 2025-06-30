import styles from '../ui/HomePage.module.scss';
import { BlockTitle } from '../components/BlockTitle';
import useOnScreen from '@/shared/hooks/FadeIn/useOnScreen';
import StarPattern from '@/shared/star_pattern';

export const PartnerBlock = ({ language, Icons, Images }) => {
    const [refTitle, TitleVisible] = useOnScreen();

    const partnerContent = [
      {
        title: {
          ru: 'До 30% от комиссии обмена',
          en: 'Up to 30% of the exchange fee'
        }
      },
      {
        title: {
          ru: 'Уникальная реферальная ссылка для каждого партнёра',
          en: 'A unique referral link for each partner'
        }
      },
      {
        title: {
          ru: 'Статистика и прозрачные начисления в личном кабинете',
          en: 'Statistics and transparent payouts in your personal account'
        }
      },
      {
        title: {
          ru: 'Начисления автоматически после каждой транзакции',
          en: 'Payouts are made automatically after each transaction'
        }
      }
    ];

    return (
        <section className={`${styles.b1} ${styles.partner}`}>
            <BlockTitle className={`block_title ${TitleVisible ? 'visible_left': ''}`} language={language} Icons={Icons} ref={refTitle}
            en='Referral system' ru='Реферальная система'
            arrow />
            <div className={styles.partner_container}>
                <div className={styles.partner_grid}>
                  {partnerContent.map((item, index) => {
                    const [ref, isVisible] = useOnScreen();

                      return (
                          <div className={styles.partner_grid_item} key={index}>
                              <div
                                className={`${styles.partner_grid_item_num_overlay} ${isVisible ? 'visible_zoom' : ''}`}
                                ref={ref}
                              >
                              </div>
                              <div
                                className={`${styles.partner_grid_item_num} ${isVisible ? 'visible_zoom' : ''}`}
                                ref={ref}
                              >
                                  {index+1}
                              </div>
                              <div
                                className={`${styles.partner_grid_item_content} ${isVisible ? 'visible_right' : ''}`}
                                ref={ref}
                                style={{ opacity: isVisible ? 1 : 0 }}
                              >
                                {item.title[language] || item.title.ru}
                              </div>
                          </div>
                      );
                  })}
                </div>
            </div>
        </section>
    );
};