#!/bin/bash
ps -ef | awk '/(\/home\/sajo\/local\/node\/bin\/node-inspector|[^\]]node --debug app.js)/ { print $2 }' | xargs kill
node-inspector &
node --debug app.js &