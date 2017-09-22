const TODOIST_URL = "https://todoist.com/api/v7/sync";

class Todoist {
  constructor(token, xmlHttpRequest=null, url=TODOIST_URL) {
    this.token = token;
    this.url = url;
    this.xmlHttpRequest = xmlHttpRequest || new XMLHttpRequest();
  }

  createItem(options) {
    var content = options.content;
    var url = options.url;
    var date = options.date || "today";
    var uuid = Todoist.uuidv4();
    if (url) {
      content = url+" ("+content+")";
    }

    this._makeRequest({
      commands: [
        {
          type: "item_add",
          uuid: uuid,
          temp_id: uuid,
          args: {
            content: content,
            date_string: date
          }
        }
      ]
    })
  }

  getItems() {
    makeRequest({
      resource_types: ['items']
    });
  }

  static uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  _makeRequest(values) {
    this.xmlHttpRequest.open('POST', this.url, true);
    this.xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    this.xmlHttpRequest.onload = function() {
      var response = JSON.parse(this.responseText);

      if (this.status >= 200 && this.status < 400) {
        console.log(response);
      } else {
        // We reached our target server, but it returned an error
        console.log("BAD REQUEST", response);
      }
    };

    this.xmlHttpRequest.onerror = function() {
      // There was a connection error of some sort
      console.log("ERROR", this);
    };

    var requestString = this._createRequestString(values);
    this.xmlHttpRequest.send(requestString);
  }

  _createRequestString(values) {
    var requestString = "token="+this.token;
    for(var propertyName in values) {
      var propertyValue = values[propertyName];
      requestString = requestString+"&"+propertyName+"="+JSON.stringify(propertyValue);
    }
    return requestString;
  }
}

module.exports = {
  Todoist: Todoist
}
