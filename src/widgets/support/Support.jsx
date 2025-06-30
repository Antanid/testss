import { useState, useEffect } from 'react';
import { useLanguage } from '@/shared/lang';

export const Support = () => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    const target = e.target;
    const supportElement = document.querySelector('.support');

    if (supportElement && !supportElement.contains(target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className='support'>
      <button className="support__button" onClick={toggleMenu}>
        <img src="/support.png" alt="sup" />
      </button>
      <div className={`support__content ${isOpen ? 'support__content_show' : ''}`}>
        <a href="https://lolz.live/threads/8111546/"  target="_blank" rel="noopener noreferrer">
          <button className='support__redir'>
            <img className='support__redir__icon' src="/lolz.png" alt="lzt" />
            Lolzteam
          </button>
        </a>

        <a href="https://t.me/woza_exchange_news"  target="_blank" rel="noopener noreferrer">
          <button className='support__redir'>
            <img className='support__redir__icon' src="/contacts/telegram.svg" alt="Telegram" />
            {language === 'en' ? 'News' : 'Новости'}
          </button>
        </a>

        <a href="https://t.me/wozaexchange"  target="_blank" rel="noopener noreferrer">
          <button className='support__redir'>
            <img className='support__redir__icon' src="/contacts/telegram.svg" alt="Telegram" />
            {language === 'en' ? 'Support' : 'Поддержка'}
          </button>
        </a>
      </div>
    </div>
  );
};