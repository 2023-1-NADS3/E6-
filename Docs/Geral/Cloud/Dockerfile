FROM node:16.13.1

WORKDIR /app

COPY package*.json .

RUN npm install typescript -g
RUN npm install ts-node-dev -g

RUN npm install

COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]
