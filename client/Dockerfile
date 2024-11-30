FROM node:20.13.1 AS build

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /client/build /usr/share/nginx/html

EXPOSE 8080

CMD ["npm", "run", "start"]
