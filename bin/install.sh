#!/bin/bash

cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null
cd .. >/dev/null

mv "$PWD" /usr/local/lib/oio
ln -s /usr/local/lib/oio/index.js /usr/local/bin/oio