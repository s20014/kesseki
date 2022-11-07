function getStudentData() {
  return app.getStudentData()
}

function getStudentInformation() {
  return app.getStudentInformation()
}


function getAppUrl() {
  console.log(ScriptApp.getService().getUrl())
  return ScriptApp.getService().getUrl();
}