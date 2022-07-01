#!/bin/bash
docker-compose -f docker-compose.dev.yml build --no-cache --compress
docker-compose -f docker-compose.dev.yml up -d
