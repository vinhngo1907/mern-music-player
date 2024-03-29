FROM node:14

WORKDIR /usr/src/bto

ADD ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "server" ]

EXPOSE 3000