#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Wait for Database ---
# พยายามเชื่อมต่อกับ database ที่ host 'db' port 5432 วนไปเรื่อยๆ
# จนกว่าจะเชื่อมต่อสำเร็จ
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"
# -------------------------


# สั่งให้ Prisma ทำการ deploy migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# หลังจาก migrate เสร็จ ให้รันคำสั่งปกติของ container
echo "Starting the server..."
exec "$@"