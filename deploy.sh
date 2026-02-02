#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
# Configure git to disable Cursor's askpass and use macOS keychain
git config core.askpass ""
git config credential.helper osxkeychain
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# Use SSH instead of HTTPS to avoid askpass issues
git push -f git@github.com:wilbertopachecob/portafolio.git main:gh-pages

cd -