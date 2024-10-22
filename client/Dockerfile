FROM node:slim AS build

WORKDIR /app/client

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM  nginx

COPY --from=build /app/client/dist /usr/share/nginx/html
COPY  nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 3000


CMD [ "nginx","-g","daemon off;" ]


