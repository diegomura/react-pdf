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
rm -rf src
mkdir -p src
mkdir -p src/dist
mkdir -p src/build
mkdir -p src/build/Release
cp node_modules/yoga-layout/dist/{entry-browser,entry-common,YGEnums}* src/dist
cp node_modules/yoga-layout/build/Release/nbind.js src/build/Release

# Remove local node_modules
rm -rf node_modules
