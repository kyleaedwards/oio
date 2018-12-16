#!/bin/bash

rm /usr/local/bin/oio

cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null
cd .. >/dev/null

echo $PWD

if [ "$PWD" != "/usr/local/lib/oio" ]
then
    mv "$PWD" /usr/local/lib/oio
fi
ln -s /usr/local/lib/oio/index.js /usr/local/bin/oio