import * as Dialog from '@radix-ui/react-dialog'
import styles from './Dialog.module.scss'

export const DialogCommon = ({
  children,
  isOpen,
  onChange,
  trigger,
  contentClassNames,
  size = 'md',
  position = 'center',
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlayDimmed} />

        <Dialog.Content
          onOpenAutoFocus={event => event.preventDefault()}
          className={[styles.content, styles[size], styles[position], contentClassNames || '']
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
