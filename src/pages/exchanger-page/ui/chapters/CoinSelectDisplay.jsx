export const CoinSelectDisplay = ({ isSend, sendCurrency, getCurrency, coinsData, onClick }) => {
  const coin = isSend ? coinsData[sendCurrency] : coinsData[getCurrency]

  return (
    <div className="exchanger__coin__select-container" onClick={onClick}>
      <div className="exchanger__coin__icon-container">{coin?.icon || 'Coin'}</div>
      <div className="exchanger__coin__info">
        <h2 className="text text_h2 text_select-coin">
          {coin?.id}
          <svg
            className="icon__svg"
            viewBox="0 0 11 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2L9 9.5L2 17" strokeWidth="3" />
          </svg>
        </h2>
        <h5 className="text text_h5">{coin?.chain}</h5>
      </div>
    </div>
  )
}
