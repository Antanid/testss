import React from 'react';
import styles from './InputField.module.scss';
import { useLanguage } from '@/shared/lang';

const InputField = ({ labelEn, labelRu, children }) => {
  const { language } = useLanguage();
  const labelText = language === 'en' ? labelEn : labelRu;

  return (
    <div className={styles.InputField}>
      <label className={styles.InputField_label}>{labelText}</label>
      {children}
    </div>
  );
};

export default InputField;