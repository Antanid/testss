import { ThemedImage } from './ThemedImage'

export const BgStars = () => {
  return (
    <ThemedImage
      src="/bg_stars.svg"
      srcDark="/bg_stars_dark.svg"
      alt=""
      id="particle_stars"
      filterLight="brightness(0) saturate(100%) invert(0%) sepia(5%) saturate(5%) hue-rotate(304deg) brightness(100%) contrast(200%)"
      filterDark="brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(1%) hue-rotate(166deg) brightness(106%) contrast(102%)"
    />
  )
}
