import { useState } from 'react';
import { toast } from 'react-toastify';
import { InputEdit } from "../../../shared/ui/Input/Edit";

export const ConnectionsBlock = ({ language }) => {

  const connectionsContent = [
    {
      id: 'tg',
      title: {
        ru: 'Привязка телеграм',
        en: 'Telegram connect'
      },
      input_title: {
        ru: 'Ник телеграм',
        en: 'Telegram username'
      },
      input_value: '@liestck',
      button: {
        ru: 'Привязать новую телеграм',
        en: 'Connect new telegram'
      }
    },
    {
      id: 'email',
      title: {
        ru: 'Привязка почты',
        en: 'Email connect'
      },
      input_title: {
        ru: 'Почта',
        en: 'Email'
      },
      input_value: 'liestck@gmail.com',
      button: {
        ru: 'Привязать новую почту',
        en: 'Connect new email'
      }
    }
  ]
  
  // TG INPUT
  const [TGURL, setTGURL] = useState('@liestck');
  const [isTGLock, setIsTGLock] = useState(true);
  const handleTGToggleEdit = () => { setIsTGLock((prev) => !prev) };

  const handleChangeTG = () => {
    toast.success(language === 'en' ? 'Telegram changed' : 'Телеграм изменен', {
      position: "top-center",
      autoClose: 3000,
      theme: 'dark',
    });
  };

  // EMAIL INPUT
  const [EmailURL, setEmailURL] = useState('liestck@gmail.com');
  const [isEmailLock, setIsEmailLock] = useState(true);
  const [isEmailError, setIsEmailError] = useState(false);

  const handleEmailToggleEdit = () => { setIsEmailLock((prev) => !prev) };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length >= 6;
  };

  const handleChangeEmail = (e) => {
    const newValue = e.target.value;
    const isValid = validateEmail(newValue);
  
    setEmailURL(newValue);
    setIsEmailError(!isValid);
    
    if (isValid) {
      toast.success(language === 'en' ? 'Email changed' : 'Почта изменена', {
        position: "top-center",
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  return (
    <div className="connections">
      {connectionsContent.map((connect, index) => {
        return (
          <div className="container_default container__connect" key={index}>
            <div className="connections__top">
              <h2 className="text text_h3">
                <div className="connections__top__image-container">
                  {connect.id === 'tg' && (
                    <svg className="image" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.1493 15.2081L19.2326 8.66962M26.4784 4.67933L20.4994 22.6164C19.9636 24.2239 19.6955 25.0281 19.2333 25.2946C18.8325 25.5258 18.3362 25.5644 17.8996 25.3972C17.3962 25.2044 16.9876 24.4514 16.1726 22.9466L12.3856 15.9552C12.2562 15.7164 12.1915 15.5975 12.1051 15.494C12.0284 15.4022 11.9399 15.3195 11.8405 15.2487C11.7309 15.1708 11.6043 15.1124 11.3572 14.9983L3.76573 11.4945C2.13558 10.7421 1.32043 10.3656 1.11155 9.90091C0.930397 9.49791 0.97171 9.03935 1.22217 8.66933C1.51097 8.24266 2.38203 7.9948 4.124 7.50003L23.5556 1.98092C24.9251 1.59195 25.6101 1.39762 26.0727 1.55438C26.4756 1.69092 26.7932 1.98384 26.9412 2.35577C27.1109 2.78256 26.9002 3.41457 26.4793 4.67746L26.4784 4.67933Z" strokeWidth="2"/>
                    </svg>
                  )}
                  {connect.id === 'email' && (
                    <svg className="image" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.33333 2.35714L10.4768 8.61665L10.4796 8.61894C11.3838 9.29389 11.8362 9.63156 12.3317 9.76201C12.7696 9.87731 13.23 9.87731 13.668 9.76201C14.1639 9.63144 14.6176 9.29278 15.5234 8.61665C15.5234 8.61665 20.7468 4.53663 23.6667 2.35714M1 15.6574V5.34312C1 3.82298 1 3.06234 1.29065 2.48172C1.54631 1.971 1.95396 1.55607 2.45573 1.29584C3.02616 1 3.77345 1 5.26693 1H20.7336C22.2271 1 22.9728 1 23.5432 1.29584C24.045 1.55607 24.454 1.971 24.7096 2.48172C25 3.06177 25 3.82149 25 5.33866V15.662C25 17.1792 25 17.9378 24.7096 18.5178C24.454 19.0286 24.045 19.4442 23.5432 19.7044C22.9733 20 22.228 20 20.7375 20H5.26255C3.77199 20 3.0256 20 2.45573 19.7044C1.95396 19.4442 1.54631 19.0286 1.29065 18.5178C1 17.9372 1 17.1776 1 15.6574Z" strokeWidth="2" />
                    </svg>              
                  )}
                </div>
                {connect.title[language] || connect.title.ru}
              </h2>
            </div>

            <div className="connections__bottom">
              <h4 className="text text_h4 text_h4_light">
                {connect.input_title[language] || connect.input_title.ru}
              </h4>

              {connect.id === 'tg' && (
                <InputEdit
                  lockState={isTGLock}
                  changeLockState={setTGURL}
                  inputValue={TGURL}
                  handler={handleTGToggleEdit}
                />
              )}

              {connect.id === 'email' && (
                <InputEdit
                  lockState={isEmailLock}
                  changeLockState={handleChangeEmail}
                  inputValue={EmailURL}
                  handler={handleEmailToggleEdit}
                  hasError={isEmailError}
                />
              )}

              {connect.id === 'tg' && (
                <button className='button button_submit button_active' onClick={handleChangeTG}>
                  {connect.button[language] || connect.button.ru}
                </button>
              )}

              {connect.id === 'email' && (
                <button className='button button_submit button_active' onClick={handleChangeEmail}>
                  {connect.button[language] || connect.button.ru}
                </button>
              )}


            </div>
          </div>
        );
      })}
    </div>
  );
}