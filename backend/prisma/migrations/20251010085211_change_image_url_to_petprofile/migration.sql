/*
  Warnings:

  - You are about to drop the column `image_url` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `PetProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "image_url";

-- AlterTable
ALTER TABLE "PetProfile" ADD COLUMN     "image_url" TEXT NOT NULL;
