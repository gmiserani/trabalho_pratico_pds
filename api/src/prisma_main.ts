import { PrismaClient } from "@prisma/client";

// global point -> define only one instance of PrismaClient-> vai fazer o meio campo entre o codigo e o banco de dados

const prisma = new PrismaClient({
    log: ["query", "error"],
});

export default prisma;