import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/shared/lang';

// ==========================================================
const BtnGoToExchanger = ({icon=false}) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <button className='button' onClick={() =>  { navigate('/exchange')}}>
      <h3 className='text text_h3 text_button'>
        {icon && (
          <svg className='icon' viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27 12.5H2M2 12.5L12.7143 23M2 12.5L12.7143 2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {icon ? (
          language === 'en' ? 'Back to exchanger' : 'Вернуться к обменнику'
        ) : (
          language === 'en' ? 'Back to exchange' : 'Вернуться к обмену'
        )}
      </h3>
    </button>
  );
};

// ==========================================================
const BtnConnectManager = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <button className='button' onClick={() =>  { navigate('/exchange')}}>
      <h3 className='text text_h3 text_button'>
        {language === 'en' ?
          'Contact the manager' :
          `Связаться с менеджером`}
        <svg className='icon icon__contact-manager' viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 12.5H2M2 12.5L12.7143 23M2 12.5L12.7143 2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </h3>
    </button>
  );
};

// ==========================================================
const BtnGoToTransaction = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  return (
    <button className='button' onClick={() =>  { navigate('/exchange')}}>
      <h3 className='text text_h3 text_button'>
        {language === 'en' ?
          'Transaction' :
          `Транзакция`}
        <svg className='icon icon__contact-manager' viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M27 12.5H2M2 12.5L12.7143 23M2 12.5L12.7143 2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </h3>
    </button>
  );
};

// ==========================================================
const BtnPrevStage = ({ handlePrevStage }) => {
  return (
    <button className='button button__prev-stage' onClick={handlePrevStage}>
      <svg className='icon icon__contact-manager' viewBox="0 0 29 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27 12.5H2M2 12.5L12.7143 23M2 12.5L12.7143 2" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Назад
    </button>
  );
};


export { BtnGoToExchanger, BtnConnectManager, BtnGoToTransaction, BtnPrevStage };