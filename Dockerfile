FROM node:12.20.0

WORKDIR /app

COPY project/application/package.json .
RUN npm install

COPY project/application .
RUN npm run build

CMD [ "npm", "start" ]
