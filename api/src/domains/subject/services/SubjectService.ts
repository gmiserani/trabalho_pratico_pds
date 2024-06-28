// Service class for the Subject entity. Here we define the methods that will be used in the SubjectController
import { QueryError } from "../../../middlewares/error";
import { SubjectRepository } from "../repositories/SubjectRepository";

class SubjectServiceClass {

    // Create a new subject
    async create(teacher_name: string, body: { id: string; name: string, syllabus: string, mode: string, semester: string, workload: string, date: string, time: string }) {
        const alreadyExists = await SubjectRepository.alreadyExists(body.name);

        if (alreadyExists) {
            throw new QueryError("Subject already exists");
        }

        const teacher = await SubjectRepository.teacher(teacher_name);

        let newSubject;

        if (!teacher) {
            const newSubject = await SubjectRepository.create({ ...body, teacher: { create: { id: "teacher_id", name: teacher_name } }, semester: Number(body.semester), workload: Number(body.workload) });
        }
        else {
            const newSubject = await SubjectRepository.connect({ ...body, teacher: { connect: { id: "teacher_id", name: teacher_name } }, semester: Number(body.semester), workload: Number(body.workload) });
        }
        return newSubject;
    }

    // Get a subject by its ID
    async getById(id: string) {
        const subject = await SubjectRepository.getById(id);

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject;
    }

    // Get all subjects, but only the name
    async getAllSummaryNormalOrder() {
        const subjects = await SubjectRepository.getAllSummaryNormalOrder();

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    // Get all subjects, but ordered by the overall rating
    async getAllSummaryRatingOrderDesc() {
        const subjects = await SubjectRepository.getAllSummaryRatingOrderDesc();

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    // Get all subjects, but ordered by the overall rating
    async getAllSummaryRatingOrderAsc() {
        const subjects = await SubjectRepository.getAllSummaryRatingOrderAsc();

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    // Check if a user can review a subject (if the user has already reviewed the subject, he can't review it again)
    async canUserReviewSubject(id: string, userId: string) {
        const user = await SubjectRepository.canUserReviewSubject(userId);

        if (!user) {
            throw new QueryError("User not found");
        }

        const review = await SubjectRepository.canUserReviewSubject2(id, userId);

        if (review) {
            return false;
        }

        return true;
    }

    // Get the reviews for a subject
    async getReviews(id: string) {
        const subject = await SubjectRepository.getReviews(id);

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject.reviews;
    }

    // Get most common ratings for a subject
    async calculateMostCommonRating(id: string) {
        const test_ratings = await SubjectRepository.getTestRatings(id);

        const project_ratings = await SubjectRepository.getProjectRatings(id);

        const teacher_ratings = await SubjectRepository.getTeacherRatings(id);

        const presence_ratings = await SubjectRepository.getPresenceRatings(id);

        const effort_ratings = await SubjectRepository.getEffortRatings(id);
        await SubjectRepository.updateSubject(id, { test_rating: test_ratings[0].test_rating, project_rating: project_ratings[0].project_rating, teacher_rating: teacher_ratings[0].teacher_rating, presence_rating: presence_ratings[0].presence_rating, effort_rating: effort_ratings[0].effort_rating });
    }

    // Get avg rating for subject
    async calculateAvgRating(id: string) {
        const average = await SubjectRepository.calculateAvgRating(id);

        await SubjectRepository.update(id, { overall_rating: average._avg?.overall_rating ?? 0 });
    }

    // Get the ratings for a subject
    async getRatings(id: string) {
        const subject = await SubjectRepository.getRatings(id);

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject;
    }

    // Add a review to a subject -> will receive the ID of the subject, the name of the user and the review data
    async addReview(id: string, userId: string, body: { presence_rating: string, teacher_rating: string, project_rating: string, test_rating: string, effort_rating: string, overall_rating: string, comment: string }) {
        const user = await SubjectRepository.addReview(userId);

        if (!user) {
            throw new QueryError("User not found");
        }

        const subject = await SubjectRepository.addSubject(id);

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        if (!["SIM", "NAO"].includes(body.presence_rating)) {
            throw new Error("Invalid presence rating");
        }
        if (!["RUIM", "MEDIA", "BOA", "OTIMA"].includes(body.teacher_rating)) {
            throw new Error("Invalid teacher rating");
        }
        if (!["FACIL", "MEDIOS", "DIFICIL"].includes(body.project_rating)) {
            throw new Error("Invalid project rating");
        }
        if (!["FACIL", "MEDIAS", "DIFICIL"].includes(body.test_rating)) {
            throw new Error("Invalid test rating");
        }
        if (!["POUCO", "MEDIO", "MUITO"].includes(body.effort_rating)) {
            throw new Error("Invalid effort rating");
        }
        if (Number(body.overall_rating) < 1 || Number(body.overall_rating) > 5) {
            throw new Error("Invalid overall rating");
        }


        const review = await SubjectRepository.createReview({ ...body, overall_rating: Number(body.overall_rating), user: { connect: { id: user.id } }, subject: { connect: { id: id } } });

        await SubjectRepository.updateSubject2(id, review.id);

        this.calculateMostCommonRating(id);
        this.calculateAvgRating(id);
    }
}

export const SubjectService = new SubjectServiceClass();