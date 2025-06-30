import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/shared/lang';
import { useTheme } from '@/shared/theme';
import * as Icons from '@/shared/ui/icons';
import { Sun, Moon } from 'lucide-react';

// ==========================================================
const BtnExchange = ({className, onClick}) => {
  const { language } = useLanguage();

  return (
    <button type="button" className={className} onClick={onClick}>
      {language === 'en' ? 'Exchanger' : 'Обменник'}
    </button>
  );
};
// ==========================================================
const BtnLogin = ({ onClick, className }) => {
  const { language } = useLanguage();

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {language === 'en' ? 'Login' : 'Войти'}
    </button>
  );
};
// ==========================================================
const BtnExit = ({ onClick, className }) => {
  const { language } = useLanguage();

  return (
    <button
    className={className}
    onClick={onClick}>
      {language === 'en' ? 'Exit' : 'Выйти'}
    </button>
  );
};
// ==========================================================
const BtnProfile = ({ className, onClick, isOpen, ...rest }) => {
  return (
    <button
      className={className}
      onClick={onClick}
      aria-expanded={isOpen}
      {...rest}
    >
      <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.4688 0.301758C12.4647 0.301758 0.301758 12.4647 0.301758 27.4688C0.301758 42.4728 12.4647 54.6357 27.4688 54.6357C42.4728 54.6357 54.6357 42.4728 54.6357 27.4688C54.6357 12.4647 42.4728 0.301758 27.4688 0.301758ZM27.4688 13.5876C32.8412 13.5876 37.2126 17.9591 37.2126 23.3315C37.2126 28.7045 32.8412 33.0754 27.4688 33.0754C22.0957 33.0754 17.7249 28.7045 17.7249 23.3315C17.7249 17.9591 22.0957 13.5876 27.4688 13.5876ZM27.4688 50.9187C20.7464 50.9187 14.7166 47.9696 10.5908 43.2981C12.5088 39.8267 15.5074 36.9736 19.0729 35.2439C20.2858 34.6559 21.7015 34.6656 22.9578 35.2687C24.3723 35.9485 25.89 36.2926 27.4694 36.2926C29.0481 36.2926 30.5664 35.9479 31.9809 35.2687C33.2384 34.665 34.6541 34.6559 35.8658 35.2439C39.4313 36.973 42.4293 39.8267 44.3473 43.2981C40.2209 47.969 34.1911 50.9187 27.4688 50.9187Z" fill="#5D00FF"/>
        <path d="M27.4688 13.5876C32.8412 13.5876 37.2126 17.9591 37.2126 23.3315C37.2126 28.7045 32.8412 33.0754 27.4688 33.0754C22.0957 33.0754 17.7249 28.7045 17.7249 23.3315C17.7249 17.9591 22.0957 13.5876 27.4688 13.5876Z" fill="white"/>
        <path d="M27.4688 50.9187C20.7464 50.9187 14.7166 47.9696 10.5908 43.2981C12.5088 39.8267 15.5074 36.9736 19.0729 35.2439C20.2858 34.6559 21.7015 34.6656 22.9578 35.2687C24.3723 35.9485 25.89 36.2926 27.4694 36.2926C29.0481 36.2926 30.5664 35.9479 31.9809 35.2687C33.2384 34.665 34.6541 34.6559 35.8658 35.2439C39.4313 36.973 42.4293 39.8267 44.3473 43.2981C40.2209 47.969 34.1911 50.9187 27.4688 50.9187Z" fill="white"/>
      </svg>
    </button>
  );
};
// ==========================================================
const BtnProfileMobile = ({ onClick }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <button 
      onClick={() => {
        navigate('/profile');
        if (onClick) onClick(); // безопасный вызов
      }}
    >
      {language === 'en' ? 'Account' : 'Личный кабинет'}
    </button>
  );
};
// ==========================================================
const Spinner = () => (
  <span className="loading-spinner"></span>
);

const BtnLang = ({ className }) => {
  const { language, toggleLanguage } = useLanguage();
  const isAnimating = useRef(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [isPointerEventsEnabled, setIsPointerEventsEnabled] = useState(true);

  const handleToggle = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsPointerEventsEnabled(false);
    setShowSpinner(true);
    toggleLanguage();
    
    

    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li, button, a, label');
    textElements.forEach(el => el.classList.add('language-change-animation'));
    setTimeout(() => {
      textElements.forEach(el => el.classList.remove('language-change-animation'));
      setShowSpinner(false); 
      setIsPointerEventsEnabled(true);
      isAnimating.current = false;
    }, 1000);
  };

  return (
    <button
      className={className}
      onClick={handleToggle}
      style={{ pointerEvents: isPointerEventsEnabled ? 'auto' : 'none' }}
    >
      {showSpinner ? (
        <Spinner />
      ) : (
        <>
          {language === 'en' ? 'English' : 'Русский'} <Icons.ArrowRightIcon />
        </>
      )}
    </button>
  );
};
// ==========================================================
const BtnChangeTheme = ({ className }) => {
  const { toggleTheme, theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={className} onClick={toggleTheme}>
      <Sun />
      <Moon />
    </div>
  );
};

// ==========================================================
const BtnAuthSubmit = ({ className, disabled, children }) => {
  return (
    <button
      className={className}
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { BtnExchange, BtnLogin, BtnLang, BtnChangeTheme, BtnAuthSubmit, BtnProfile, BtnExit, BtnProfileMobile };