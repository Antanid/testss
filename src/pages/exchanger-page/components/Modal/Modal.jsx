import React, { useState, useMemo } from 'react'
import { Modal, ModalContent, ModalBody } from '@heroui/modal'
import styles from './Modal.module.scss'
import { Check, MagnifyingGlass, X } from 'phosphor-react'

const SlideModal = ({
  isOpen,
  onOpenChange,
  options = [],
  onSelect,
  title = 'Select a coin',
  placeholder = '',
  position = 'bottom',
}) => {
  const isBottom = position === 'bottom'
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const filteredOptions = useMemo(() => {
    const s = search.trim().toLowerCase()
    return options.filter(option => option.title.toLowerCase().includes(s))
  }, [search])

  const handleSelect = id => {
    setSelectedId(id)
    onSelect(id)
    setSearch('')
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
      <ModalContent
        style={{
          borderTopLeftRadius: isBottom ? '16px' : 0,
          borderTopRightRadius: isBottom ? '16px' : 0,
          borderBottomLeftRadius: !isBottom ? '16px' : 0,
          borderBottomRightRadius: !isBottom ? '16px' : 0,
          position: 'fixed',
          width: '100%',
          height: '60vh',
          overflowY: 'auto',
          zIndex: 10,
          margin: 0,
          ...(isBottom
            ? {
                bottom: 0,
                top: 'auto',
                animation: isOpen ? 'slideUp 300ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }
            : {
                top: 0,
                bottom: 'auto',
                animation: isOpen ? 'slideDown 300ms cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }),
        }}
        className={styles.modal_content}
      >
        <ModalBody>
          <div
            className={styles.autoSelect__menu}
            style={{
              pointerEvents: 'all',
            }}
          >
            <div className={styles.autoSelect__header}>
              <div className={styles.autoSelect__headerContent}>
                <p className="text" style={{ fontWeight: 700, color: 'white', fontSize: '16px' }}>
                  {title}
                </p>
                <X
                  size={24}
                  color="#fff"
                  style={{ cursor: 'pointer', position: 'relative' }}
                  onClick={() => onOpenChange(false)}
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
                />
              </div>
            </div>

            <ul className={styles.autoSelect__list}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map(option => {
                  const isSelected = selectedId === option.id
                  return (
                    <li
                      key={option.id}
                      className={styles.autoSelect__item}
                      onClick={() => handleSelect(option.id)}
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setSelectedId(option.id)
                          onOpenChange(false)
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

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </Modal>
  )
}

export default SlideModal
