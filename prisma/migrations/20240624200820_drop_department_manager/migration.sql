/*
  Warnings:

  - You are about to drop the column `manager_id` on the `departments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `departments` DROP FOREIGN KEY `departments_manager_id_fkey`;

-- AlterTable
ALTER TABLE `departments` DROP COLUMN `manager_id`;

-- AlterTable
ALTER TABLE `dept_emp` MODIFY `from_date` DATETIME(3) NOT NULL,
    MODIFY `to_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employees` MODIFY `birth_date` DATETIME(3) NOT NULL,
    MODIFY `hire_date` DATETIME(3) NOT NULL;
