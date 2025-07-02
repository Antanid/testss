import React, { useState, useMemo, useEffect, useRef } from 'react'
import { Check, MagnifyingGlass, X } from 'phosphor-react'
import styles from './Modal.module.scss'
import { DialogCommon } from '@/pages/exchanger-page/components/Dialog/Dialog.jsx'

const AutoCompleteWithIcon = ({
  options = [],
  onOptionClick,
  headerTitle = 'Select',
  placeholder = '',
  value = null,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return options

    return options.filter(option => {
      return (
        option.title.toLowerCase().includes(s) ||
        option.chain.toLowerCase().includes(s) ||
        option.id.toLowerCase().includes(s)
      )
    })
  }, [search, options])

  useEffect(() => {
    if (!isOpen) setSearch('')
  }, [isOpen])

  const handleSelect = option => {
    onOptionClick(option)
    setIsOpen(false)
    setSearch('')
  }

  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <DialogCommon
        isOpen={isOpen}
        onChange={setIsOpen}
        trigger={<div style={{ cursor: 'pointer' }}>{children}</div>}
        contentClassNames={styles.modal_content}
        disablePadding={true}
        size="md"
        position={window.innerWidth >= 768 ? 'center' : 'bottom'}
      >
        <div className={styles.autoSelect__menu}>
          <div className={styles.autoSelect__header}>
            <div className={styles.autoSelect__headerContent}>
              <p className="text" style={{ fontWeight: 700, color: 'white', fontSize: 20 }}>
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
            <div
              className={styles.autoSelect__searchContent}
              style={{
                marginTop: 8,
                marginBottom: 8,
              }}
            >
              <MagnifyingGlass size={24} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={placeholder}
                className={styles.autoSelect__input}
                onClick={e => e.stopPropagation()}
                ref={inputRef}
                autoFocus={false}
                style={{
                  fontSize: 16,
                }}
              />
            </div>
          </div>

          <ul className={styles.autoSelect__list}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => {
                const isSelected = value?.id?.toLowerCase() === option.id.toLowerCase()

                return (
                  <div
                    key={option.id}
                    className={styles.autoSelect__item}
                    onClick={() => handleSelect(option)}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSelect(option)
                      }
                    }}
                  >
                    <div
                      className="exchanger__coin__select-container"
                      style={{
                        width: '100%',
                      }}
                    >
                      <div className="exchanger__coin__icon-container">{option.icon}</div>
                      <div className="exchanger__coin__info">
                        <h2
                          className="text text_h2 text_select-coin"
                          style={{
                            fontSize: 25,
                          }}
                        >
                          {option.title}
                        </h2>
                        <h5
                          className="text text_h5"
                          style={{
                            fontSize: 14,
                          }}
                        >
                          {option.chain}
                        </h5>
                      </div>
                      {isSelected && (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '100%',
                            padding: '4px',
                            background: '#8947FF',
                            marginLeft: 'auto',
                          }}
                          className={styles.check}
                        >
                          <Check size={16} color="#fff" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <li className={styles.autoSelect__noResults}>Совпадений не найдено</li>
            )}
          </ul>
        </div>
      </DialogCommon>
    </>
  )
}

export default AutoCompleteWithIcon
