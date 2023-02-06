# !/bin/bash
# Path: rpi/deploy.sh
# run from project root

git pull

make all-services-down

make all-services-up