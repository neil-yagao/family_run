#! /bin/bash
quasar build -m pwa
scp -r ./dist/pwa "neil.hu"@106.14.57.150:~/team_run/