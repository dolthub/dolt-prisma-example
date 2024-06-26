import { PrismaClient } from "@prisma/client";
import {
  doltCommit,
  printCommitLog,
  printStatus,
  createBranch,
  printActiveBranch,
  checkoutBranch,
  printTables,
  doltResetHard,
  printDiff,
  doltMerge,
} from "./doltUtils";
import { PrismaTransaction } from "./types";

async function createTablesCommit() {
  const prisma = new PrismaClient();
  try {
    await doltCommit(prisma, "LiuLiu <liu@dolthub.com>", "Create tables");
    await printCommitLog(prisma);
    await printStatus(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

createTablesCommit();

async function updateManager() {
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      await createBranch(tx, "add-manager");
      await checkoutBranch(tx, "add-manager");
      await printActiveBranch(tx);
      await updateDepartmentManagers(tx);
      await doltCommit(tx, "LiuLiu <liu@dolthub.com>", "Add managers");
      await printCommitLog(tx);
    });
    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateManager();

async function updateDepartmentManagers(prisma: PrismaTransaction) {
  // Update Marketing
  await prisma.department.update({
    where: { dept_no: "d001" },
    data: { manager_id: 10001 },
  });

  // Update Finance
  await prisma.department.update({
    where: { dept_no: "d002" },
    data: { manager_id: 10002 },
  });

  // Update Human Resources
  await prisma.department.update({
    where: { dept_no: "d003" },
    data: { manager_id: 10003 },
  });

  // Update Production
  await prisma.department.update({
    where: { dept_no: "d004" },
    data: { manager_id: 10004 },
  });

  // Update Development
  await prisma.department.update({
    where: { dept_no: "d005" },
    data: { manager_id: 10005 },
  });

  console.log("Department managers updated successfully.");
}
const prisma = new PrismaClient();

printDiff(prisma, "departments");

async function dropTableDeptEmp() {
  const prisma = new PrismaClient();
  try {
    await prisma.$executeRaw`DROP TABLE dept_emp`;
    await printTables(prisma);
    await printStatus(prisma);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

// dropTableDeptEmp();

async function rollBack() {
  const prisma = new PrismaClient();
  try {
    await doltResetHard(prisma);
    console.log("Rolled back to the previous commit.");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

rollBack();

async function dropColumnGender() {
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      await createBranch(tx, "drop-column");
      await checkoutBranch(tx, "drop-column");
      await printActiveBranch(tx);
      await tx.$executeRaw`ALTER TABLE employees DROP COLUMN gender`;
      await doltCommit(tx, "LiuLiu <liu@dolthub.com>", "Drop column");
      await printCommitLog(tx);
    });
    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

dropColumnGender();

async function mergeBranch() {
  const prisma = new PrismaClient();
  try {
    await prisma.$transaction(async (tx) => {
      await checkoutBranch(tx, "main");
      await printActiveBranch(tx);
      await doltMerge(tx, "add-manager");
      await printCommitLog(tx);
    });
    console.log("All operations completed successfully.");
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

mergeBranch();
