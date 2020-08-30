#!/usr/bin/env sh

ng deploy --base-href=/holytube/

git add .
git commit -m "update"
git push --all
