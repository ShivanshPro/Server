#!/bin/bash

if [ "$#" -eq 0 ] ; then
        echo "Please specify the reseller username to proceed"
elif [ "$#" -eq 1 ] ; then
        arg=$(echo $1)
        echo $1|grep '@'
        for user in $(cat /etc/trueuserowners | grep -w $arg | awk -F":" '{print $1}'); do mkdir -p /backup/$arg && /scripts/pkgacct $user /backup/$arg; done;
fi
