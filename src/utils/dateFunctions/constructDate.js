export const constructDate = (date) => {

  const d = new Date(date);
  const year = d.getFullYear()
  const month = (d.getMonth() < 10 ? '0' : '') + (d.getMonth() + 1)
  const day = (d.getDate() < 10 ? '0' : '') + d.getDate()

  const hours = (d.getHours() < 10 ? '0' : '') + d.getHours();
  const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  // console.log(`${year}-${month}-${day} ${hours}:${minutes}`)
  return `${year}-${month}-${day}T${hours}:${minutes}:00`
}