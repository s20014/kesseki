const CALENDER_SPREAD = SpreadsheetApp.openById("1jIw2gQFMagk6A6sQKjELrB1MNhxWFSYiC2vW7lz1Vv8").getSheetByName("schedule")
const ATTENDANCE_SPREAD = SpreadsheetApp.openById("16laDl3T6GNt4OcZWqgYFMKkKrDmQ7nT94yoAUzbWfn4").getSheetByName("attendance")

function getCalenderEvent() {
  const today = new Date(2022, 10, 15)
  const calender = CalendarApp.getEventsForDay(today)
  const list = getCalenderId()
  const techer = []
  const originCalenders = calender.filter(n => list.includes(n.getOriginalCalendarId()))
  const calenderList = originCalenders.map(n => {
    return [n.getTitle(), n.getStartTime(), n.getGuestList().map(a => a.getEmail())]
  })
  calenderList.forEach(n => techer.push(n))
  return techer

}

function getCalenderId() {
  const row = CALENDER_SPREAD.getLastRow()
  const ids = CALENDER_SPREAD.getRange(1, 26 + 10 , row, 1).getValues().slice(2)
  const list = ids.map(n => n[0]).filter(Boolean)
  return list
}