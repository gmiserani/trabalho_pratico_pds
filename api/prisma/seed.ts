import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";
import { hash } from "bcrypt";

//npx prisma db seed

const prisma = new PrismaClient();

async function encryptPassword(password: string) {
    const saltRounds = 10;
    const encryptedPassword = await hash(password, saltRounds);
    return encryptedPassword;
}

async function main() {
    await prisma.user.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.teacher.deleteMany();
    await prisma.review.deleteMany();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const subjects: any[] = [];
    fs.createReadStream("prisma/subjects.csv")
        .pipe(csvParser())
        .on("data", (data) => subjects.push(data))
        .on("end", async () => {
            for (const subject of subjects) {
                console.log(subject);
                const teacher = await prisma.teacher.findFirst({
                    where: {
                        name: subject.teacherName,
                    },
                    select: {
                        id: true,
                    },
                });
                if (teacher) {
                    await prisma.subject.create({
                        data: {
                            name: subject.name,
                            syllabus: subject.syllabus,
                            mode: subject.mode,
                            semester: Number(subject.semester),
                            workload: Number(subject.workload),
                            date: subject.date,
                            time: subject.time,
                            teacher: {
                                connect: {
                                    id: teacher.id,
                                },
                            },
                        }
                    });
                }
                else {
                    await prisma.subject.create({
                        data: {
                            name: subject.name,
                            syllabus: subject.syllabus,
                            mode: subject.mode,
                            semester: Number(subject.semester),
                            workload: Number(subject.workload),
                            date: subject.date,
                            time: subject.time,
                            teacher: {
                                create: {
                                    name: subject.teacherName,
                                    picture: subject.pictureUrl,
                                },
                            },
                        }
                    });
                }
            }
        }
        );

    const encryptedPassword = await encryptPassword("123");

    await prisma.user.create({
        data: {
            name: "Raissa Miranda",
            email: "raissa@prisma.io",
            password: encryptedPassword,
            username: "raissa",
            course: "Ciencia da Computacao",
            semester: 1,
        },
    });
    await prisma.user.create({
        data: {
            name: "Isabella Vignoli",
            email: "bella@prisma.io",
            password: encryptedPassword,
            username: "bella",
            course: "Ciencia da Computacao",
            semester: 1,
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