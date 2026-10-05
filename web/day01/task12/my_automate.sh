#!/usr/bin/env bash
if [[ $# -ne 2 || ! $1 =~ ^[0-9]+$ || ! $2 =~ ^[0-9]+$ || $1 -lt 1 || $2 -lt 1 ]]; then
    printf 'Usage: %s TASK_COUNT DAY_NUMBER (both positive integers)\n' "$0" >&2
    exit 2
fi
task_count=$1
day_number=$2
day_dir=$(printf 'day%02d' "$day_number")
mkdir -p "$day_dir"
for ((task_number = 1; task_number <= task_count; task_number++)); do
    task_dir=$(printf 'task%02d' "$task_number")
    mkdir -p "$day_dir/$task_dir"
done
