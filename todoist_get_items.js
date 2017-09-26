const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Todoist = require("./todoist").Todoist;
const TODOIST_TOKEN = require('./todoist_token').TODOIST_TOKEN;

var todoist = new Todoist(TODOIST_TOKEN, new XMLHttpRequest());

todoist.getItems(function(items) {
  console.log(items);
});
