# STAGE 1: Builder - สภาพแวดล้อมสำหรับ build ที่มี devDependencies ครบ
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json และ lock file
COPY package*.json ./

# ติดตั้ง dependencies ทั้งหมด (รวม devDependencies)
RUN npm install

# Copy source code และ prisma schema
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# STAGE 2: Production - สภาพแวดล้อมสำหรับใช้งานจริงที่สะอาดและเล็ก
FROM node:20-alpine AS production
WORKDIR /app

# Copy package.json และ lock file
COPY package*.json ./

# ติดตั้งเฉพาะ production dependencies
RUN npm install --production

# Copy โค้ดที่ build และ generate เสร็จแล้วทั้งหมดจาก Stage 'builder'
COPY --from=builder /app .

# --- ส่วนที่แก้ไข ---
# **สำคัญ: ย้าย chmod มาไว้หลังสุด**
# เพื่อให้แน่ใจว่าเรากำลังให้สิทธิ์กับไฟล์ entrypoint.sh เวอร์ชันสุดท้าย
RUN chmod +x ./entrypoint.sh
# --------------------

# Expose port
EXPOSE 4000

# กำหนดให้ Entrypoint ทำงานก่อนเสมอ
ENTRYPOINT ["./entrypoint.sh"]

# คำสั่ง default ที่จะถูกส่งไปให้ entrypoint เพื่อ start server
CMD ["npm", "start"]
