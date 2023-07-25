#!/bin/bash

DEPLOY_PATH=""
DEPLOYTO=""

while [ $# -gt 0 ] ; do
  case $1 in
  --environment) DEPLOYTO="$2"
  esac
  shift
done

PROJ_NAME=$(pwd | xargs basename)
echo $PROJ_NAME

if [ "$DEPLOYTO" == "production" ]; then
  DEPLOY_PATH="s3://static.startribune.com/news/projects/all/$PROJ_NAME"
elif [ "$DEPLOYTO" == "staging" ]; then
  DEPLOY_PATH="s3://static.startribune.com/staging/news/projects/all/$PROJ_NAME"
fi

if [ "$DEPLOY_PATH" != "" ]; then
  if [ -d "dist/" ]; then
    aws s3 sync ./dist/ $DEPLOY_PATH \
      --profile default \
      --exclude ".DS_Store" \
      --exclude "strib-webfonts/*" \
      --exclude "assets/*"
      
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.js.gz" \
      --profile default \
      --content-encoding=gzip \
      --content-type=application/javascript

    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.css.gz" \
      --profile default \
      --content-encoding=gzip \
      --content-type=text/css
  else
    echo "No 'dist/' directory found. Do you need to run the build command?"
  fi
else
  echo "No valid deployment environment specified. Taking no further action."
fi