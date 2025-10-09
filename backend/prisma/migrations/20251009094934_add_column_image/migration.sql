/*
  Warnings:

  - You are about to drop the `PetImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_url` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."PetImage" DROP CONSTRAINT "PetImage_pet_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "image_url" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."PetImage";
