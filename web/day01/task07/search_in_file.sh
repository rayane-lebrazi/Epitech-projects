#!/usr/bin/env bash
if [[ $# -ne 2 ]]; then
    printf 'Usage: %s PATTERN FILE\n' "$0" >&2
    exit 2
fi
grep -- "$1" "$2"