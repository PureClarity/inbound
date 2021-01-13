#!/usr/bin/env bash

# Compile typescript
echo 'Clean inbound started'
rm -rf ./lib
mkdir -p ./lib
echo 'Clean inbound completed'

echo 'Compiling inbound started'
tsc --version
tsc --build ./tsconfig.json
echo 'Compiling inbound completed'