#!/usr/bin/env bash

node_modules/.bin/antora local-tutorials-antora-playbook.yml

s3cmd --acl-public -r put ./public/ s3://docs.couchbase.com/tutorials/