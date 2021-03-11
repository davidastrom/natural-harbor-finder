# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# production stage
FROM develop-stage as production-stage
ENV NODE_PATH=./dist
RUN npm run build