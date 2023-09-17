FROM node:18-alpine

ARG NODE_ENV=local
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install -g npm@9.1.3
RUN npm ci --only=development

COPY . .

RUN npm run build

ENTRYPOINT ["./entrypoint.sh"]
