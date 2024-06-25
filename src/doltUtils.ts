import { Prisma } from "@prisma/client";
import { PrismaTransaction } from "./types";

export async function doltCommit(
  prisma: PrismaTransaction,
  author: string,
  msg: string
) {
  const result =
    await prisma.$executeRaw`CALL DOLT_COMMIT('--author', ${author}, '-Am', ${msg}) `;
  console.log("Created commit:", result);
}

// Define an interface for the commit log
interface CommitLog {
  commit_hash: string;
  committer: string;
  message: string;
}

export async function printCommitLog(prisma: PrismaTransaction) {
  const res = await prisma.$queryRaw<
    CommitLog[]
  >`SELECT commit_hash, committer, message FROM dolt_log ORDER BY date DESC`;
  console.log("Commit log:", res);
}

// Define an interface for the dolt status
interface DoltStatus {
  table_name: string;
  staged: number;
  status: string;
}

export async function printStatus(prisma: PrismaTransaction) {
  const res = await prisma.$queryRaw<DoltStatus[]>`SELECT * FROM dolt_status`;
  console.log("Status:");
  if (res.length === 0) {
    console.log("  No tables modified");
  } else {
    res.forEach((row) => {
      console.log(`  ${row.table_name}: ${row.status}`);
    });
  }
}

interface Branch {
  name: string;
}

export async function getBranch(
  prisma: PrismaTransaction,
  branch: string
): Promise<Branch[] | undefined> {
  const res = await prisma.$queryRaw<
    Branch[]
  >`SELECT name FROM dolt_branches where name = ${branch}`;
  return res;
}

export async function getBranches(
  prisma: PrismaTransaction
): Promise<Branch[] | undefined> {
  const res = await prisma.$queryRaw<Branch[]>`SELECT name FROM dolt_branches`;
  console.log("Branches:", res);
  return res;
}

export async function createBranch(prisma: PrismaTransaction, branch: string) {
  const res = await getBranch(prisma, branch);
  if (res && res.length > 0) {
    console.log("Branch exists:", branch);
  } else {
    await prisma.$executeRaw`CALL DOLT_BRANCH(${branch})`;
    console.log("Created branch:", branch);
  }
}

export async function checkoutBranch(
  prisma: PrismaTransaction,
  branch: string
) {
  const res = await prisma.$executeRaw`CALL DOLT_CHECKOUT(${branch})`;
  console.log("Using branch:", branch);
}

export async function printActiveBranch(prisma: PrismaTransaction) {
  const res = await prisma.$queryRaw`SELECT ACTIVE_BRANCH()`;
  console.log("Active branch:", res);
}

export async function printDiff(prisma: PrismaTransaction, table: string) {
  const query = Prisma.sql`SELECT * FROM ${Prisma.raw(
    "dolt_diff_" + table
  )} where to_commit = 'WORKING'`;
  const res = await prisma.$queryRaw(query);
  console.log(`Diff for ${table}:`);
  console.log(res);
}

export async function printTables(prisma: PrismaTransaction) {
  const res = await prisma.$queryRaw`SHOW TABLES`;
  console.log("Tables in database:", res);
}

export async function doltResetHard(
  prisma: PrismaTransaction,
  commit?: string
) {
  if (commit) {
    await prisma.$executeRaw`CALL DOLT_RESET('--hard', ${commit})`;
    console.log("Resetting to commit:", commit);
  } else {
    await prisma.$executeRaw`CALL DOLT_RESET('--hard')`;
    console.log("Resetting to HEAD");
  }
}
