import * as Dialog from '@radix-ui/react-dialog'
import styles from './Dialog.module.scss'
import { useEffect } from 'react'

export const DialogCommon = ({
  children,
  isOpen,
  onChange,
  trigger,
  contentClassNames,
  size = 'md',
  position = 'center',
}) => {
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
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlayDimmed} />

        <Dialog.Content
          onOpenAutoFocus={event => event.preventDefault()}
          className={[
            styles.content,
            styles[size],
            styles[position], // добавляем класс позиции
            contentClassNames || '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
