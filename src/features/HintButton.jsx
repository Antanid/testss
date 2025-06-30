import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/shared/lang';

const HintButton = ({ direction = 'top', title, text }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsVisible((prev) => !prev);
  };

  // Закрытие при клике вне области
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Получаем текст в зависимости от текущего языка
  const localizedTitle = typeof title === 'object' ? title[language] : title;
  const localizedText = typeof text === 'object' ? text[language] : text;

  return (
    <div
      className={`hint-wrapper hint-direction--${direction}`}
      ref={tooltipRef}
    >
      <div className="point-hint" onClick={toggleTooltip}>
        ?
      </div>

      {isVisible && (
        <div className="hint-content">
          <div className="hint-title">{localizedTitle}</div>
          <div className="hint-text">{localizedText}</div>
        </div>
      )}
    </div>
  );
};

export default HintButton;