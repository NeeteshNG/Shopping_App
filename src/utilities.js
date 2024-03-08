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

export const validateChar = (text, index) => {
  const isNumber = typeof text === 'number'
  const isString = typeof text === 'string'
  return (isNumber || (isString && text !== '')) && !isNaN(Number(text))
}