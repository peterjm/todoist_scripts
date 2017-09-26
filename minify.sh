#! /usr/bin/env bash

./node_modules/uglify-es/bin/uglifyjs \
  todoist.js \
  title_parser.js \
  -o todoist.min.js
