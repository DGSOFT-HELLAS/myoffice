export const splitDate = (date) => {
  return date.toISOString().split('T')[0]
}
