const SS = SpreadsheetApp.openById("16laDl3T6GNt4OcZWqgYFMKkKrDmQ7nT94yoAUzbWfn4").getSheetByName('attendance')
const SSM = SpreadsheetApp.openById("16laDl3T6GNt4OcZWqgYFMKkKrDmQ7nT94yoAUzbWfn4").getSheetByName('attendanceSend')
let list
function writesheet(data, user = "student") { 
  const item = data
  const toDay = getDate()
  SSM.getRange(1,17).setValue(1)

  if(user == "admin" && item.length == 8) {
    const number = item.pop()
    inf = app.findStudent(number)
    const text = item.pop()
    const newText = (text[0] === "=") ? text.slice(1): text
    item.push(newText)
    const student = [inf[0], inf[1], inf[3], inf[5]]
    list = toDay.concat(student).concat(item)
    //checkTime()

  } else if(user == "student"&& item.length == 7 && checkData(data)) {
    inf = app.getStudentInformation()
    const text = item.pop()
    const newText = (text[0] === "=") ? text.slice(1) : text
    item.push(newText)
    const student = [inf[0], inf[1], inf[3], inf[5]]
    list = toDay.concat(student).concat(item)
    //checkTime()

  } else {
    return 'test'
  }
}

function testsss() {
  console.log(writesheet(["aiueo", "kakikukeko",'a','', '', '','=A1', 's20014'], "admin"))

}

function checkData(data) {
  const selectList = ["終日","午前", "午後", "コマ別"]
  const selectWhyOption = ["遅刻", "早退",　"欠席"]
  const restReasonList = getRestReasonList()
  const restList = restReasonList.map(n => n[0])
  
  if (!selectList.includes(data[1])) return false
  if (!selectWhyOption.includes(data[3])) return false
  if (!restList.includes(data[4])) return false

  const selectRestList = restReasonList.filter(n => n[0] == data[4])[0].slice(1)
  const getRest = data[5].split(",")
  
  if(getRest.length == 1 && getRest[0] == "") return true
  for (item of getRest) {
    if(!selectRestList.includes(item)) return false
  }
  return true
}

function getDate() {
  const date = new Date(); //現在日時を取得
  const reDate = Utilities.formatDate(date, "Asia/Tokyo", "YYYY-MM-dd,HH:mm")
  console.log(reDate.split(","));
  return reDate.split(",")
}

function checkTime() {
  const nowTime = new Date()
  const nowHours = nowTime.getHours()
  const nowMinutes = nowTime.getMinutes()
  makeList()
  const hoursList = [8, 9, 10, 11, 12, 13, 14, 15, 16]
  if(hoursList.includes(nowHours)) {
    nineSendMail()
    setSendMail()
  } else if(!hoursList.includes(nowHours)){
    pushSheet()
  }
}

function makeList() {
  if(!list) return
  const calender = getCalenderEvent()
  try {
    const morning = (calender[0][1].getHours() < calender[1][1].getHours()) ? calender[0] : calender[1]
    const afternoon = (calender[0][1].getHours() < calender[1][1].getHours()) ? calender[1] : calender[2]
    list.push(morning[2].join("\,"))
    list.push(afternoon[2].join("\,"))
  } catch(errer) {
    console.log(errer)
  }　finally {

  }
}

function setSendMail() {
 if(!list) return
 app.templateMail(list)
 SS.appendRow(list)
}

function pushSheet() {
  if(!list) return
  SSM.appendRow(list)
}

function nineSendMail() {
  const mail = SSM.getDataRange().getValues().slice(1)
  if(mail.length === 0) return 
  for (item of mail) {
    app.templateMail(item)
    SS.appendRow(item)
  }
  SSM.deleteRows(2, SSM.getLastRow())
  
}



function getRestReasonList() {
  const SS = SpreadsheetApp.openById("16laDl3T6GNt4OcZWqgYFMKkKrDmQ7nT94yoAUzbWfn4").getSheetByName("reasonRest")
  const data = SS.getDataRange().getValues()
  const dd = data.map(n => n.filter(Boolean))
  return dd
}
