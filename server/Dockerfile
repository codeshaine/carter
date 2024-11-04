FROM node:slim

WORKDIR /app/server

# Install OpenSSL
RUN apt-get update -y && apt-get install -y openssl

COPY package.json package-lock.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate


COPY . .

EXPOSE 8080

CMD [ "sh","-c","npx prisma migrate deploy && npm run seed && npm run start" ]