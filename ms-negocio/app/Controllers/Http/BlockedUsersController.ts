import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlokedUser from 'App/Models/BlokedUser';

export default class BlockedUsersController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return BlokedUser.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await BlokedUser.query().paginate(page, perPage)
            } else {
                return await BlokedUser.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theBlokedUser: BlokedUser = await BlokedUser.create(body);
        return theBlokedUser;
    }

    public async update({ params, request }: HttpContextContract) {
        const theBlokedUser: BlokedUser = await BlokedUser.findOrFail(params.id);
        const body = request.body();
        theBlokedUser.bloked_user_cause = body.bloked_user_cause;
        theBlokedUser.chat_id = body.chat_id;
        theBlokedUser.user_id = body.user_id;
        return theBlokedUser.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theBlokedUser: BlokedUser = await BlokedUser.findOrFail(params.id);
        response.status(204);
        return theBlokedUser.delete();
    }

}
