import React, { useState, useEffect, useRef } from 'react'
import styles from './AutoComplete.module.scss'
import { MagnifyingGlass, X, Check } from 'phosphor-react'
import { useLanguage } from '@/shared/lang/index.jsx'

const AutocompleteSelect = ({
  children,
  options = [],
  onOptionClick = () => {},
  placeholder,
  headerTitle,
  value = null,
}) => {
  const { language } = useLanguage()

  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTriggerClick = e => {
    e.stopPropagation()
    setIsOpen(open => !open)
    if (!isOpen) setSearch('')
  }

  const filteredOptions = options.filter(option =>
    option.title.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className={styles.autoSelect__wrapper} ref={containerRef}>
      <div onClick={handleTriggerClick} style={{ width: '100%' }}>
        {children}
      </div>

      <div className={`${styles.autoSelect__menu} ${isOpen ? styles.autoSelect__menuOpen : ''}`}>
        <div className={styles.autoSelect__header}>
          <div className={styles.autoSelect__headerContent}>
            <p className="text" style={{ fontWeight: 700, color: 'white', fontSize: '20px' }}>
              {headerTitle}
            </p>
            <X
              size={24}
              style={{ cursor: 'pointer' }}
              color="#fff"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div className={styles.autoSelect__searchWrapper}>
          <div className={styles.autoSelect__searchContent}>
            <MagnifyingGlass size={24} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={placeholder}
              className={styles.autoSelect__input}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>

        <ul className={styles.autoSelect__list}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map(option => {
              const isSelected = value?.id === option.id

              return (
                <li
                  key={option.id}
                  className={styles.autoSelect__item}
                  onClick={() => {
                    onOptionClick(option)
                    setIsOpen(false)
                    setSearch('')
                  }}
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOptionClick(option)
                      setIsOpen(false)
                      setSearch('')
                    }
                  }}
                >
                  {option.title}

                  {isSelected && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '100%',
                        padding: '4px',
                        background: '#8947FF',
                      }}
                    >
                      <Check size={16} color="#fff" />
                    </div>
                  )}
                </li>
              )
            })
          ) : (
            <li className={styles.autoSelect__noResults}>
              {language === 'en' ? 'No results found' : 'Совпадений не найдено'}
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AutocompleteSelect
