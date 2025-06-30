import React from 'react';
import { toast } from 'react-toastify';

export const InputCopy = ({ language, TransactionId }) => {
  const handleCopy = () => {
    if (!TransactionId) return;

    navigator.clipboard.writeText(TransactionID)
      .then(() => {
        toast.success(language === 'en' ? 'Address copied' : 'Адрес скопирован', {
          position: "top-center",
          autoClose: 3000,
          theme: 'dark',
        });
      })
      .catch(err => {
        console.error('Ошибка копирования:', err);
        toast.error(language === 'en' ? 'Failed to copy address' : 'Не удалось скопировать адрес', {
          position: "top-center",
          autoClose: 3000,
          theme: 'dark',
        });
      });
  };

  return (
    <div 
      className="exchanger__input-address__container" 
      onClick={handleCopy} // Вызывается только при клике
    >
      <input
        type="text"
        className="input exchanger__input-address"
        value={TransactionId || ''} // Подставляем ID
        readOnly // Запрещаем редактирование
      />
      <div className="qr__container">
        <svg className="qr__icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 7V4.2002C7 3.08009 7 2.51962 7.21799 2.0918C7.40973 1.71547 7.71547 1.40973 8.0918 1.21799C8.51962 1 9.08009 1 10.2002 1H15.8002C16.9203 1 17.4801 1 17.9079 1.21799C18.2842 1.40973 18.5905 1.71547 18.7822 2.0918C19.0002 2.51962 19.0002 3.07967 19.0002 4.19978V9.7998C19.0002 10.9199 19.0002 11.48 18.7822 11.9078C18.5905 12.2841 18.2839 12.5905 17.9076 12.7822C17.4802 13 16.921 13 15.8031 13H13M7 7H4.2002C3.08009 7 2.51962 7 2.0918 7.21799C1.71547 7.40973 1.40973 7.71547 1.21799 8.0918C1 8.51962 1 9.08009 1 10.2002V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H9.80355C10.9215 19 11.4805 19 11.9079 18.7822C12.2842 18.5905 12.5905 18.2839 12.7822 17.9076C13 17.4802 13 16.921 13 15.8031V13M7 7H9.8002C10.9203 7 11.4801 7 11.9079 7.21799C12.2842 7.40973 12.5905 7.71547 12.7822 8.0918C13 8.51921 13 9.079 13 10.1969L13 13"
            stroke="white" strokeOpacity="0.5"strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};