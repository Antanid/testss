import { useState } from 'react';
import * as Images from '@/shared/ui/images';
import { useLanguage } from '@/shared/lang';
import { ReferalBlock } from '../components/ReferalsBlock';
import { BalanceBlock } from '../components/BalanceBlock';
import { ConnectionsBlock } from '../components/ConnectionsBlock';

export const ProfilePage = () => {

  const { language } = useLanguage();
  const [activeChapter, setActiveChapter] = useState(0);

  const profileChapters = [
    {
      name: {
        ru: "Баланс",
        en: "Balance"
      }
    },
    {
      name: {
        ru: "Реферальная система",
        en: "Referral system"
      }
    },
    {
      name: {
        ru: "Привязки",
        en: "Connections"
      }
    }
  ];

  return (
    <div>
      <main className="page page_profile">
        <div className='bg-star-pattern bg-star-pattern_right'><Images.BgStars/></div>
        <div className='bg-star-pattern bg-star-pattern_right'><Images.BgStars/></div>
        <div className='bg-star-pattern bg-star-pattern_left'><Images.BgStars/></div>
        <section className="section">
          <h2 className="text text_h2">
            {language === 'en' ?
              'Account' :
              'Личный кабинет'}
          </h2>
          <div className="container_default container__profile">
            <div className="container__chapters">
              {profileChapters.map((chapter, index) => {
                return (
                  <button
                    key={index}
                    type='button'
                    className={index === activeChapter ? 'button button_active' : 'button'}
                    onClick={() => setActiveChapter(index)}
                  >
                    {chapter.name[language] || chapter.ru}
                    
                  </button>
                );
              })}
            </div>

            <div className="container__content">
                {activeChapter === 0 && <BalanceBlock language={language} />}
                {activeChapter === 1 && <ReferalBlock language={language} />}
                {activeChapter === 2 && <ConnectionsBlock language={language} />}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};