// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.get({
    todoistToken: null,
    githubUsername: null
  }, function(config) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        message: "clicked_browser_action",
        todoistToken: config.todoistToken,
        githubUsername: config.githubUsername
      }, function(response) {
        chrome.notifications.create(response.id.toString(), {
          type: "basic",
          title: "Added to Todoist",
          message: response.title,
          iconUrl: "todoist.png"
        });
      });
    });
  });
});
