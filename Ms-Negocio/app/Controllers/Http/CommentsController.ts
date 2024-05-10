import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Comment from "App/Models/Comment";

export default class CommentsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Comment.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Comment.query().paginate(page, perPage)
            } else {
                return await Comment.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theComment: Comment = await Comment.create(body);
        return theComment;
    }

    public async update({ params, request }: HttpContextContract) {
        const theComment: Comment = await Comment.findOrFail(params.id);
        const body = request.body();
        theComment.comment_date = body.comment_date;
        theComment.comment_text = body.comment_text;
        theComment.comment_calification = body.comment_calification;
        theComment.service_execution_id = body.service_execution_id;
        return theComment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theComment: Comment = await Comment.findOrFail(params.id);
        response.status(204);
        return theComment.delete();
    }
}
