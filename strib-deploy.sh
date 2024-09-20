#!/bin/bash

DEPLOY_PATH=""
DEPLOYTO=""

while [ $# -gt 0 ]; do
  case $1 in
  --environment) DEPLOYTO="$2"; shift 2;;
  *) shift 1;;
  esac
done

PROJ_NAME=$(pwd | xargs basename)
echo "Project Name: $PROJ_NAME"
echo "Deploying to: $DEPLOYTO"

if [ "$DEPLOYTO" == "production" ]; then
  DEPLOY_PATH="s3://static.startribune.com/news/projects/all/$PROJ_NAME"
elif [ "$DEPLOYTO" == "staging" ]; then
  DEPLOY_PATH="s3://static.startribune.com/staging/news/projects/all/$PROJ_NAME"
fi

echo "Deployment Path: $DEPLOY_PATH"

if [ "$DEPLOY_PATH" != "" ]; then
  if [ -d "dist/" ]; then
    echo "Syncing general assets..."
    aws s3 sync ./dist/ $DEPLOY_PATH \
      --profile default \
      --exclude ".DS_Store" \
      --exclude "strib-webfonts/*" \
      --exclude "assets/*"

    echo "Syncing JavaScript .gz files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.js.gz" \
      --profile default \
      --content-encoding "gzip" \
      --content-type "application/javascript"

    echo "Syncing JavaScript files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.js" \
      --profile default \
      --content-type "application/javascript"

    echo "Syncing CSS .gz files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.css.gz" \
      --profile default \
      --content-encoding "gzip" \
      --content-type "text/css"

    echo "Syncing CSS files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.css" \
      --profile default \
      --content-type "text/css"
  else
    echo "No 'dist/' directory found. Do you need to run the build command?"
  fi
else
  echo "No valid deployment environment specified. Taking no further action."
fi
