#!/bin/bash
set -e
cd /opt/refund-app || exit 1
git pull origin main || true
docker compose pull || true
docker compose build --pull
docker compose up -d
echo "Deployed."