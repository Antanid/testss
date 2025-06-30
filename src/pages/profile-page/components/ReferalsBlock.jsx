import { useState } from 'react'
import { toast } from 'react-toastify'
import { ReferalTable } from '../components/ReferalsTable'
import { InputEdit } from '../../../shared/ui/Input/Edit'

export const ReferalBlock = ({ language }) => {
  const generateRandomString = length => {
    // !!!Тестовый вариант рандомных ссылок - получать из API !!!
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const [referalURL, setReferalURL] = useState(() => generateRandomString(20))
  const [isReferalLock, setIsReferalLock] = useState(true)

  const referalItems = [
    {
      title: {
        ru: 'Количество рефералов',
        en: 'Number of referrals',
      },
      count: '413',
    },
    {
      title: {
        ru: 'Процент реферальной системы',
        en: 'Percentage of the referral system',
      },
      count: '15%',
    },
  ]

  const handleReferalToggleEdit = () => {
    setIsReferalLock(prev => !prev)
  }

  const handleReferalLinkCopy = () => {
    navigator.clipboard
      .writeText(`https://woza-exchange.com/?invite=${referalURL}`)
      .then(() => {
        toast.success(language === 'en' ? 'Link copied!' : 'Ссылка скопирована!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        })
      })
      .catch(err => {
        console.error('Failed to copy: ', err)
      })
  }
  // ===============================================================================

  return (
    <>
      <div className="container__left">
        <h3 className="text text_h3">
          {language === 'en' ? 'Referral system Settings' : 'Настройки реферальной системы'}
        </h3>

        <div className="container__inner">
          {referalItems.map((item, index) => {
            return (
              <div
                key={index}
                className={
                  index === 0
                    ? 'container_default container_accent referal__item'
                    : 'container_default referal__item'
                }
              >
                <div className="referal__item__top">
                  <div className="referal__item__image">
                    <svg
                      className="image"
                      viewBox="0 0 34 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.8889 27C25.8889 24.1281 21.9092 21.8 17 21.8C12.0908 21.8 8.11111 24.1281 8.11111 27M33 21.8006C33 19.6683 30.8061 17.8358 27.6667 17.0333M1 21.8006C1 19.6683 3.19395 17.8358 6.33333 17.0333M27.6667 10.0759C28.7578 9.12376 29.4444 7.74007 29.4444 6.2C29.4444 3.32812 27.0566 1 24.1111 1C22.7451 1 21.4991 1.50068 20.5556 2.32408M6.33333 10.0759C5.24222 9.12376 4.55556 7.74007 4.55556 6.2C4.55556 3.32812 6.94337 1 9.88889 1C11.2549 1 12.5009 1.50068 13.4444 2.32408M17 16.6C14.0545 16.6 11.6667 14.2719 11.6667 11.4C11.6667 8.52812 14.0545 6.2 17 6.2C19.9455 6.2 22.3333 8.52812 22.3333 11.4C22.3333 14.2719 19.9455 16.6 17 16.6Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  <div className="referal__item__title">
                    <h4 className="text text_h4 text_h4_light">
                      {item.title[language] || item.title.ru}
                    </h4>
                  </div>
                </div>
                <div className="referal__item__bottom">
                  <h1 className="text text_h1">{item.count}</h1>
                </div>
              </div>
            )
          })}
        </div>

        <div className="referal__link">
          <h4 className="text text_h4 text_h4_light">
            {language === 'en' ? 'Referal link' : 'Реферальная ссылка'}
          </h4>
          <InputEdit
            lockState={isReferalLock}
            changeLockState={setReferalURL}
            inputValue={referalURL}
            handler={handleReferalToggleEdit}
          />

          <div className="referal__link__button-container">
            <button className="button button_submit button_active" onClick={handleReferalLinkCopy}>
              {language === 'en' ? 'Copy link' : 'Скопировать ссылку'}
            </button>
          </div>
        </div>
      </div>

      <ReferalTable language={language} />
    </>
  )
}
