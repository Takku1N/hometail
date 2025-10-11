-- AlterTable
ALTER TABLE "PetProfile" ALTER COLUMN "image_url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserProfile" ALTER COLUMN "user_id" DROP DEFAULT;
DROP SEQUENCE "UserProfile_user_id_seq";
