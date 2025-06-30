import React, { useState, useEffect, useRef } from 'react';
import { navChapters } from '@/widgets/header/navData';
import { useLanguage } from '@/shared/lang';
import * as Icons from '@/shared/ui/icons';
import * as Images from '@/shared/ui/images';
import { useNavigate } from 'react-router-dom'; 
import styles from './ui/DropDownMenu.module.scss';
import {BtnExchange, BtnLogin, BtnLang, BtnChangeTheme, BtnExit, BtnProfileMobile} from '@/features/Buttons'

const DropDownMenu = ({ buttonRef, activeClass, onLoginClick, isAuthorized, handleLogoutClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const resizeHandlerRef = useRef(null);
  const navigate = useNavigate();

  // ===========================================================
  // Toggle Lang
  const { language } = useLanguage();

  // ===========================================================
  // Open / Close 
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideMenu = menuRef.current?.contains(event.target);
      const isClickOnButton = buttonRef.current?.contains(event.target);

      if (!isClickInsideMenu && !isClickOnButton) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonRef]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handler = (e) => {
      e.stopPropagation();
      toggleMenu();
    };

    button.addEventListener('click', handler);
    return () => {
      button.removeEventListener('click', handler);
    };
  }, [buttonRef]);

  useEffect(() => {
    const button = buttonRef.current;
    const headerElement = document.querySelector('header');
    if (!button) return;

    if (isOpen) {
      button.classList.add(activeClass);
      headerElement.classList.add('open')
    } else {
      button.classList.remove(activeClass);
      headerElement.classList.remove('open')
    }

    return () => {
      button.classList.remove(activeClass);
      headerElement.classList.remove('open')
    };
  }, [isOpen, activeClass]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1500) {
        setIsOpen(false);
      }
    };

    resizeHandlerRef.current = handleResize;

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ===========================================================

  return (
    <div className={styles.dropdownWrapper} id="dropDownWrapper">
      <div
        ref={menuRef}
        className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : ''}`}
      >
        <Images.BgStars/>
        <ul>
            {navChapters.map((item, index) => {
                const nav_text = language === 'en' ? item.txt_en : item.txt_ru;

                return (
                  <li
                  key={index}
                  onClick={() => {
                    if (index === 0) {
                      navigate('/');
                    } else {
                      const element = document.getElementById(item.path.replace('#', ''));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                    setIsOpen(false);
                  }}
                  role="button"
                  tabIndex="0"
                  className={styles.menuItem}
                >
                  <Icons.Y2kStarIcon />
                  <span>{nav_text}</span>
                </li>
                );
            })}
            <li>
                <div>
                    <div>
                        <BtnLang />
                        <BtnChangeTheme className={styles.theme_icon} />
                    </div>

                    { isAuthorized ? (
                      <div>
                        <BtnExit onClick={() => { handleLogoutClick(); setIsOpen(false); }} />
                        <BtnProfileMobile onClick={() => setIsOpen(false)}  />
                        
                      </div>
                    ) : (
                      <div>
                        <BtnLogin onClick={() => { onLoginClick(); setIsOpen(false); }} />
                      </div>
                    )}

                    <div>
                        <BtnExchange onClick={() => { navigate('/exchange'); setIsOpen(false) }} />
                    </div>
                </div>
            </li>
            <li>
                <div>

                </div>
            </li>
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;