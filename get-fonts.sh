#!/bin/bash

bucket_name="static.startribune.com"
bucket_path="fonts"
local_dir="./public/strib-webfonts/"

# Create the local directory if it doesn't exist
mkdir -p $local_dir

# If the local directory exists, empty it
if [ -d "$local_dir" ]; then
    rm -rf ${local_dir:?}/*
fi

# Download only the .woff files from the static.startribune
aws s3 sync s3://${bucket_name}/${bucket_path} $local_dir --exclude "*" --include "*.woff"


