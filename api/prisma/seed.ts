import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";

//npx prisma db seed



const prisma = new PrismaClient();



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

    // await prisma.user.create({
    //     data: {
    //         name: "Raissa Miranda",
    //         email: "raissa@prisma.io",
    //         password: "123",
    //         username: "raissa",
    //         course: "Ciencia da Computacao",
    //         semester: 1,
    //     },
    // });
    // await prisma.user.create({
    //     data: {
    //         name: "Isabella Vignoli",
    //         email: "bella@prisma.io",
    //         password: "123",
    //         username: "bella",
    //         course: "Ciencia da Computacao",
    //         semester: 1,
    //     },
    // });

    // await prisma.subject.create({
    //     data: {
    //         name: "Projeto em Desenvolvimento de Software",
    //         syllabus: "Ementa",
    //         mode: "Presencial",
    //         semester: 0,
    //         workload: 60,
    //         date: "Mon/Wend",
    //         time: "17:00",
    //         teacher: {
    //             create: {
    //                 name: "Marco Tulio",
    //             },
    //         },
    //     },
    // });

    // const teacher = await prisma.teacher.findFirst({
    //     where: {
    //         name: "Marco Tulio",
    //     },
    //     select: {
    //         id: true,
    //     },
    // });
    // await prisma.subject.create({
    //     data: {
    //         name: "Engenharia de Software 1",
    //         syllabus: "Ementa",
    //         mode: "Presencial",
    //         semester: 0,
    //         workload: 60,
    //         date: "Mon/Wend",
    //         time: "14:55",
    //         teacher: {
    //             connect: {
    //                 id: teacher?.id,
    //             },
    //         },
    //     },
    // });


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