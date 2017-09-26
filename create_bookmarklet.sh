#! /usr/bin/env bash

./node_modules/uglify-es/bin/uglifyjs \
  todoist_token.js \
  title_parser.js \
  todoist.js \
  bookmarklet.js \
  -o bookmarklet.min.js


echo -n "javascript:(function(){"
cat bookmarklet.min.js
echo "})();"

rm bookmarklet.min.js
