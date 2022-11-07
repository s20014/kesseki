function doGet(request) {
  let pages = request.parameter.page;
  if(!pages) {
    pages = 'attendance'
  }
  
  const page1 = HtmlService.createTemplateFromFile(pages);

  return page1.evaluate()
              .setTitle('ITカレッジポータルサイト');
             // .setFaviconUrl();  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
