import { useEffect, useRef, useState } from 'react';
import * as Icons from '@/shared/ui/icons';
import * as Images from '@/shared/ui/images';
import { useLanguage } from '@/shared/lang';
import DropDownMenu from '@/features/dropdown_menu';
import { navChapters } from '../navData';
import styles from './Header.module.scss';
import {BtnExchange, BtnLogin, BtnLang, BtnChangeTheme, BtnProfile, BtnExit} from '@/features/Buttons'
import Auth from '@/features/AuthModal/Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';
import { toast } from 'react-toastify';

export const Header = ({ isAuthorized }) => {

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // ===========================================================
  // Toggle Lang
  const { language } = useLanguage();
  // ===========================================================
  // Scroll effects
  const headerRef = useRef(null);
  const tickingRef = useRef(false);
  const isAtTopRef = useRef(true);
  const isHoveredRef = useRef(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const isLongScrollRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const stopScroll = useRef(200);
  const { logout } = useAuth();

  useEffect(() => {
    const header = headerRef.current;
  
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const header = headerRef.current;
    
          const scrollDifference = Math.abs(currentScroll - lastScrollYRef.current);
    
          lastScrollYRef.current = currentScroll;

          if (currentScroll > 200) {
            if (currentScroll >= stopScroll.current + 500) {
              // Скролл вниз больше чем на 300
              header.classList.add('scrolled');
            } else if (currentScroll <= stopScroll.current - 500) {
              // Скролл вверх больше чем на 300
              header.classList.add('scrolled');
            }
          } else {
            if (currentScroll > 200) {
              //console.log(currentScroll)
              
              header.classList.add('scrolled');
            } else {
              header.classList.remove('scrolled');
            }
          }
          
    
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
  
    const onMouseEnter = () => {
      isHoveredRef.current = true;
      header.classList.remove('scrolled');
      stopScroll.current = lastScrollYRef.current
    };
  
    const onMouseLeave = () => {
      isHoveredRef.current = false;
      const header = headerRef.current;

      const currentScrollScrolled = lastScrollYRef.current
      if (lastScrollYRef > 200) {
        
        //header.classList.add('scrolled');
      }
    };
  
    window.addEventListener('scroll', onScroll);
    header.addEventListener('mouseenter', onMouseEnter);
    header.addEventListener('mouseleave', onMouseLeave);
  
    return () => {
      window.removeEventListener('scroll', onScroll);
      header.removeEventListener('mouseenter', onMouseEnter);
      header.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

// Profile menu close
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isProfileMenuOpen &&
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileMenuOpen(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth < 1500 && isProfileMenuOpen) {
      setIsProfileMenuOpen(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  window.addEventListener('resize', handleResize);

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
    window.removeEventListener('resize', handleResize);
  };
}, [isProfileMenuOpen]);
  
  const handleLogoutClick = () => {
    console.log('handleLogoutClick triggered'); 
    logout();
    toast(language === 'en' ? 'You have logged out of your account!' : 'Вы вышли из аккаунта!', {
      position: "top-center",
      autoClose: 3000,
      theme: 'dark',
    });
  };

  // ===========================================================
  // Dropdown menu
  const menuButtonRef = useRef(null);
  // ===========================================================

  const navigate = useNavigate();

  return (
    <>
    <header ref={headerRef}>
      <div className={styles.container} id='headerContainer'>
        <div>
          <div className={styles.logo} id='logoCont' onClick={() => navigate('/exchange')}>
            <Images.WozaLogo id='logoFont'/>
            <Images.WozaLogoCoin id='logoCoin' />
          </div>
          
          <nav>
            {navChapters.map((item, index) => {
                const nav_text = language === 'en' ? item.txt_en : item.txt_ru;

                return (
                  <a key={index} href={item.path}>
                    <Icons.Y2kStarIcon />
                    <span>{nav_text}</span>
            
                  </a>
                );
              })}
          </nav>
        </div>
          
        <div>
          <BtnExchange className={styles.header_button_exchange} onClick={() => { navigate('/exchange') }} />
          <BtnLang className={styles.header_button_lang} />
          {isAuthorized ? (
            <>
              <BtnProfile
                className={styles.profile_button}
                isOpen={isProfileMenuOpen}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isProfileMenuOpen) {
                    setIsProfileMenuOpen(false);
                  } else {
                    setIsProfileMenuOpen(true);
                  }
                }}
              />

              {isProfileMenuOpen && (
                <div ref={profileDropdownRef} className={styles.profile_dropdown}>
                  <button className={styles.profile_dropdown_button} onClick={() =>  { navigate('/profile') }}>{language === 'en' ? 'Account' : 'Личный кабинет'}</button>
                  <BtnExit className={styles.profile_dropdown_button} onClick={handleLogoutClick} />
                </div>
              )}
            </>
          ) : (
            <BtnLogin className={styles.header_button_login} onClick={() => setIsAuthOpen(true)} />
          )}
          <BtnChangeTheme className={styles.theme_icon} />
            
          <div ref={menuButtonRef} className={styles.menu_btn}>
            <span className={styles.menu_btn_top}></span>
            <span className={styles.menu_btn_middle}></span>
            <span className={styles.menu_btn_bottom}></span>
          </div>
        </div>
      </div>
      <DropDownMenu
        buttonRef={menuButtonRef}
        activeClass={styles.active}
        onLoginClick={() => setIsAuthOpen(true)} 
        handleLogoutClick={handleLogoutClick}
        isAuthorized={isAuthorized}
      />
    </header>
    <Auth isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};