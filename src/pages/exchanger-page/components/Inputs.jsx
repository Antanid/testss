// ==========================================================
const InputSendCoins = ({coinsSend, setCoinsSend}) => {
  return (
    <input className='text text_h2 sendInput' placeholder='0' type="text" value={coinsSend} onChange={(e) => setCoinsSend(e.target.value)} />
  );
};

export { InputSendCoins };