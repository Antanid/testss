import { useLanguage } from '@/shared/lang'
import * as Images from '@/shared/ui/images'
import styles from './Footer.module.scss'
import { useNavigate } from 'react-router-dom'

export const Footer = () => {
  const navigate = useNavigate()

  const { language } = useLanguage()

  const footerChapters = [
    {
      title: {
        ru: 'Персонально',
        en: 'Personal',
      },
      items: [
        {
          ru: 'Обменник',
          en: 'Exchange',
        },
        {
          ru: 'Купить',
          en: 'Buy',
        },
        {
          ru: 'Продать',
          en: 'Sell',
        },
      ],
    },
    {
      title: {
        ru: 'Компания',
        en: 'Company',
      },
      items: [
        {
          ru: 'Обменник',
          en: 'Exchange',
        },
        {
          ru: 'Купить',
          en: 'Buy',
        },
        {
          ru: 'Продать',
          en: 'Sell',
        },
      ],
    },
    {
      title: {
        ru: 'Поддержка',
        en: 'Support',
      },
      items: [
        {
          ru: 'Обменник',
          en: 'Exchange',
        },
        {
          ru: 'Купить',
          en: 'Buy',
        },
        {
          ru: 'Продать',
          en: 'Sell',
        },
      ],
    },
    {
      title: {
        ru: 'Для партнеров',
        en: 'For partners',
      },
      items: [
        {
          ru: 'Обменник',
          en: 'Exchange',
        },
        {
          ru: 'Купить',
          en: 'Buy',
        },
        {
          ru: 'Продать',
          en: 'Sell',
        },
      ],
    },
    {
      title: {
        ru: 'Права',
        en: 'Rules',
      },
      items: [
        {
          ru: 'Обменник',
          en: 'Exchange',
        },
        {
          ru: 'Купить',
          en: 'Buy',
        },
        {
          ru: 'Продать',
          en: 'Sell',
        },
      ],
    },
  ]

  const footerMessangers = [
    {
      title: 'instagram',
      url: '#',
      icon: '/contacts/instagram.svg',
    },
    {
      title: 'discord',
      url: '#',
      icon: '/contacts/discord.svg',
    },
    {
      title: 'telegram',
      url: 'https://t.me/woza_exchange_news',
      icon: '/contacts/telegram.svg',
    },
    {
      title: 'x',
      url: '#',
      icon: '/contacts/x.svg',
    },
  ]

  return (
    <footer>
      <div className={styles.footer_bg_logo}>
        <img src="/bg_woza.png" />
      </div>
      <div className={styles.footer_bg_pattern}>
        <Images.BgStars />
      </div>

      <div className={styles.footer_container}>
        <div className={styles.footer_container_top}>
          <div className={styles.footer_container_top_left}>
            <div className={styles.footer_container_top_logo}>
              <img src="/logo_full.png" alt="WOZA" />
            </div>

            <div className={styles.footer_container_top_chapters}>
              {footerChapters.map((item, index) => (
                <a
                  className={styles.footer_container_top_chapters_item}
                  key={index}
                  onClick={() => {
                    navigate('/exchange')
                  }}
                >
                  <h4>{item.title[language] || item.title.ru}</h4>
                  <div>
                    {item.items.map((subItem, subIndex) => (
                      <div key={subIndex} className={styles.footer_container_top_chapters_subitem}>
                        {subItem[language] || subItem.ru}
                      </div>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className={styles.footer_container_top_right}>
            {footerMessangers.map((item, index) => {
              return (
                <a
                  href={item.url}
                  key={index}
                  className={styles.footer_container_top_messanger}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.icon} alt={item.title} />
                </a>
              )
            })}
          </div>
        </div>

        <div className={styles.footer_container_bottom}>
          <h4>© WOZA 2015—2025</h4>
        </div>
      </div>
    </footer>
  )
}
