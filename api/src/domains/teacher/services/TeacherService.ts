import { QueryError } from "../../../middlewares/error";
import { TeacherRepository } from "../repositories/TeacherRepository";


class TeacherServiceClass {

    // Define the fields that will be returned when a teacher is fetched
    // selectOptions = {
    //     name: true,
    //     subjects: {
    //         select: {
    //             name: true,
    //         },
    //     },
    // };

    // Fetch a teacher by id
    async getById(id: string) {
        const teacher = await TeacherRepository.getById(id);

        if (!teacher) {
            throw new QueryError("Teacher not found");
        }

        return teacher;
    }

    // Fetch all teachers
    async getAll() {
        const teachers = await TeacherRepository.getAll();
        
        if (teachers.length === 0) {
            throw new QueryError("No teachers found");
        }
        return teachers;
    }

    // Create a new teacher
    async create(body: { name: string; subjects: { select: (name: string) => void } }) {
        const newTeacher = TeacherRepository.create({...body});

        return newTeacher;
    }

    async update(id: string, body: { name: string; subjects: { select: (name: string) => void } }) {
        const updatedTeacher = await TeacherRepository.update(id, body);
        // prisma.teacher.update({
        //     where: {
        //         id,
        //     },
        //     data: body,
        // });

        return updatedTeacher;
    }

}

// Export the service
export const TeacherService = new TeacherServiceClass();