#!/bin/bash

DEPLOY_PATH=""
DEPLOYTO=""

while [ $# -gt 0 ] ; do
  case $1 in
  --environment) DEPLOYTO="$2"
  esac
  shift
done

PROJ_NAME=$(cat package.json | jq -r .name)
echo $PROJ_NAME

if [ "$DEPLOYTO" == "production" ]; then
  DEPLOY_PATH="s3://static.startribune.com/news/projects/all/$PROJ_NAME"
elif [ "$DEPLOYTO" == "staging" ]; then
  DEPLOY_PATH="s3://static.startribune.com/staging/news/projects/all/$PROJ_NAME"
fi

if [ "$DEPLOY_PATH" != "" ]; then
  if [ -d "dist/" ]; then
    aws s3 sync dist/ $DEPLOY_PATH --profile default --exclude ".DS_Store"
    aws s3 cp dist/assets/index.*.js.gz $DEPLOY_PATH --profile default --content-encoding=gzip --content-type=application/javascript
    aws s3 cp dist/assets/index.*.css.gz $DEPLOY_PATH --profile default --content-encoding=gzip --content-type=text/css
  else
    echo "No 'dist/' directory found. Do you need to run the build command?"
  fi
else
  echo "No valid deployment environment specified. Taking no further action."
fi