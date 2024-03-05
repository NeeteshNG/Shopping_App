export const capitalizeWords = str => {
  const words = str.split(' ')

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return capitalizedWords.join(' ')
}

export const preprocessPhoneNumber = (value) => {
  if (!value) return '';
  return value.replace(/\s+/g, '').replace('+', '');
};