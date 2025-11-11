export const getImageSrc = (imgscr: string | null) => {
  if (imgscr) {
    return { uri: imgscr };
  } else {
    return require('../assets/images/user.png');
  }
};
