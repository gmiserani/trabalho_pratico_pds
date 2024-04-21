import { PrismaClient } from "@prisma/client";

//npx prisma db seed

const prisma = new PrismaClient();

async function main() {
    await prisma.user.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.review.deleteMany();

    await prisma.user.create({
        data: {
            name: "Raissa Miranda",
            email: "raissa@prisma.io",
            password: "123",
            username: "raissa",
            course: "Ciencia da Computacao",
            semester: 1,
        },
    });
    await prisma.user.create({
        data: {
            name: "Isabella Vignoli",
            email: "bella@prisma.io",
            password: "123",
            username: "bella",
            course: "Ciencia da Computacao",
            semester: 1,
        },
    });

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


    console.log(prisma.subject.findMany());

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