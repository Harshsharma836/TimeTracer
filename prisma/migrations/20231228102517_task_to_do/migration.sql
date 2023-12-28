/*
  Warnings:

  - You are about to drop the column `published` on the `Task` table. All the data in the column will be lost.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Task` DROP COLUMN `published`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
