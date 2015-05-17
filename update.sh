#!/usr/bin/env bash

echo "########## create the documents"
npm run docs

echo "########## running unit tests"
npm run test

echo "########## uglify the code"
npm run uglify

if [ "$2" ]
echo "########## increment the release and push the tag to the repo"
then
  node ./build/up-version.js $2
  git tag -a "$(node ./build/get-version.js)" -m "$1"
  git push origin master --tags
fi

echo "########## commit and push the code up to the repo"
git pull
git add -A
git commit -m"$1"
git push