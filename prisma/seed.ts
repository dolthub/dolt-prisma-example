import { PrismaClient } from "@prisma/client";
import csv from "csv-parser";
import fs from "fs";

const prisma = new PrismaClient();

async function processCSV(
  filePath: string,
  processData: (data: any[]) => Promise<void>
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const results: any[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        try {
          await processData(results);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
  });
}

async function main() {
  try {
    await processCSV("./employees.csv", async (data) => {
      for (const emp of data) {
        await prisma.employee.create({
          data: {
            emp_no: parseInt(emp.emp_no),
            last_name: emp.last_name,
            first_name: emp.first_name,
            birth_date: new Date(emp.birth_date),
            hire_date: new Date(emp.hire_date),
            col_to_drop: "",
          },
        });
      }
      console.log("Employees have been inserted");
    });

    await processCSV("./departments.csv", async (data) => {
      for (const dept of data) {
        await prisma.department.create({
          data: {
            dept_no: dept.dept_no,
            dept_name: dept.dept_name,
          },
        });
      }
      console.log("Departments have been inserted");
    });

    await processCSV("./dept_emp.csv", async (data) => {
      for (const deptEmp of data) {
        await prisma.deptEmp.create({
          data: {
            emp_no: parseInt(deptEmp.emp_no),
            dept_no: deptEmp.dept_no,
            from_date: new Date(deptEmp.from_date),
            to_date: new Date(deptEmp.to_date),
          },
        });
      }
      console.log("Department_Employee have been inserted");
    });
  } catch (e) {
    console.error("Error during database operation", e);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
