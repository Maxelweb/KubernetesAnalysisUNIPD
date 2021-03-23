#!/bin/sh

GREEN='\033[0;32m'
ORANGE='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "============================================="
echo "${ORANGE}[Server Update] ${NC} Update started ..."
if [ -d "Kubernetes-RCD" ]
then
        echo "${ORANGE}[Server Update] ${NC} Removing active services ..."
        docker-compose  \
        -f Kubernetes-RCD/Application/docker-compose.yml \
        down -v
        # docker image prune -f
        echo "${ORANGE}[Server Update] ${GREEN} Services removed!"
fi
echo "${ORANGE}[Server Update] ${NC} Pulling updates from git ..."
git -C Kubernetes-RCD/ pull
echo "${ORANGE}[Server Update] ${GREEN} Components updated successfully!"
echo "${ORANGE}[Server Update] ${NC} Starting docker containers again..."
docker-compose \
        -f Kubernetes-RCD/Application/docker-compose.yml \
        up --build -d
echo "${ORANGE}[Server Update] ${GREEN} Docker containers started!"
echo "${NC} ============================================="
echo "${NC}> ${ORANGE}When life gives you containers, ${GREEN} dont make images! ${RED} Make life take the containers back! Dont get mad.. and build your owns :) ${NC} <"