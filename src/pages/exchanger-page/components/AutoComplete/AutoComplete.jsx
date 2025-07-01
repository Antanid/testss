import React, { useState, useEffect, useRef } from 'react'
import styles from './AutoComplete.module.scss'
import { MagnifyingGlass, X } from 'phosphor-react'

const AutocompleteSelect = ({
  children,
  options = [],
  onOptionClick = () => {},
  placeholder,
  headerTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearch('') // очистка поиска при закрытии
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTriggerClick = e => {
    e.stopPropagation()
    setIsOpen(open => !open)
    if (!isOpen) setSearch('') // очистка при открытии, если хочешь
  }

  // Фильтруем опции по поиску (независимо от регистра)
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className={styles.dropdownWrapper} ref={containerRef}>
      <div onClick={handleTriggerClick} style={{ width: '100%' }}>
        {children}
      </div>

      <div className={`${styles.dropdownMenu} ${isOpen ? styles.dropdownMenuOpen : ''}`}>
        <div className={styles.dropdown_header}>
          <div className={styles.dropdown_header_content}>
            <p
              className="text"
              style={{
                fontWeight: 700,
                color: 'white',
                fontSize: '20px',
              }}
            >
              {headerTitle}
            </p>
            <X
              size={24}
              style={{
                cursor: 'pointer',
              }}
              color="#fff"
              onClick={() => setIsOpen(false)}
            />
          </div>
        </div>

        <div className={styles.searchWrapper}>
          <div className={styles.searchWrapperContent}>
            <MagnifyingGlass size={24} />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={placeholder}
              className={styles.searchInput}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>

        <ul>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onOptionClick(option)
                  setIsOpen(false)
                  setSearch('')
                }}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onOptionClick(option)
                    setIsOpen(false)
                    setSearch('')
                  }
                }}
              >
                {option}
              </li>
            ))
          ) : (
            <li className={styles.noResults}>No results found</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default AutocompleteSelect
