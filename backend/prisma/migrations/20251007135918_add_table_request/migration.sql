/*
  Warnings:

  - You are about to drop the column `annoucer_id` on the `Pet` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('Pending', 'Approved', 'Rejected');

-- DropForeignKey
ALTER TABLE "public"."Pet" DROP CONSTRAINT "Pet_annoucer_id_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "annoucer_id";

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "requester_id" INTEGER NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requester_id_fkey" FOREIGN KEY ("requester_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
