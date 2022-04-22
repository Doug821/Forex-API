FROM node as base

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 3000

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build

CMD ["npm", "dev"]
