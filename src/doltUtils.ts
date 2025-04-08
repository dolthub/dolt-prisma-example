import { Prisma } from "@prisma/client";
import { PrismaTransaction } from "./types";

export async function doltCommit(
  tx: PrismaTransaction,
  author: string,
  msg: string
) {
  const result =
    await tx.$executeRaw`SELECT DOLT_COMMIT('--author', ${author}, '-Am', ${msg}) `;
  console.log("Created commit:", result);
}

// Define an interface for the commit log
interface CommitLog {
  commit_hash: string;
  committer: string;
  message: string;
}

export async function printCommitLog(tx: PrismaTransaction) {
  const res = await tx.$queryRaw<
    CommitLog[]
  >`SELECT commit_hash, committer, message FROM dolt_log ORDER BY date DESC`;
  console.log("Commit log:", res);
}

// Define an interface for the dolt status
interface DoltStatus {
  table_name: string;
  staged: boolean;
  status: string;
}

export async function printStatus(tx: PrismaTransaction) {
  const res = await tx.$queryRaw<DoltStatus[]>`SELECT * FROM dolt_status`;
  console.log("Status:", res);
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
  tx: PrismaTransaction,
  branch: string
): Promise<Branch[] | undefined> {
  const res = await tx.$queryRaw<
    Branch[]
  >`SELECT name FROM dolt_branches where name = ${branch}`;
  return res;
}

export async function getBranches(
  tx: PrismaTransaction
): Promise<Branch[] | undefined> {
  const res = await tx.$queryRaw<Branch[]>`SELECT name FROM dolt_branches`;
  console.log("Branches:", res);
  return res;
}

export async function createBranch(tx: PrismaTransaction, branch: string) {
  const res = await getBranch(tx, branch);
  if (res && res.length > 0) {
    console.log("Branch exists:", branch);
  } else {
    await tx.$executeRaw`SELECT DOLT_BRANCH(${branch})`;
    console.log("Created branch:", branch);
  }
}

export async function checkoutBranch(tx: PrismaTransaction, branch: string) {
  const res = await tx.$executeRaw`SELECT DOLT_CHECKOUT(${branch})`;
  console.log("Using branch:", branch);
}

export async function printActiveBranch(tx: PrismaTransaction) {
  const res = await tx.$queryRaw`SELECT ACTIVE_BRANCH()`;
  console.log("Active branch:", res);
}

export async function printDiff(tx: PrismaTransaction, table: string) {
  const query = Prisma.sql`SELECT * FROM ${Prisma.raw(
    "dolt_diff_" + table
  )} where to_commit = 'WORKING'`;
  const res = await tx.$queryRaw(query);
  console.log(`Diff for ${table}:`);
  console.log(res);
}

export async function printTables(tx: PrismaTransaction) {
  const res = await tx.$queryRaw`SHOW TABLES`;
  console.log("Tables in database:", res);
}

export async function doltResetHard(tx: PrismaTransaction, commit?: string) {
  if (commit) {
    await tx.$executeRaw`SELECT DOLT_RESET('--hard', ${commit})`;
    console.log("Resetting to commit:", commit);
  } else {
    await tx.$executeRaw`SELECT DOLT_RESET('--hard')`;
    console.log("Resetting to HEAD");
  }
}

export async function doltMerge(tx: PrismaTransaction, branch: string) {
  await tx.$executeRaw`SELECT DOLT_MERGE(${branch})`;
  console.log("Merge complete for ", branch);
}
