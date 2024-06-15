import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import FuneralHome from "App/Models/FuneralHome";
import FuneralHomeValidator from 'App/Validators/FuneralHomeValidator';

export default class FuneralHomeesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theFuneralHome:FuneralHome = await FuneralHome.findOrFail(params.id);
            await theFuneralHome?.load('rooms')
            return theFuneralHome;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await FuneralHome.query().preload('rooms').paginate(page, perPage)
            } else {
                return await FuneralHome.query().preload('rooms')
            }
        }
    }

    public async findByCity({ params }: HttpContextContract) {
        return await FuneralHome.query().where("city_id", params.city_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(FuneralHomeValidator)
        const theFuneralHome: FuneralHome = await FuneralHome.create(body);
        return theFuneralHome;
    }

    public async update({ params, request }: HttpContextContract) {
        const theFuneralHome: FuneralHome = await FuneralHome.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(FuneralHomeValidator)
        theFuneralHome.funeral_home_name = body.funeral_home_name;
        theFuneralHome.funeral_home_state = body.funeral_home_state;
        theFuneralHome.city_id = body.city_id;
        return theFuneralHome.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theFuneralHome: FuneralHome = await FuneralHome.findOrFail(params.id);
        await theFuneralHome.load("rooms")
        if (theFuneralHome.rooms.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated rooms"}
        } else {
            response.status(204);
            return theFuneralHome.delete();
        }
    }
}
