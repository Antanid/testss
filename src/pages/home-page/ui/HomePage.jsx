import styles from './HomePage.module.scss'
import { useEffect, useState } from 'react'

import * as Images from '@/shared/ui/images'
import * as Icons from '@/shared/ui/icons'
import { useLanguage } from '@/shared/lang'

import { ParticlesBlock } from '../components/ParticlesBlock'
import { WelcomeBlock } from '../components/WelcomeBlock'
import { FeaturesBlock } from '../components/FeaturesBlock'
import { StatsBlock } from '../components/StatsBlock'
import { WhyWeBlock } from '../components/WhyWeBlock'
import { PartnerBlock } from '../components/PartnerBlock'
import { BonusesBlock } from '../components/BonusesBlock'

export const HomePage = () => {
  const { language } = useLanguage()
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <ParticlesBlock Images={Images} />
      <main>
        <WelcomeBlock language={language} Icons={Icons} />
        <FeaturesBlock language={language} Icons={Icons} Images={Images} />
        <StatsBlock language={language} Icons={Icons} Images={Images} />
        <WhyWeBlock language={language} Icons={Icons} Images={Images} />
        <PartnerBlock language={language} Icons={Icons} Images={Images} />
        <BonusesBlock language={language} Icons={Icons} Images={Images} />
      </main>

      {/* Кнопка прокрутки вверх */}
      <button
        className={`${styles.scrollTopButton} ${showScrollTop ? styles.visible : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <Icons.ArrowRightIcon /> {/* или любая другая иконка вверх */}
      </button>
    </div>
  )
}
