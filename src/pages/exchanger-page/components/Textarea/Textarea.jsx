import styles from './Textarea.module.scss'

export const Textarea = ({ value, onChange, placeholder }) => {
  return (
    <div className={styles.manual_exchange_root}>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
}
