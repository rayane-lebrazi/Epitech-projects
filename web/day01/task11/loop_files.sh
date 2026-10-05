#!/usr/bin/env bash
shopt -s nullglob
for file in *.md; do
    printf '%s\n' 'This is a new line.' >> "$file"
done
