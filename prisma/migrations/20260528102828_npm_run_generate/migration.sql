/*
  Warnings:

  - Changed the type of `type` on the `Job` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('FULL_TIME', 'PART_TIME', 'INTERNSHIP');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "type",
ADD COLUMN     "type" "JobType" NOT NULL;
