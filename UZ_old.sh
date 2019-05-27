#!/bin/bash

tab="--tab"
cmd[1]="bash -c 'cd UI && sudo ng serve';bash"
cmd[2]="bash -c 'cd nodeServer && node app.js';bash"
cmd[3]="bash -c 'cd tmplt && node app.js';bash"
foo=""

for i in "${cmd[@]}"; do
      foo+=($tab -e "$i")         
done

gnome-terminal "${foo[@]}"

exit 0
