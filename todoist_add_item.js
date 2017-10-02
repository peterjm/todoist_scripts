const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Todoist = require("./todoist").Todoist;
const TODOIST_TOKEN = require('./private_values').TODOIST_TOKEN;

var content = process.argv[2];
var todoist = new Todoist(TODOIST_TOKEN, new XMLHttpRequest());
todoist.createItem({ content: title }, function(id) {
  console.log(id);
});
