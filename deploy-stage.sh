#!/bin/bash
docker-compose -f docker-compose.stage.yml build --no-cache --compress
docker-compose -f docker-compose.stage.yml up -d
