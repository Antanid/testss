import React from 'react';
import { useLanguage } from '@/shared/lang';

export const InputEdit = ({lockState, changeLockState, inputValue, handler}) => {
  const { language } = useLanguage();

  return (
    <div className='input-container'>
      <input
        className={`input ${!lockState ? 'input_edit' : ''}`}
        type="text"
        value={inputValue}
        onChange={(e) => {
          const newValue = e.target.value;
          if (newValue.length <= 30) {
            changeLockState(newValue);
          }
        }}
        readOnly={lockState}
      />
      <div
        className={`input__icon${!lockState ? ' input__icon_edit' : ''}`}
        onClick={handler}
      >
        <svg className='image' viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.21258 4.68129L1 12.8938V17L5.10629 17L13.3189 8.78752M9.21258 4.68129L12.1574 1.73645L12.1592 1.73471C12.5646 1.32934 12.7676 1.12629 13.0017 1.05024C13.2079 0.983252 13.43 0.983252 13.6362 1.05024C13.8701 1.12624 14.0729 1.32905 14.4777 1.73385L16.2637 3.51985C16.6702 3.92638 16.8736 4.12975 16.9498 4.36414C17.0168 4.57032 17.0167 4.79241 16.9497 4.99858C16.8736 5.23281 16.6706 5.43586 16.2646 5.84182L16.2637 5.84269L13.3189 8.78752M9.21258 4.68129L13.3189 8.78752" stroke="white" strokeWidth="2"/>
        </svg>
      </div>
    </div>
  );
};