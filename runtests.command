#!/bin/bash

# echo "The script you are running has basename `basename $0`, dirname `dirname $0`"
# echo "The present working directory is `pwd`"

cd "`dirname "$0"`"

pwd

node runtests.js

node mdex.js ./tests/cheatsheet.md ./tests/templates/red.html ./tests/output/cheatsheet-red.html