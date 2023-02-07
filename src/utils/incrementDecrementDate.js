export const incrementDecrementDate = (date, action) => {
  if (action === 'increment') {
    return new Date(date.getTime() + (24 * 60 * 60 * 1000));
  }
  if (action === 'decrement') {
    return new Date(date.getTime() - (24 * 60 * 60 * 1000));
  }
}
