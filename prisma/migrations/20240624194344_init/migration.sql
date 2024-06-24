-- CreateTable
CREATE TABLE `employees` (
    `emp_no` INTEGER NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `first_name` VARCHAR(14) NOT NULL,
    `last_name` VARCHAR(16) NOT NULL,
    `gender` ENUM('M', 'F') NOT NULL,
    `hire_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`emp_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departments` (
    `dept_no` CHAR(4) NOT NULL,
    `dept_name` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `departments_dept_name_key`(`dept_name`),
    PRIMARY KEY (`dept_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dept_emp` (
    `emp_no` INTEGER NOT NULL,
    `dept_no` CHAR(4) NOT NULL,
    `from_date` DATETIME(3) NOT NULL,
    `to_date` DATETIME(3) NOT NULL,

    PRIMARY KEY (`emp_no`, `dept_no`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dept_emp` ADD CONSTRAINT `dept_emp_emp_no_fkey` FOREIGN KEY (`emp_no`) REFERENCES `employees`(`emp_no`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dept_emp` ADD CONSTRAINT `dept_emp_dept_no_fkey` FOREIGN KEY (`dept_no`) REFERENCES `departments`(`dept_no`) ON DELETE CASCADE ON UPDATE CASCADE;
