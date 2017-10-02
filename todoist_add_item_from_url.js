const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Todoist = require("./todoist").Todoist;
const TitleParser = require("./title_parser").TitleParser;
const URL = require('url');
const TODOIST_TOKEN = require('./private_values').TODOIST_TOKEN;
const GITHUB_USERNAME = require('./private_values').GITHUB_USERNAME;

var input_url = process.argv[2];
var todoist = new Todoist(TODOIST_TOKEN, new XMLHttpRequest());

if (input_url) {
  var location = URL.parse(input_url);
  var parser = new TitleParser(location, title, {
    githubUsername: GITHUB_USERNAME
  });
  title = parser.parseTitle();
  todoist.createItem({ content: title, url: location.href }, function(id) {
    console.log(id);
  });
} else {
  todoist.createItem({ content: title }, function(id) {
    console.log(id);
  });
}
