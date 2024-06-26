import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Move from 'App/Models/Move';
import MoveValidator from 'App/Validators/MoveValidator';

export default class MovesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let move = await Move.findOrFail(params.id);
            move.load("service");
            return move;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Move.query().preload('service').paginate(page, perPage)
            } else {
                return await Move.query().preload('service')
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await Move.query().where("service_id", params.service_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(MoveValidator)
        const theMove: Move = await Move.create(body);
        return theMove;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMove: Move = await Move.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(MoveValidator)
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
