/*
  Warnings:

  - You are about to drop the column `dicease` on the `PetProfile` table. All the data in the column will be lost.
  - You are about to drop the column `pet_type` on the `PetProfile` table. All the data in the column will be lost.
  - You are about to drop the column `sterilized` on the `PetProfile` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `PetProfile` table. All the data in the column will be lost.
  - Added the required column `breed` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neutered` to the `PetProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `PetProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PetProfile" DROP COLUMN "dicease",
DROP COLUMN "pet_type",
DROP COLUMN "sterilized",
DROP COLUMN "weight",
ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "medical_note" TEXT,
ADD COLUMN     "neutered" BOOLEAN NOT NULL,
ADD COLUMN     "species" "PetType" NOT NULL;
