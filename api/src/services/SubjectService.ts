// Service class for the Subject entity. Here we define the methods that will be used in the SubjectController
import { QueryError } from "../../src/error";
import { SubjectRepository } from "./SubjectRepository";

class SubjectServiceClass {

    // Create a new subject
    async create(teacher_name: string, body: {id:string; name: string, syllabus: string, mode: string, semester: string, workload: string, date: string, time: string }) {
        const alreadyExists = await SubjectRepository.alreadyExists(teacher_name, body);

        if (alreadyExists) {
            throw new QueryError("Subject already exists");
        }

        const teacher = await SubjectRepository.teacher(teacher_name);

        let newSubject;

        if (!teacher) {
            const newSubject = await SubjectRepository.create({...body, semester: Number(body.semester), workload: Number(body.workload)})
        }
        else {
            newSubject = await SubjectRepository.connect({...body, semester: Number(body.semester), workload: Number(body.workload)});
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
        const user = await SubjectRepository.canUserReviewSubject(id, userId);

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
        const updateSubject = await SubjectRepository.updateSubject(id, {test_ratings: test_ratings[0].test_rating, project_ratings: project_ratings[0].project_rating, teacher_ratings: teacher_ratings[0].teacher_rating, presence_ratings: presence_ratings[0].presence_rating, effort_ratings: effort_ratings[0].effort_rating});
    }

    // Get avg rating for subject
    async calculateAvgRating(id: string) {
        const average = await SubjectRepository.calculateAvgRating(id, {overall_rating: true});

        const updateSubject = await SubjectRepository.update(id, {overall_rating: average._avg.overall_rating ?? 0});
    }

    // Get the ratings for a subject
    async getRatings(id: string) {
        const subject = await SubjectRepository.getRatings(id, {overall_rating: true, test_ratings: true, project_ratings: true, teacher_ratings: true, presence_ratings: true, effort_ratings: true});

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject;
    }

    // Add a review to a subject -> will receive the ID of the subject, the name of the user and the review data
    async addReview(id: string, userId: string, body: {presence_rating: string, teacher_rating: string, project_rating: string, test_rating: string, effort_rating: string, overall_rating: number, comment: string}) {
        const user = await SubjectRepository.addReview(id, userId);

        if (!user) {
            throw new QueryError("User not found");
        }

        const subject = await SubjectRepository.addReview2(id);

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        if (!["SIM", "NAO"].includes(body.presence_rating)) {
            throw new Error("Invalid presence rating");
        }

        if (!["RUIM", "MEDIA", "BOA", "OTIMA"].includes(body.teacher_rating)) {
            throw new Error("Invalid teacher rating");
        }

        if (!["FACIL", "MEDIO", "DIFICIL"].includes(body.project_rating)) {
            throw new Error("Invalid project rating");
        }

        if (!["FACIL", "MEDIO", "DIFICIL"].includes(body.test_rating)) {
            throw new Error("Invalid test rating");
        }

        if (!["POUCO", "MEDIO", "MUITO"].includes(body.effort_rating)) {
            throw new Error("Invalid effort rating");
        }

        if (body.overall_rating < 1 || body.overall_rating > 5) {
            throw new Error("Invalid overall rating");
        }

        const review = await SubjectRepository.createReview(id, userId, body);

        const updateReview = await SubjectRepository.updateSubject2(id, review.id, {test_rating: true, project_rating: true, teacher_rating: true, effort_rating: true, presence_rating: true, overall_rating: true, comment: true, user: { select: { username: true } }});

        this.calculateMostCommonRating(id);
        this.calculateAvgRating(id);
    }
}

export const SubjectService = new SubjectServiceClass();