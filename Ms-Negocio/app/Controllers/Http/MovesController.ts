import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Move from 'App/Models/Move';

export default class MovesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Move.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Move.query().paginate(page, perPage)
            } else {
                return await Move.query()
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await Move.query().where("service_id", params.service_id)
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theMove: Move = await Move.create(body);
        return theMove;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMove: Move = await Move.findOrFail(params.id);
        const body = request.body();
        theMove.move_location = body.move_location;
        theMove.move_date = body.move_date;
        theMove.move_type = body.move_type;
        theMove.service_id = body.service_id;
        return theMove.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMove: Move = await Move.findOrFail(params.id);
        response.status(204);
        return theMove.delete();
    }
}
