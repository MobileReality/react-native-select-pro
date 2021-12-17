#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "master" ]] ; then
  echo "Build proceeded"
  exit 1;

else
  echo "Build canceled"
  exit 0;
fi
