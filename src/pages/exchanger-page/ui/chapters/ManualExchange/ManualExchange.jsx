import { useState } from 'react'
import {
  DirectionIds,
  ManualFirstStage,
} from '@/pages/exchanger-page/ui/chapters/ManualExchange/stage'
import { useLanguage } from '@/shared/lang/index.jsx'
import { useNavigate } from 'react-router-dom'
import { ManualLayout } from '@/pages/exchanger-page/ui/chapters/ManualExchange/stage/Layout.jsx'
import { CryptoToCash } from '@/pages/exchanger-page/ui/chapters/ManualExchange/secondStage/CryptoToCash/index.js'

export const ManualExchange = ({
  exchangeStages,
  sendCurrency,
  getCurrency,
  coinsSend,
  initialAmount,
  amountCommission,
  commissionRate,
  amountReceived,
}) => {
  const [selectedDirection, setSelectedDirection] = useState({
    id: DirectionIds.CRYPTO_TO_CASH,
    ru: 'Крипта > наличные',
    en: 'Crypto > Cash',
  })

  const generateTransactionId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 15; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const navigate = useNavigate()

  const { language } = useLanguage()

  const [activeStage, setActiveStage] = useState(1)

  const handlePrevStage = () => {
    if (activeStage === 1) {
      const transactionId = generateTransactionId()
      navigate(`/exchange/expect?transaction=${transactionId}`, {
        state: {
          sendCurrency,
          getCurrency,
          coinsSend,
          initialAmount,
          amountCommission,
          commissionRate,
          amountReceived,
        },
      })
    } else {
      setActiveStage(prev => prev - 1)
    }
  }

  const handleNextStage = () => {
    if (activeStage === 2) {
      const transactionId = generateTransactionId()
      navigate(`/exchange/expect?transaction=${transactionId}`, {
        state: {
          sendCurrency,
          getCurrency,
          coinsSend,
          initialAmount,
          amountCommission,
          commissionRate,
          amountReceived,
        },
      })
    } else {
      setActiveStage(prev => prev + 1)
    }
  }

  const nextStageButton = () => {
    return (
      <button className="button button_accent" onClick={handleNextStage}>
        {language === 'en' ? 'Next stage' : `Следующий этап`}
      </button>
    )
  }

  const renderStageTwoContent = () => {
    switch (selectedDirection.id) {
      case DirectionIds.CRYPTO_TO_CASH:
        return <CryptoToCash />
      case DirectionIds.CRYPTO_TO_CASHLESS:
        return <div>CRYPTO_TO_CASHLESS</div>
      case DirectionIds.CRYPTO_TO_QR:
        return <div>CRYPTO_TO_QR</div>
      case DirectionIds.CASH_TO_CRYPTO:
        return <div>CASH_TO_CRYPTO</div>
      case DirectionIds.CASH_TRANSFER_WORLDWIDE:
        return <div>CASH_TO_CRYPTO</div>
      case DirectionIds.INTERNATIONAL_PAYMENT:
        return <div>INTERNATIONAL_PAYMENT</div>
      case DirectionIds.CRYPTO_EXCHANGE_RISK:
        return <div>CRYPTO_EXCHANGE_RISK</div>
      case DirectionIds.LEGALIZATION:
        return <div>LEGALIZATION</div>
      case DirectionIds.OTHER:
        return <div>OTHER</div>
    }
  }

  return (
    <>
      {/* 1 ЭТАП */}
      {activeStage === 1 && (
        <ManualFirstStage
          activeStage={activeStage}
          exchangeStages={exchangeStages}
          nextStageButton={nextStageButton}
          setSelectedDirection={setSelectedDirection}
          selectedDirection={selectedDirection}
        />
      )}
      {/* 2 ЭТАП */}
      {activeStage === 2 && (
        <ManualLayout
          activeStage={activeStage}
          exchangeStages={exchangeStages}
          handlePrevStage={handlePrevStage}
          selectedDirection={selectedDirection}
        >
          {renderStageTwoContent()}
        </ManualLayout>
      )}
    </>
  )
}
