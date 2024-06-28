import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csvParser from "csv-parser";
import { hash } from "bcrypt";
import test from "node:test";

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
    const reviews: any[] = [];
    fs.createReadStream("prisma/reviews.csv")
        .pipe(csvParser())
        .on("data", (data) => reviews.push(data))
        .on("end", async () => {
            for (const review of reviews) {
                console.log(review);
                const user = await prisma.user.findFirst({
                    where: {
                        username: review.username,
                    },
                    select: {
                        id: true,
                    },
                });
                const subject = await prisma.subject.findUnique({
                    where: {
                        name: review.subjectName, // Adjust the field name based on your schema
                    },
                    select: {
                        id: true,
                    },
                });
                
                if (!subject) {
                    // Handle the case where the subject does not exist.
                    // For example, create the subject or log an error.
                    console.error(`Subject not found for name: ${review.subjectName}`);
                    continue; // Skip this review or handle appropriately
                }
                if (user) {
                    await prisma.review.create({
                        data: {
                            user: {
                                connect: {
                                    username: review.username,
                                },
                            },
                            subject: {
                                connect: {
                                    id: subject.id,
                                },
                            },
                            test_rating: review.test_rating,
                            project_rating: review.project_rating,
                            teacher_rating: review.teacher_rating,
                            effort_rating: review.effort_rating,
                            presence_rating: review.presence_rating,
                            overall_rating: Number(review.overall_rating),
                            comment: review.comment,
                        },
                        
                    });
                    const subjectReviews = await prisma.review.aggregate({
                        where: {
                            subject_id: subject.id,
                        },
                        _avg: {
                            overall_rating: true,
                        }
                    });
                    await prisma.subject.update({
                        where: {
                            id: subject.id,
                        },
                        data: {
                            overall_rating: subjectReviews._avg.overall_rating,
                            test_rating: review.test_rating,
                            project_rating: review.project_rating,
                            teacher_rating: review.teacher_rating,
                            effort_rating: review.effort_rating,
                            presence_rating: review.presence_rating,
                        },
                    });
                
                }
                else {
                    await prisma.review.create({
                        data: {
                            user: {
                                create: {
                                    name: review.username,
                                    email: review.username + "x@prisma.io",
                                    password: encryptedPassword,
                                    username: review.username,
                                    course: "Ciencia da Computacao",
                                    semester: 1,

                                },
                            },
                            subject: {
                                connect: {
                                    id: subject.id,
                                },
                            },
                            test_rating: review.test_rating,
                            project_rating: review.project_rating,
                            teacher_rating: review.teacher_rating,
                            effort_rating: review.effort_rating,
                            presence_rating: review.presence_rating,
                            overall_rating: Number(review.overall_rating),
                            comment: review.comment,
                        },
                    });
                    const subjectReviews = await prisma.review.aggregate({
                        where: {
                            subject_id: subject.id,
                        },
                        _avg: {
                            overall_rating: true,
                        }
                    });
                    await prisma.subject.update({
                        where: {
                            id: subject.id,
                        },
                        data: {
                            overall_rating: subjectReviews._avg.overall_rating,
                            test_rating: review.test_rating,
                            project_rating: review.project_rating,
                            teacher_rating: review.teacher_rating,
                            effort_rating: review.effort_rating,
                            presence_rating: review.presence_rating,
                        },
                    });
                }
            }
        }
        );



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