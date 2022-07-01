#!/bin/bash
docker-compose -f docker-compose.prod.yml build --no-cache --compress
docker-compose -f docker-compose.prod.yml up -d
