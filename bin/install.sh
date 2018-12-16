#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null
cd .. >/dev/null

yarn
yarn compile

mv "$PWD" /usr/local/lib/oio
ln -s /usr/local/lib/oio/es5.js /usr/local/bin/oio