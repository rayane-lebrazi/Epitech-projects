#!/usr/bin/env bash
find . -type f -name '*.js' -exec sed -i 's/myMoule/myModule/g' {} +
