/*
  Warnings:

  - The `id` column on the `Fee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[block_number]` on the table `Fee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `block_number` to the `Fee` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Fee_id_key";

-- AlterTable
ALTER TABLE "Fee" ADD COLUMN     "block_number" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Fee_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Fee_block_number_key" ON "Fee"("block_number");
