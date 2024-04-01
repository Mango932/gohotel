/*
  Warnings:

  - The primary key for the `customer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `customer` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `renting` table. All the data in the column will be lost.
  - You are about to drop the `person` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sin` to the `customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `full_name` to the `employee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_customer_booked_fkey";

-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_id_fkey";

-- DropForeignKey
ALTER TABLE "renting" DROP CONSTRAINT "renting_customer_id_fkey";

-- AlterTable
ALTER TABLE "customer" DROP CONSTRAINT "customer_pkey",
DROP COLUMN "id",
ADD COLUMN     "address" VARCHAR(50) NOT NULL,
ADD COLUMN     "full_name" VARCHAR(50) NOT NULL,
ADD COLUMN     "sin" INTEGER NOT NULL,
ADD CONSTRAINT "customer_pkey" PRIMARY KEY ("sin");

-- AlterTable
ALTER TABLE "employee" ADD COLUMN     "address" VARCHAR(50) NOT NULL,
ADD COLUMN     "full_name" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "renting" DROP COLUMN "customer_id",
ADD COLUMN     "customer_sin" INTEGER;

-- DropTable
DROP TABLE "person";

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_customer_booked_fkey" FOREIGN KEY ("customer_booked") REFERENCES "customer"("sin") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renting" ADD CONSTRAINT "renting_customer_sin_fkey" FOREIGN KEY ("customer_sin") REFERENCES "customer"("sin") ON DELETE RESTRICT ON UPDATE CASCADE;
