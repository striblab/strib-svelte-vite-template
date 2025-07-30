#!/bin/bash

DEPLOY_PATH=""
DEPLOYTO=""

while [ $# -gt 0 ]; do
  case $1 in
  --environment)
    DEPLOYTO="$2"
    shift 2
    ;;
  *) shift 1 ;;
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

    FONTS_PATH="$DEPLOY_PATH/fonts/"

    # Check if the fonts directory exists in the S3 bucket
    if ! (aws s3 ls "$FONTS_PATH" --profile default | { grep -q 'PRE' || true; }
); then
      echo "Fonts directory not found in S3. Syncing now..."
      aws s3 sync ./dist/fonts $FONTS_PATH \
        --profile default
    else
      echo "Fonts directory already exists in S3. No action taken."
    fi

    echo "Syncing general assets..."
    aws s3 sync ./dist/ $DEPLOY_PATH \
      --profile default \
      --exclude ".DS_Store" \
      --exclude "strib-webfonts/*" \
      --exclude "assets/*" \
      --exclude "assets/fonts/*"


    echo "Syncing JavaScript .gz files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.js.gz" \
      --profile default \
      --content-encoding "gzip" \
      --content-type "application/javascript" \

    echo "Syncing JavaScript files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.js" \
      --profile default \
      --content-type "application/javascript" \

    echo "Syncing CSS .gz files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.css.gz" \
      --profile default \
      --content-encoding "gzip" \
      --content-type "text/css" \

    echo "Syncing CSS files..."
    aws s3 sync ./dist/assets/ "$DEPLOY_PATH/assets" \
      --exclude "*" \
      --include "*.css" \
      --profile default \
      --content-type "text/css" \

    JS_BUNDLE=$(basename dist/assets/index-*.js.gz)
    CSS_BUNDLE=$(basename dist/assets/index-*.css.gz)
    echo "
    
    Deploy complete! Code block:


    <div id=\"proj-container\"></div>
    <link rel=\"stylesheet\" href=\"${DEPLOY_PATH/s3:/https:}/assets/$CSS_BUNDLE\">
    <script type=\"module\" crossorigin src=\"${DEPLOY_PATH/s3:/https:}/assets/$JS_BUNDLE\"></script>
    
    
    
    "

  else
    echo "No 'dist/' directory found. Do you need to run the build command?"
  fi
else
  echo "No valid deployment environment specified. Taking no further action."
fi
