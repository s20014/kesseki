function doGet(request) {
  let pages = request.parameter.page;
  const login = app.getStudentInformation()

  if(pages == "attendanceAdmin" && login[1] !== "ADMIN") {
    pages = "test"

  } else if(!pages && login[1] === "ADMIN") {
    pages = "attendanceAdmin"

  } else if(!pages && login[1] !== "ADMIN") {
    pages = "attendance"
  }
  
  const page1 = HtmlService.createTemplateFromFile(pages)

  return page1.evaluate()
              .setTitle('ITカレッジポータルサイト')
             // .setFaviconUrl();  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function getAppUrl() {
  return ScriptApp.getService().getUrl()

}
