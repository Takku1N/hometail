# แนะนำการใช้งาน
1. git clone https://github.com/Takku1N/hometail.git && cd hometail
2. docker compose up -d --build db backend
3. docker compose exec -it backend npx prisma migrate dev --name "init"
4. cd frontend
5. npm install
6. npm run dev (ให้ run frontend เพื่อ dev ก่อนเพราะ ถ้าให้ run server บน docker จะไม่ hot reload **ยกเว้นจะทำ hot reload ให้ (ทำให้ที!!!)**)

# path ณ ปัจจุบัน
* /  (หน้า Home)
* /auth  (หน้า Authen)

