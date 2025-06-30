import { useTheme } from '@/shared/theme';

export const ThemedImage = ({
  src,
  srcDark,
  srcLight,
  alt,
  id,
  className,
  filter,
  filterDark,
  filterLight,
  disableThemeSwitch = false,
}) => {
  const { theme } = useTheme();

  const imageSrc = disableThemeSwitch
    ? src
    : theme === 'dark'
      ? srcDark || src
      : srcLight || src;

  let appliedFilter;

  if (disableThemeSwitch) {
    appliedFilter = filter || 'none';
  } else if (filter) {
    appliedFilter = filter;
  } else if (theme === 'dark' && filterDark) {
    appliedFilter = filterDark;
  } else if (theme === 'light' && filterLight) {
    appliedFilter = filterLight;
  } else {
    appliedFilter =
      theme === 'dark'
        ? 'brightness(100%)'
        : 'invert(1) brightness(0.8) contrast(2)';
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      id={id}
      className={className}
      style={{
        filter: appliedFilter,
      }}
    />
  );
};