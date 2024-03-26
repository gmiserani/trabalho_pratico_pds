import { PrismaClient } from "@prisma/client";

//npx prisma db seed

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.teacher.deleteMany();
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
    await prisma.subject.deleteMany();
    await prisma.subject.create({
        data: {
            name: "Projeto em Desenvolvimento de Software",
            syllabus: "Ementa",
            mode: "Presencial",
            semester: 0,
            workload: 60,
            date: "Mon/Wend",
            time: "17:00",
            teacher: {
                create: {
                    name: "Marco Tulio",
                },
            },
        },
    });
    const subjects = await prisma.subject.findMany();

    console.log(subjects);

    console.log(prisma.user.findMany());

    console.log(prisma.teacher.findMany());
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