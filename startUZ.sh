#!/bin/bash

tab="--tab --title="
title[1]="Angular"
title[2]="NodeServer"
title[3]="TmpltServer"
cmd[1]="bash -c 'cd UI && sudo ng serve';bash"
cmd[2]="bash -c 'cd nodeServer && node app.js';bash"
cmd[3]="bash -c 'cd tmplt && node app.js';bash"
foo=""

for i in 1 2 3; do
      foo+=($tab "${title[$i]}" -e "${cmd[$i]}")         
done

gnome-terminal "${foo[@]}"

exit 0
