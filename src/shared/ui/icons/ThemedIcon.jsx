import { useTheme } from '@/shared/theme'

export const ThemedIcon = ({ children, className, viewBox, type = 'fill' }) => {
  const { theme } = useTheme()
  const fill = theme === 'dark' ? '#FFFFFF' : '#151515'

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      role="img"
      aria-hidden="true"
    >
      <g fill={type === 'fill' ? fill : 'none'} stroke={type === 'stroke' ? fill : 'none'}>
        {children}
      </g>
    </svg>
  )
}
