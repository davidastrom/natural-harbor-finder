# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /app    
COPY package*.json ./
RUN npm install
RUN npm install -g @vue/cli
COPY . .

# build stage
FROM develop-stage as build-stage
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]