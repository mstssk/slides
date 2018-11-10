#!/bin/sh -eux

DIR_NAME=$1
git clone https://github.com/hakimel/reveal.js.git $DIR_NAME

rm -rf $DIR_NAME/.git
