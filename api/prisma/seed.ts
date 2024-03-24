import { PrismaClient } from "@prisma/client";

//npx prisma db seed

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.user.create({
        data: {
            name: "Alice",
            email: "alice@prisma.io",
            password: "123",
            username: "alice",
        },
    });
    await prisma.user.create({
        data: {
            name: "Bob",
            email: "bob@prisma.io",
            password: "123",
            username: "bob",
        },
    });
    const users = await prisma.user.findMany();

    console.log(users);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });