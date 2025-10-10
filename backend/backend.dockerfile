# --- Stage 1: Builder ---
# Stage นี้จะใช้สำหรับติดตั้ง dependencies ทั้งหมดและ build โปรเจกต์
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files และติดตั้ง dependencies ทั้งหมด (รวม devDependencies)
COPY package*.json ./
RUN npm install

# Copy source code ที่เหลือ
COPY . .

# รัน prisma generate (ทำใน stage นี้เพราะเรามี devDependencies ครบ)
RUN npx prisma generate


# --- Stage 2: Production ---
# Stage นี้คือ image สุดท้ายที่เราจะนำไปใช้งานจริง
FROM node:20-alpine AS production

WORKDIR /app

# Copy ไฟล์ทั้งหมดจาก builder stage มาก่อน
# ซึ่งจะรวมถึง source code, prisma schema, และ node_modules ที่มี devDependencies
COPY --from=builder /app .

# รัน npm install --production อีกครั้ง
# เพื่อลบ devDependencies ออก และทำให้ node_modules มีขนาดเล็กลงสำหรับ production
RUN npm install --production

# ทำให้ไฟล์ entrypoint.sh (ที่ถูก copy มาแล้ว) สามารถ execute ได้
RUN chmod +x ./entrypoint.sh

EXPOSE 4000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]

