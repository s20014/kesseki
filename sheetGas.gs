function writesheet(data) {
  const ss = SpreadsheetApp.openById("16laDl3T6GNt4OcZWqgYFMKkKrDmQ7nT94yoAUzbWfn4").getSheetByName('attendance')
  const toDay = getDate()
  const inf = app.getStudentInformation()
  const student = [inf[1], inf[3], inf[5]]
  const list = toDay.concat(student).concat(data)
  
  ss.appendRow(list)
}

function getDate() {
  const date = new Date(); //現在日時を取得
  const reDate = Utilities.formatDate(date, "Asia/Tokyo", "YYYY-MM-dd,HH:mm")
  console.log(reDate.split(","));
  return reDate.split(",")
}

function getRestReasonList() {
  const ss = SpreadsheetApp.openById("16laDl3T6GNt4OcZWqgYFMKkKrDmQ7nT94yoAUzbWfn4").getSheetByName("reasonRest")
  const data = ss.getDataRange().getValues()
  const dd = data.map(n => n.filter(Boolean))
  return dd
}
