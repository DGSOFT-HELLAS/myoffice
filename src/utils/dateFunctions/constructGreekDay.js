const days = ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ',]
const months = ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαϊ", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"];


export const constructGreekDate = (date) => {

  const d = new Date(date);
  const day = d.getDay()
  const month = d.getMonth()
  const year = d.getFullYear()
  let greekDay = days[day]
  // console.log(`${greekDay} ${d.getDate()} ${months[month]} ${year} `)
  return `${greekDay} ${d.getDate()} ${months[month]} ${year} `

}