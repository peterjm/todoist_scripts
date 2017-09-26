const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Todoist = require("./todoist").Todoist;
const TitleParser = require("./title_parser").TitleParser;
const URL = require('url');
const TODOIST_TOKEN = require('./todoist_token').TODOIST_TOKEN;

var input_url = process.argv[2];
var todoist = new Todoist(TODOIST_TOKEN, new XMLHttpRequest());

if (input_url) {
  var location = URL.parse(input_url);
  var parser = new TitleParser(location, title);
  title = parser.parseTitle();
  todoist.createItem({ content: title, url: location.href }, function(id) {
    console.log(id);
  });
} else {
  todoist.createItem({ content: title }, function(id) {
    console.log(id);
  });
}
