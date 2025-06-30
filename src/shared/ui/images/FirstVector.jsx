import { ThemedImage } from './ThemedImage'

export const FirstVector = () => {
  return (
    <ThemedImage
      src="/first_vector.png"
      alt=""
      id="firstVector"
      filterLight="brightness(0) saturate(100%) invert(28%) sepia(99%) saturate(1414%) hue-rotate(243deg) brightness(100%) contrast(80%)"
    />
  )
}
