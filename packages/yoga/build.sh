#!/bin/bash

# Fail when any command below fails
set -e

npm rm yoga-layout

# Install yoga-layout, but without running its build script on install
npm i --no-save --ignore-scripts yoga-layout

# Replace nbind with the version in master branch
cd node_modules/yoga-layout
npm rm nbind
npm i charto/nbind
npm run build:node
cd -

# Copy built files
rm -rf yoga-layout
mkdir -p yoga-layout
mkdir -p yoga-layout/dist
mkdir -p yoga-layout/build
mkdir -p yoga-layout/build/Release
cp node_modules/yoga-layout/dist/{entry-browser,entry-common,YGEnums}* yoga-layout/dist
cp node_modules/yoga-layout/build/Release/nbind.js yoga-layout/build/Release

# Remove local node_modules
rm -rf node_modules
