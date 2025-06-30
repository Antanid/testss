import styles from '../ui/HomePage.module.scss';
import * as Icons from '@/shared/ui/icons';
import { BlockTitle } from '../components/BlockTitle';
import useOnScreen from '@/shared/hooks/FadeIn/useOnScreen';

export const StatsBlock = ({ language, Icons, Images }) => {
    const [refTitle, TitleVisible] = useOnScreen();
    const [refContainer, ContainerVisible] = useOnScreen();
    
    const statsContent = [
        {
            stat: '35',
            title: {
                ru: 'Направлений обмена',
                en: 'Exchange directions'
            },
            description: {
                ru: 'Гибкий обменник с возможностью обмена практически в любом направлении',
                en: 'A flexible exchange with the ability to trade in almost any direction'
            }
        },
        {
            stat: '1000',
            title: {
                ru: 'Обменных пунктов по всему миру',
                en: 'Exchange points worldwide'
            },
            description: {
                ru: 'Обменивайте криптовалюту по всему миру используя наш сервис',
                en: 'Exchange cryptocurrency worldwide using our service'
            }
        },
        {
            stat: '1M',
            title: {
                ru: 'Успешных обменов',
                en: 'Successful exchanges'
            },
            description: {
                ru: 'Мы провели большое количество обменов суммарно на сумму свыше 1 миллиона долларов',
                en: 'We have carried out a large number of exchanges totaling over one million dollars'
            }
        },
        {
            stat: '2000',
            title: {
                ru: 'Довольных клиентов',
                en: 'Satisfied customers'
            },
            description: {
                ru: 'Более двух тысяч довольных клиентов по разным направлениям',
                en: 'More than two thousand satisfied customers across various directions'
            }
        },
    ];

    return (
        <section className={`${styles.b1} ${styles.stats}`}>
            <BlockTitle className={`block_title ${TitleVisible ? 'visible_left': ''}`} language={language} Icons={Icons} ref={refTitle}
            en='Statistical factors of influence' ru='Статистические факторы влияния'/>
            <div className={`${styles.stats_block_cont} ${ContainerVisible ? 'visible_top': ''}`} ref={refContainer}>
                <Images.StatsParticle />
                {statsContent.map((item, index) => {
                    const [ref, isVisible] = useOnScreen(); // уникальный хук на каждый элемент
                    return (
                        <div 
                            className={`${styles.stats_item} ${isVisible ? 'visible_bottom' : ''}`}
                            ref={ref}
                            key={index}
                            style={{ opacity: isVisible ? 1 : 0 }} 
                        >
                            <h1>{item.stat}+</h1>
                            <h2>{item.title[language] || item.title.ru}</h2>
                            <h4><i>{item.description[language] || item.description.ru}</i></h4>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};