#!/bin/sh
# Redeploy script: pulls latest changes and builds the project

echo "Pulling latest changes from git..."
git pull

if [ $? -ne 0 ]; then
  echo "Git pull failed. Exiting."
  exit 1
fi

echo "Building project with Vite..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

echo "Redeploy complete."
