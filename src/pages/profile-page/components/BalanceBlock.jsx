import { useState} from 'react';
import { TransactionsTable } from '../components/TransactionsTable';
import PaymentModal from '@/features/PaymentModal/PaymentModal';
import { useNavigate } from 'react-router-dom';

export const BalanceBlock = ({ language }) => {
  const navigate = useNavigate();

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentOperationType, setPaymentOperationType] = useState('deposit'); 

  const balanceData = {
    balance: 1448,
    free_exchanges: 12,
    transacrions_amount: 73455,
  }

  return (
    <>
      <PaymentModal isOpen={paymentOpen} onClose={() => setPaymentOpen(false)} operation={paymentOperationType} language={language} />
      <div className="balance">
        <div className="balance__container__left">
          <div className="balance__inner__top">
            <h3 className="text text_h3">
              {language === 'en' ?
                'Account balance management' :
                'Управление балансом аккаунта'}
            </h3>

            <div className="balance__item__container container_default">
              <div className="balance__item container_default container_accent">
                <h1 className="text text_h1">
                  {(() => {
                    const balance = Number(balanceData['balance']);
                    const isInteger = Number.isInteger(balance);
                    const formatted = balance.toLocaleString('en-US', {
                      minimumFractionDigits: isInteger ? 0 : 2,
                      maximumFractionDigits: isInteger ? 0 : 2,
                    });
                    return `${formatted} $`;
                  })()}
                </h1>
                <h4 className="text text_h4 text_h4_light">
                  {language === 'en' ?
                    'Funds on the balance sheet' :
                    'Средства на балансе'}
                </h4>
                <div className="balance__item__image__container">
                  <svg viewBox="0 0 33 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className="image" d="M1 11.2857V19.5146C1 21.4348 1 22.3944 1.37542 23.1278C1.70565 23.7729 2.2322 24.298 2.88032 24.6267C3.6164 25 4.58049 25 6.50579 25H26.4942C28.4195 25 29.3822 25 30.1183 24.6267C30.7664 24.298 31.2947 23.7729 31.6249 23.1278C32 22.3951 32 21.4368 32 19.5204V11.2857M1 11.2857V7.85714M1 11.2857H32M1 7.85714V6.48605C1 4.56587 1 3.60506 1.37542 2.87165C1.70565 2.22652 2.2322 1.7024 2.88032 1.37369C3.61712 1 4.58238 1 6.51145 1H26.4892C28.4183 1 29.3815 1 30.1183 1.37369C30.7664 1.7024 31.2947 2.22652 31.6249 2.87165C32 3.60435 32 4.56399 32 6.48042V7.85714M1 7.85714H32M7.88889 18.1429H14.7778M32 11.2857V7.85714"
                    stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
              </div>

              <div className="balance__item__operations">
                <button className="button button_submit"
                  onClick={(op) => {
                    setPaymentOperationType('deposit');
                    setPaymentOpen(true);
                  }}
                >
                  <h4 className="text text_h4">
                    {language === 'en' ?
                      'Depositing funds' :
                      'Ввод средств'}
                  </h4>
                </button>

                <button className="button button_submit"
                  onClick={(op) => {
                    setPaymentOperationType('withdraw');
                    setPaymentOpen(true);
                  }}
                >
                  <h4 className="text text_h4">
                    {language === 'en' ?
                      'Withdraw funds' :
                      'Вывести средства'}
                  </h4>
                </button>
              </div>
            </div>
          </div>
            
          <div className="balance__inner__bottom">
            <div className="container_default balance__free-exchange">
              <h1 className="text text_h1">
                {balanceData['free_exchanges']}
              </h1>

              <h4 className="text text_h4 text_h4_light">
                {language === 'en' ?
                  'Number of remaining free exchanges' :
                  'Количество оставшихся бесплатных обменов'}
              </h4>

              <div className="balance__free-exchange__image__container">
                <svg viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.2358 22.9444H25.3245V31M10.7649 10.0556H2.67616V2M26 11.6722C25.093 9.43634 23.5743 7.49878 21.6167 6.0797C19.659 4.66061 17.3412 3.81656 14.9261 3.64415C12.511 3.47174 10.0952 3.97748 7.95435 5.10399C5.81349 6.23049 4.03316 7.93298 2.81519 10.0171M2 21.3286C2.90704 23.5644 4.42569 25.502 6.38333 26.9211C8.34098 28.3402 10.6611 29.1831 13.0763 29.3555C15.4914 29.5279 17.9052 29.0223 20.046 27.8958C22.1869 26.7693 23.966 25.0671 25.184 22.983"
                    strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            <div className="container_default container__free-exchange__hint">
              <h4 className="text text_h4">
                {language === 'en' ?
                  'How to earn free exchanges?' :
                  'Как заработать бесплатные обмены?'}
              </h4>
              

              <h4 className="text text_h4">
                {language === 'en' ? (
                  'Want to get free exchanges? We are already preparing interesting solutions for you — from referral programs to bonuses for activity! Keep using our service, participate in promotions, and stay tuned for updates. Very soon you will be able to earn exchanges without spending extra!'
                ) : (
                  'Мы уже готовим для вас интересные решения — от реферальных программ до бонусов за активность! Продолжайте пользоваться нашим сервисом, участвуйте в акциях и следите за обновлениями. Очень скоро вы сможете зарабатывать обмены, не тратя лишнего!'
                )}
              </h4>
            </div>
          </div>
        </div>

        <div className="balance__container__right transactions">
          <div className="transactions__amount container_default">
            <div className="transactions__amount__counter">
              <h1 className="text text_h1">
                {(() => {
                    const balance = Number(balanceData['transacrions_amount']);
                    const isInteger = Number.isInteger(balance);
                    const formatted = balance.toLocaleString('en-US', {
                      minimumFractionDigits: isInteger ? 0 : 2,
                      maximumFractionDigits: isInteger ? 0 : 2,
                    });
                    return `${formatted} $`;
                  })()}
              </h1>
              <h4 className="text text_h4">
                {language === 'en' ?
                  'Total exchanges made for the amount of' :
                  'Всего произведено обменнов на сумму'}
              </h4>
            </div>

            <button className="button button_submit" onClick={() =>  { navigate('/exchange') }}>
              <h4 className="text text_h4">
              {language === 'en' ?
                  'Go to the exchanger' :
                  'Перейти к обменнику'}
              </h4>
            </button>
          </div>

          <div className="transactions__history">
          <TransactionsTable language={language} />
          </div>
        </div>
      </div>
    </>
  );
}