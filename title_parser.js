class TitleParser {
  constructor(location, title) {
    this.location = location;
    this.title = title;
  }

  parseTitle() {
    var parsedTitle = this.title;

    switch (this.location.hostname) {
      case "github.com":
        parsedTitle = this._parseGithub();
      case "mail.google.com":
        parsedTitle = this._parseEmail();
      case "docs.google.com":
        parsedTitle = this._parseDoc();
    }

    return parsedTitle;
  }

  _parseGithub() {
    return this.title;
  }

  _parseEmail() {
    return this.title;
  }

  _parseDoc() {
    return this.title;
  }
}

if (typeof(module) != 'undefined') {
  module.exports = {
    TitleParser: TitleParser
  }
}
