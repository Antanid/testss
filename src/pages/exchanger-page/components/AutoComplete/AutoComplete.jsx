import React, { useState, useMemo, useEffect } from 'react'
import { Modal, ModalContent, ModalBody } from '@heroui/modal'
import styles from './Modal.module.scss'
import { Check, MagnifyingGlass, X } from 'phosphor-react'

const AutocompleteSelect = ({
  options = [],
  onOptionClick,
  headerTitle = 'Select',
  placeholder = '',
  value = null, // выбранный option { id, title }
  children, // кастомный триггер для открытия модалки
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  // Фильтрация options по поиску
  const filteredOptions = useMemo(() => {
    const s = search.trim().toLowerCase()
    return options.filter(option => option.title.toLowerCase().includes(s))
  }, [search, options])

  // Закрываем поиск при смене value (выборе)
  useEffect(() => {
    if (!isOpen) setSearch('')
  }, [isOpen])

  // Выбор элемента
  const handleSelect = option => {
    onOptionClick(option)
    setIsOpen(false)
    setSearch('')
  }

  const inputRef = React.useRef(null)

  useEffect(() => {
    if (isOpen) {
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
      {/* Кастомный триггер открытия */}
      <div onClick={() => setIsOpen(true)} style={{ cursor: 'pointer' }}>
        {children}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        hideCloseButton
        shadow="none"
        isDismissable
        scrollBehavior="inside"
      >
        <ModalContent
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            maxWidth: '90vw',
            maxHeight: '80vh', // фиксируем максимальную высоту модалки
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            border: 'none',
            zIndex: 100,
            backgroundColor: 'var(--bg-color)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ModalBody
            className={styles.modal_content}
            style={{
              padding: 0, // если нужно убрать лишние отступы
              flexGrow: 1, // чтобы занять всю доступную высоту внутри ModalContent
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div className={styles.autoSelect__menu}>
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
                    ref={inputRef}
                    autoFocus={false}
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
                        onClick={() => handleSelect(option)}
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleSelect(option)
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
                              marginLeft: 'auto',
                            }}
                          >
                            <Check size={16} color="#fff" />
                          </div>
                        )}
                      </li>
                    )
                  })
                ) : (
                  <li className={styles.autoSelect__noResults}>Совпадений не найдено</li>
                )}
              </ul>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AutocompleteSelect
