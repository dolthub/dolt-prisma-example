/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `dept_emp` MODIFY `from_date` DATETIME(3) NOT NULL,
    MODIFY `to_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employees` ADD COLUMN `email` VARCHAR(50) NULL,
    MODIFY `birth_date` DATETIME(3) NOT NULL,
    MODIFY `hire_date` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `employees_email_key` ON `employees`(`email`);
