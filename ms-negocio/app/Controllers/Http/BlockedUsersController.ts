import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlockedUser from 'App/Models/BlockedUser';

export default class BlockedUsersController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return BlockedUser.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await BlockedUser.query().paginate(page, perPage)
            } else {
                return await BlockedUser.query()
            }
        }
    }

    public async findByChat({ params }: HttpContextContract) {
        return await BlockedUser.query().where("chat_id", params.chat_id)
    }

    public async findByUser({ params }: HttpContextContract) {
        return await BlockedUser.query().where("user_id", params.user_id)
    }

    public async findByChatAndUser({ params }: HttpContextContract) {
        return await BlockedUser.query().where("chat_id", params.chat_id).where("user_id", params.user_id)
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theBlockedUser: BlockedUser = await BlockedUser.create(body);
        return theBlockedUser;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBlockedUser: BlockedUser = await BlockedUser.findOrFail(params.id);
        const body = request.body();
        theBlockedUser.blocked_user_cause = body.bloked_user_cause;
        theBlockedUser.chat_id = body.chat_id;
        theBlockedUser.user_id = body.user_id;
        return theBlockedUser.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBlockedUser: BlockedUser = await BlockedUser.findOrFail(params.id);
        response.status(204);
        return theBlockedUser.delete();
    }

}
