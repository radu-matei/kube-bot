FROM node:8.2.1-alpine

COPY . /code/bot
WORKDIR /code/bot

RUN npm install

EXPOSE 3978

CMD ["node", "build/app.js"]
