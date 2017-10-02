// Saves options to chrome.storage
function saveOptions() {
  var todoistToken = document.getElementById('TodoistToken').value;
  var githubUsername = document.getElementById('GithubUsername').value;
  chrome.storage.sync.set({
    todoistToken: todoistToken,
    githubUsername: githubUsername
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('SaveStatus');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    todoistToken: '',
    githubUsername: ''
  }, function(config) {
    document.getElementById('TodoistToken').value = config.todoistToken;
    document.getElementById('GithubUsername').value = config.githubUsername;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('SaveOptions').addEventListener('click', saveOptions);
