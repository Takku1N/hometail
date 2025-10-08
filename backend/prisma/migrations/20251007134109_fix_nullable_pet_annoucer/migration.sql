-- DropForeignKey
ALTER TABLE "public"."Pet" DROP CONSTRAINT "Pet_annoucer_id_fkey";

-- AlterTable
ALTER TABLE "Pet" ALTER COLUMN "annoucer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_annoucer_id_fkey" FOREIGN KEY ("annoucer_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
