/*
  Warnings:

  - You are about to drop the column `amount` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `balance` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `Amount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Balance` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Category` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Date` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "amount",
DROP COLUMN "balance",
DROP COLUMN "category",
DROP COLUMN "date",
DROP COLUMN "description",
ADD COLUMN     "Amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Category" TEXT NOT NULL,
ADD COLUMN     "Date" TEXT NOT NULL,
ADD COLUMN     "Description" TEXT NOT NULL;
