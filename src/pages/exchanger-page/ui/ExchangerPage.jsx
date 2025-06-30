import { useState } from 'react'
import { useLanguage } from '@/shared/lang'
import { AutoExchange } from './chapters/AutoExchange'
import * as Icons from '@/shared/ui/icons'
import * as Images from '@/shared/ui/images'

export const ExchangerPage = () => {
  const { language } = useLanguage()

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Данные монет
  const coinsData = {
    eth: {
      id: 'ETH',
      chain: 'Etherium',
      multiplier: {
        usdt: 2824.84,
        usd: 2824.84,
        rub: 224299.0,
      },
      icon: (
        <svg viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30.7132 0C36.7863 0 42.7231 1.78879 47.7727 5.14018C52.8224 8.49156 56.7581 13.255 59.0822 18.8281C61.4062 24.4013 62.0143 30.5338 60.8295 36.4502C59.6447 42.3667 56.7202 47.8013 52.4259 52.0667C48.1315 56.3322 42.6602 59.2371 36.7037 60.4139C30.7473 61.5908 24.5732 60.9868 18.9624 58.6783C13.3515 56.3698 8.55585 52.4606 5.18179 47.4449C1.80773 42.4292 0.00683594 36.5323 0.00683594 30.5C0.00683594 22.4109 3.24196 14.6531 9.00052 8.93324C14.7591 3.21338 22.5694 0 30.7132 0Z"
            fill="white"
          />
          <path
            d="M30.7132 6.54918L46.8703 30.5305L30.7132 38.6158L14.5561 30.5L22.6346 18.5079L30.7132 6.54918ZM30.7132 41.846L15.4521 33.7579L30.7132 54.4508L45.9742 33.7579L30.7132 41.846Z"
            fill="#343434"
          />
          <path
            d="M30.7132 6.54918L38.7917 18.5079L46.8703 30.5L30.7132 24.4416V6.54918Z"
            fill="#343434"
          />
          <path d="M30.7132 41.846L46.005 33.7579L30.7132 54.4813V41.846Z" fill="#313131" />
          <path d="M30.7132 24.4416L46.8703 30.5L30.7132 38.5853V24.4416Z" fill="#151515" />
          <path
            d="M30.7132 6.54918L22.6346 18.5079L14.5561 30.5L30.7132 24.4416V6.54918Z"
            fill="#8C8C8C"
          />
          <path d="M30.7132 41.846L15.4521 33.7579L30.7132 54.4813V41.846Z" fill="#8A8A8A" />
          <path d="M30.7132 24.4416L14.5561 30.5L30.7132 38.5853V24.4416Z" fill="#353535" />
        </svg>
      ), // Тестовый вариант (далее выгружать из API)
      min: 0.5,
      max: 100000,
    },

    usdt: {
      id: 'USDT',
      chain: 'TRX',
      multiplier: {
        eth: 0.000355,
        usdt: 1,
      },
      icon: (
        <svg
          width="55"
          height="55"
          viewBox="0 0 55 55"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_161_4227)">
            <path
              d="M27.5 55C42.6878 55 55 42.6878 55 27.5C55 12.3122 42.6878 0 27.5 0C12.3122 0 0 12.3122 0 27.5C0 42.6878 12.3122 55 27.5 55Z"
              fill="#26A17B"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.8034 29.8776V29.8741C30.6144 29.8879 29.6398 29.9463 27.4656 29.9463C25.7297 29.9463 24.5077 29.8948 24.078 29.8741V29.8793C17.3955 29.5854 12.4077 28.4218 12.4077 27.0296C12.4077 25.6391 17.3955 24.4755 24.078 24.1765V28.7209C24.5145 28.7518 25.7658 28.8257 27.4948 28.8257C29.5694 28.8257 30.6092 28.7398 30.8034 28.7226V24.1799C37.4722 24.4773 42.448 25.6409 42.448 27.0296C42.448 28.4218 37.4722 29.582 30.8034 29.8776ZM30.8034 23.7073V19.6407H40.1087V13.4395H14.7727V19.6407H24.078V23.7055C16.5155 24.0527 10.8281 25.5515 10.8281 27.3459C10.8281 29.1402 16.5155 30.6373 24.078 30.9862V44.0177H30.8034V30.9827C38.3539 30.6355 44.0275 29.1385 44.0275 27.3459C44.0275 25.5532 38.3539 24.0562 30.8034 23.7073Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_161_4227">
              <rect width="55" height="55" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      min: 1,
      max: 100000,
    },

    rub: {
      id: 'RUB',
      chain: 'Rubles',
      multiplier: {
        usdt: 1,
      },
      icon: (
        <svg viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.5" cy="31.5" r="31.5" fill="white" fillOpacity="0.05" />
          <path
            d="M22.8 35.1V31.96H36.46C36.6867 31.96 36.9533 31.9467 37.26 31.92C37.58 31.8933 37.9133 31.84 38.26 31.76C39.5933 31.44 40.58 30.78 41.22 29.78C41.86 28.78 42.18 27.6333 42.18 26.34C42.18 25.5133 42.0467 24.7133 41.78 23.94C41.5133 23.1667 41.0867 22.4933 40.5 21.92C39.9267 21.3467 39.18 20.96 38.26 20.76C37.94 20.6667 37.6067 20.6133 37.26 20.6C36.9267 20.5867 36.66 20.58 36.46 20.58H28.36V17.2H36.58C36.78 17.2 37.0667 17.2067 37.44 17.22C37.8267 17.2333 38.2467 17.28 38.7 17.36C40.26 17.6 41.5667 18.1333 42.62 18.96C43.6867 19.7867 44.4867 20.8267 45.02 22.08C45.5533 23.3333 45.82 24.7267 45.82 26.26C45.82 28.54 45.22 30.4667 44.02 32.04C42.82 33.6 41.0467 34.5667 38.7 34.94C38.2467 35.0067 37.8267 35.0533 37.44 35.08C37.0667 35.0933 36.78 35.1 36.58 35.1H22.8ZM22.8 41.44V38.5H38.8V41.44H22.8ZM25.8 46V17.2H29.36V46H25.8Z"
            fill="#00FF00"
          />
        </svg>
      ),
      min: 1,
      max: 100000,
    },

    usd: {
      id: 'USD',
      chain: 'Dollars',
      multiplier: {
        usdt: 1,
      },
      icon: (
        <svg viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="31.5" cy="31.5" r="31.5" fill="white" fillOpacity="0.05" />
          <path
            d="M30.38 49.96V45.34H33.94V49.96H30.38ZM30.38 17.86V13.22H33.94V17.86H30.38ZM32.44 46.6C30.4933 46.6 28.74 46.2533 27.18 45.56C25.6333 44.8533 24.36 43.86 23.36 42.58C22.36 41.2867 21.7067 39.7667 21.4 38.02L24.9 37.44C25.3267 39.2133 26.2267 40.62 27.6 41.66C28.9867 42.7 30.6533 43.22 32.6 43.22C34.56 43.22 36.1467 42.7467 37.36 41.8C38.5733 40.8533 39.18 39.6333 39.18 38.14C39.18 37.0467 38.8533 36.1667 38.2 35.5C37.56 34.8333 36.48 34.2667 34.96 33.8L28.38 31.76C24.4467 30.5333 22.48 28.1867 22.48 24.72C22.48 23.0933 22.8733 21.6733 23.66 20.46C24.46 19.2333 25.5733 18.2867 27 17.62C28.44 16.94 30.1133 16.6067 32.02 16.62C33.8733 16.6333 35.5267 16.98 36.98 17.66C38.4333 18.3267 39.6333 19.2867 40.58 20.54C41.54 21.7933 42.1867 23.2933 42.52 25.04L38.92 25.7C38.7333 24.5667 38.32 23.5733 37.68 22.72C37.0533 21.8667 36.2533 21.2067 35.28 20.74C34.3067 20.26 33.2133 20.0133 32 20C30.8667 19.9867 29.8467 20.1733 28.94 20.56C28.0467 20.9467 27.34 21.4867 26.82 22.18C26.3 22.8733 26.04 23.6667 26.04 24.56C26.04 25.5333 26.4 26.36 27.12 27.04C27.8533 27.7067 29 28.28 30.56 28.76L35.96 30.36C38.3333 31.0667 40.0467 32.02 41.1 33.22C42.1533 34.4067 42.68 35.9933 42.68 37.98C42.68 39.7 42.2533 41.2067 41.4 42.5C40.56 43.7933 39.3667 44.8 37.82 45.52C36.2867 46.24 34.4933 46.6 32.44 46.6Z"
            fill="#00FF00"
          />
        </svg>
      ),
      min: 1,
      max: 100000,
    },
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Форматирование текста
  const formatNumber = (value, options = {}) => {
    const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options

    const num = Number(value)

    if (isNaN(num)) return '0.00'

    return num.toLocaleString('en-US', {
      minimumFractionDigits,
      maximumFractionDigits,
    })
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Переключение разделов
  const [activeChapter, setActiveChapter] = useState(0)

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Переключение стадий
  const [activeStage, setActiveStage] = useState(1)

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Валютная логика
  const commissionRate = 3 // Тестовый модификатор комиссии (В идале вынести в конфиг админки)

  const [sendCurrency, setSendCurrency] = useState('eth') // Валюта на отправку
  const [getCurrency, setGetCurrency] = useState('usdt') // Валюта на получение

  const [coinsSend, setCoinsSend] = useState(coinsData[sendCurrency].min) // Монет на отправку

  const getCurrencyChain = coinsData[getCurrency].chain

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Итого получаемого
  const initialAmount = coinsData[sendCurrency].multiplier[getCurrency] * coinsSend // Итого до вычета комисси
  const amountCommission = initialAmount - initialAmount * (1 - commissionRate / 100) // Вычет комиссии
  const amountReceived = initialAmount * (1 - commissionRate / 100) // Итого после вычета комиссии

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Стадии обмена
  const exchangeStages = [
    // Этап 1
    {
      ru: 'Этап',
      en: 'Stage',
    },
    // Этап 2
    {
      ru: 'Адрес получателя',
      en: 'Recipient address',
    },
    // Этап 3
    {
      ru: 'Пополнение средств',
      en: 'Balance deposit',
    },
    // Этап 4
    {
      ru: 'Завершен',
      en: 'Completed',
    },
  ]

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Фикс. курс переключатель
  const [fixRateChecked, setFixRateChecked] = useState(false)

  const handleToggleFixRate = () => {
    setFixRateChecked(prev => !prev)
  }

  return (
    <div>
      <main className="page page__exchanger">
        <section className="section exchanger__section">
          <div className="exchanger">
            <div className="bg-stars-pattern">
              <Images.BgStars />
            </div>
            <div className="bg-stars-pattern bg-stars-pattern__right">
              <Images.BgStars />
            </div>
            <div className="container_default exchanger__container">
              {/* ~~~~~~~~~~~~~~~~~~| Разделы |~~~~~~~~~~~~~~~~~~~~~~ */}
              <div className="exchanger__chapters">
                <div
                  className={`exchanger__chapter-background ${activeChapter === 0 ? 'exchanger__chapter-background__left' : 'exchanger__chapter-background__right'}`}
                ></div>
                <button
                  className={`exchanger__chapter ${activeChapter === 0 ? 'exchanger__chapter_active' : ''}`}
                  onClick={() => setActiveChapter(0)}
                >
                  <h3 className="exchanger__chapter_h2 text text_h3">
                    {language === 'en' ? 'Automatic exchange' : 'Автоматический обмен'}
                  </h3>
                </button>
                <button
                  className={`exchanger__chapter ${activeChapter === 1 ? 'exchanger__chapter_active' : ''}`}
                  onClick={() => setActiveChapter(1)}
                >
                  <h3 className="exchanger__chapter_h2 text text_h3">
                    {language === 'en' ? 'Manual exchange' : 'Ручной обмен'}
                  </h3>
                </button>
              </div>
              <div className="exchanger__content">
                <div className="bg-stars-pattern bg-stars-pattern__bottom">
                  <Images.BgStars />
                </div>
                {/* ~~~~~~~~~~~~~~~~~~| Автоматический обмен |~~~~~~~~~~~~~~~~~~~~~~ */}
                {activeChapter === 0 && (
                  <AutoExchange
                    language={language}
                    activeStage={activeStage}
                    exchangeStages={exchangeStages}
                    coinsData={coinsData}
                    sendCurrency={sendCurrency}
                    getCurrency={getCurrency}
                    setSendCurrency={setSendCurrency}
                    setGetCurrency={setGetCurrency}
                    coinsSend={coinsSend}
                    formatNumber={formatNumber}
                    initialAmount={initialAmount}
                    amountCommission={amountCommission}
                    amountReceived={amountReceived}
                    commissionRate={commissionRate}
                    fixRateChecked={fixRateChecked}
                    handleToggleFixRate={handleToggleFixRate}
                    setActiveStage={setActiveStage}
                    setCoinsSend={setCoinsSend}
                  />
                )}
                {/* ~~~~~~~~~~~~~~~~~~| Ручной обмен |~~~~~~~~~~~~~~~~~~~~~~ */}
                {activeChapter === 1 && (
                  <AutoExchange
                    language={language}
                    activeStage={activeStage}
                    exchangeStages={exchangeStages}
                    coinsData={coinsData}
                    sendCurrency={sendCurrency}
                    getCurrency={getCurrency}
                    setSendCurrency={setSendCurrency}
                    setGetCurrency={setGetCurrency}
                    coinsSend={coinsSend}
                    formatNumber={formatNumber}
                    initialAmount={initialAmount}
                    amountCommission={amountCommission}
                    amountReceived={amountReceived}
                    commissionRate={commissionRate}
                    fixRateChecked={fixRateChecked}
                    handleToggleFixRate={handleToggleFixRate}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="section section__exchanger-info">
          <div className="exchanger-info__item">
            <h2 className="text text_h2">
              <div className="icon-star">
                <Icons.Y2kStarIcon />
              </div>
              {language === 'en'
                ? 'Which exchange type should you choose?'
                : 'Какой тип обмена выбрать?'}
            </h2>
            <h4 className="text text_h4 text_h4_light">
              {language === 'en'
                ? "The choice depends on your needs:\n\nAutomatic exchange is designed for standard transactions — cryptocurrency to cryptocurrency or cryptocurrency to rubles (with withdrawal to a card).\nAll transactions are carried out automatically, without operator involvement, ensuring high speed and convenience.\n\nManual exchange is suitable for users with special requests — for example, if you need cryptocurrency cleaning or an individual approach to exchange conditions.\n\nIf you want to quickly and effortlessly exchange cryptocurrency, we recommend using automatic mode. For non-standard tasks, it's better to choose manual exchange."
                : 'Выбор зависит от ваших потребностей:\n\nАвтоматический обмен предназначен для стандартных операций — криптовалюта на криптовалюту или криптовалюта на рубли (с выводом на карту).\nВсе сделки осуществляются автоматически, без участия оператора, что обеспечивает высокую скорость и удобство.\n\nРучной обмен подходит пользователям с особыми запросами — например, если вам требуется очистка криптовалюты или индивидуальный подход к условиям обмена.\n\nЕсли вы хотите быстро и без лишних сложностей обменять криптовалюту — рекомендуем воспользоваться автоматическим режимом. Для нестандартных задач лучше выбрать ручной обмен.'}
            </h4>
          </div>

          <div className="exchanger-info__item">
            <h2 className="text text_h2">
              <div className="icon-star">
                <Icons.Y2kStarIcon />
              </div>
              {language === 'en' ? 'Fixed or floating rate?' : 'Фиксированный или плавающий курс?'}
            </h2>
            <h4 className="text text_h4 text_h4_light">
              {language === 'en'
                ? 'Fixed rate — the rate is fixed for 10 minutes from the moment the order is created and does not change during this time.\nIt is suitable if stability and predictability of the amount are important to you.\n\nFloating rate — the rate is determined at the moment the payment arrives and may change compared to the time the order was created.\nIt is suitable if you are ready for possible fluctuations in the rate.\n\nChoose the option that best suits your needs.'
                : 'Фиксированный курс — курс фиксируется на 10 минут в момент создания заявки и не меняется за это время.\nПодходит, если вам важна стабильность и предсказуемость суммы.\n\nПлавающий курс — курс определяется в момент поступления оплаты и может измениться относительно момента создания заявки.\nПодходит, если вы готовы к возможным колебаниям курса.\n\nВыбирайте вариант исходя из ваших потребностей.'}
            </h4>
          </div>

          <div className="exchanger-info__item">
            <h2 className="text text_h2">
              <div className="icon-star">
                <Icons.Y2kStarIcon />
              </div>
              {language === 'en' ? 'Free Exchange System' : 'Система бесплатных обменов'}
            </h2>
            <h4 className="text text_h4 text_h4_light">
              {language === 'en'
                ? 'This is the opportunity to get a cryptocurrency exchange without commission for any amount.\nA free exchange is provided randomly.\nThe chance of receiving it depends on your own exchanges, as well as the activity of your referrals (the chance from referral exchanges is slightly lower).\n\nThere are two ways to get free exchanges:\n1. Regularly exchange cryptocurrency through our service\n2. Leave a review about our service on one of the forums\n\nThus, users can significantly save by making cryptocurrency exchanges without additional fees.'
                : 'Это возможность получить обмен криптовалют без комиссии на любую сумму.\nБесплатный обмен предоставляется случайным образом.\nВероятность получить его зависит от ваших собственных обменов, а также от активности ваших рефералов (шанс с обменов рефералов чуть ниже).\n\nСуществует два способа получить бесплатные обмены:\n1. Регулярно обменивать криптовалюту через наш сервис\n2. Оставить отзыв о нашем сервисе на одном из форумов\n\nТаким образом, пользователи могут существенно экономить, совершая обмены криптовалют без дополнительных комиссий.'}
            </h4>
          </div>
        </section>
      </main>
    </div>
  )
}
