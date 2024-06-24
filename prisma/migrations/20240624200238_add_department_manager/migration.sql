-- AlterTable
ALTER TABLE `departments` ADD COLUMN `manager_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `dept_emp` MODIFY `from_date` DATETIME(3) NOT NULL,
    MODIFY `to_date` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `employees` MODIFY `birth_date` DATETIME(3) NOT NULL,
    MODIFY `hire_date` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `departments` ADD CONSTRAINT `departments_manager_id_fkey` FOREIGN KEY (`manager_id`) REFERENCES `employees`(`emp_no`) ON DELETE SET NULL ON UPDATE CASCADE;
