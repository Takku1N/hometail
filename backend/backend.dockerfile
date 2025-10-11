# STAGE 1: Builder - สภาพแวดล้อมสำหรับ build ที่มี devDependencies ครบ
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate


# STAGE 2: Production - สภาพแวดล้อมสำหรับใช้งานจริงที่สะอาดและเล็ก
FROM node:20-alpine AS production
WORKDIR /app

# **[แก้ไข]** ติดตั้ง dos2unix เพื่อแปลง Line Endings
# alpine-sdk ให้เครื่องมือพื้นฐานที่จำเป็น
RUN apk add --no-cache dos2unix

# คัดลอก package.json และติดตั้งเฉพาะ production dependencies
COPY package*.json ./
RUN npm install --production

# คัดลอก source code จาก build context ปัจจุบัน
COPY . .

# คัดลอกเฉพาะ Prisma Client ที่ generate เสร็จแล้วจาก builder stage
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# **[แก้ไข]** แปลงไฟล์ entrypoint.sh ให้เป็น Unix format (LF)
RUN dos2unix ./entrypoint.sh

# ทำให้ entrypoint.sh สามารถรันได้
RUN chmod +x ./entrypoint.sh

# Expose port
EXPOSE 4000

# กำหนดให้ Entrypoint ทำงานก่อนเสมอ
ENTRYPOINT ["./entrypoint.sh"]

# คำสั่ง default ที่จะถูกส่งไปให้ entrypoint เพื่อ start server
CMD ["npm", "start"]

