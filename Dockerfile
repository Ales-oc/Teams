FROM node:16.15.0 AS build-env

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000-4200

CMD ["npm", "start"]

RUN npm run dev
