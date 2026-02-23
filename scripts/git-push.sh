#!/bin/bash
git remote set-url origin https://indhackk:$(cat ~/.github_token_indhackk | tr -d '\n')@github.com/indhackk/indhack.Com.git
git push origin HEAD:main
