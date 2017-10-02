chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "clicked_browser_action") {
      var parser = new TitleParser(location, document.title, {
        githubUsername: GITHUB_USERNAME
      });
      var title = parser.parseTitle();
      var todoist = new Todoist(TODOIST_TOKEN, new XMLHttpRequest());
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
