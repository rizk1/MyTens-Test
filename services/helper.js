export const DateFormat = (date) => {
    if (!date) return
    let Dates = new Date(date)
    let newDates = Dates.toLocaleString('default', { month: 'short' }) + ', ' + Dates.getDate() + ' ' + Dates.getFullYear()
    return newDates
}