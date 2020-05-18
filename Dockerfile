FROM node:10

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /usr/src/app

EXPOSE 3030

CMD ["npm", "start"]