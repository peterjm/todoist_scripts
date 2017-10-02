chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      var parser = new TitleParser(location, document.title, {
        githubUsername: request.githubUsername
      });
      var title = parser.parseTitle();
      var todoist = new Todoist(request.todoistToken, new XMLHttpRequest());
      todoist.createItem({ content: title, url: location.href }, function(id) {
        sendResponse({
          id: id,
          title: title,
          url: location.href
        });
      });
      return true; // necessary to make `sendResponse` work asynchronously
    }
  }
);
