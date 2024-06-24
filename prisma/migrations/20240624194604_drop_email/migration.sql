/*
  Warnings:

  - You are about to drop the column `email` on the `employees` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `employees_email_key` ON `employees`;

-- AlterTable
ALTER TABLE `dept_emp` MODIFY `from_date` DATETIME(3) NOT NULL,
    MODIFY `to_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employees` DROP COLUMN `email`,
    MODIFY `birth_date` DATETIME(3) NOT NULL,
    MODIFY `hire_date` DATETIME(3) NOT NULL;
