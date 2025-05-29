/*
  Warnings:

  - You are about to drop the column `customerId` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'ADMIN';

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_customerId_fkey";

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "customerId";
