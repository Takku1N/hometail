# ใช้ Node.js LTS version บน Alpine (เล็กลง)
FROM node:22-alpine

# ตั้ง working directory
WORKDIR /app

# Copy package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies สำหรับ production เท่านั้น
RUN npm install --production

# Copy Prisma schema และ generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy source code ทั้งหมด
COPY . .

# กำหนด port ที่ container expose
EXPOSE 4000

# รัน app แบบ production
CMD ["npm", "start"]
