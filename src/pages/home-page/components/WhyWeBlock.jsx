import styles from '../ui/HomePage.module.scss';
import { BlockTitle } from '../components/BlockTitle';
import useOnScreen from '@/shared/hooks/FadeIn/useOnScreen';

export const WhyWeBlock = ({ language, Icons, Images }) => {
    const [refTitle, TitleVisible] = useOnScreen();
    
    const whyweContent = [
        {
            title: {
                ru: 'Выгодный курс',
                en: 'Profitable course'
            },
            description: {
                ru: 'Обменивайте криптовалюту без скрытых комиссий — всё прозрачно',
                en: 'Exchange cryptocurrencies without hidden fees — everything is transparent'
            }
        },
        {
            title: {
                ru: 'Надёжность и защита',
                en: 'Reliability and protection'
            },
            description: {
                ru: 'Современные протоколы шифрования и защита от мошенников',
                en: 'Modern encryption protocols and fraud protection'
            }
        },
        {
            title: {
                ru: 'Партнёрская программа',
                en: 'Partner Program'
            },
            description: {
                ru: 'Приглашай друзей и получай пассивный доход с каждой их сделки',
                en: 'Invite your friends and earn passive income from each of their transactions'
            }
        },
        {
            title: {
                ru: 'Выгодный курс',
                en: 'Profitable course'
            },
            description: {
                ru: 'Обменивайте криптовалюту без скрытых комиссий — всё прозрачно',
                en: 'Exchange cryptocurrencies without hidden fees — everything is transparent'
            }
        },
    ];

    return (
        <section className={`${styles.b1} ${styles.whywe}`}>
            <BlockTitle className={`block_title ${TitleVisible ? 'visible_left': ''}`} language={language} Icons={Icons} ref={refTitle}
            en='Why us?' ru='Почему мы?'
            arrow />

            <div className={styles.whywe_bg}>
                <Images.BgStars/>
            </div>

            <div className={styles.whywe_container}>
                
                {whyweContent.map((item, index) => {
                    const [ref, isVisible] = useOnScreen();

                    let fadeDirection = '';
                    if (index === 1 || index == 3) {
                        fadeDirection = 'visible_right';
                    } else if (index === 0 || 2) {
                        fadeDirection = 'visible_left';
                    }

                    let whyweIcon = ''
                    if (index === 0 || index == 3) {
                        whyweIcon = <Icons.ArrowFitIcon />;
                    } else if (index === 1) {
                        whyweIcon = <Icons.BracketIcon />;
                    } else if (index === 2) {
                        whyweIcon = <Icons.ArrowCutIcon />;
                    }

                    return (
                        <div
                        className={`${styles.whywe_item} ${isVisible ? fadeDirection : ''}`}
                        ref={ref}
                        key={index}
                        style={{ opacity: isVisible ? 1 : 0 }} 
                        >   
                            <h2>
                                {item.title[language] || item.title.ru}
                                <div className={styles.whywe_icon_container}>
                                    {whyweIcon}
                                </div>
                            </h2>
                            <h4>{item.description[language] || item.description.ru}</h4>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};