class TitleParser {
  constructor(location, title, options = {}) {
    this.location = location;
    this.title = title;
    this.githubUsername = options.githubUsername;
  }

  parseTitle() {
    var parsedTitle = this.title;

    switch (this.location.hostname) {
      case "github.com":
        parsedTitle = this._parseGithub();
        break;
      case "mail.google.com":
        parsedTitle = this._parseEmail();
        break;
      case "docs.google.com":
        parsedTitle = this._parseDoc();
        break;
    }

    return parsedTitle;
  }

  _parseGithub() {
    if (this.location.href.indexOf("/pull/") > 0) {
      return this._parseGithubPullRequest();
    } else if (this.location.href.indexOf("/issues/") > 0) {
      return this._parseGithubIssue();
    } else {
      return this.title;
    }
  }

  _parseGithubPullRequest() {
    var prefix = "PR Review";
    if (this.githubUsername && this.title.indexOf(" by "+this.githubUsername) > 0) {
      prefix = "PR";
    }
    return "[" + prefix + "] " + this._titleBefore(/ by [\w-]+ · /);
  }

  _parseGithubIssue() {
    return "[Issue] " + this._titleBefore(/ · /);
  }

  _parseEmail() {
    return "[Email] " + this._titleBefore(/ - [\w\.]+@/);
  }

  _parseDoc() {
    return "[Doc] " + this._titleBefore(/ - Google Docs/);
  }

  _titleBefore(regexp) {
    return this.title.split(regexp, 1)[0];
  }
}

if (typeof(module) != 'undefined') {
  module.exports = {
    TitleParser: TitleParser
  }
}
