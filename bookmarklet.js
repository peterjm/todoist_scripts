var todoist = new Todoist(TODOIST_TOKEN, new XMLHttpRequest());
var parser = new TitleParser(location, document.title);
title = parser.parseTitle();
todoist.createItem({ content: title, url: location.href }, function(id) {
  console.log(id);
});
