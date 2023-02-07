export const getTime = (date) => {

  const d = new Date(date);
  const hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
  const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  return `${hours}:${minutes}`
}