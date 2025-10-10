FROM node:22

WORKDIR /app

# COPY package ต่างๆ จาก WORKDIR ปัจจุบัน
COPY package*.json ./

RUN npm install

# COPY prisma จาก folder prisma
COPY prisma ./prisma

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
