import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Campus from "App/Models/Campus";

export default class CampusesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Campus.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Campus.query().paginate(page, perPage)
            } else {
                return await Campus.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCampus: Campus = await Campus.create(body);
        return theCampus;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCampus: Campus = await Campus.findOrFail(params.id);
        const body = request.body();
        theCampus.campues_location = body.Campus_location;
        return theCampus.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCampus: Campus = await Campus.findOrFail(params.id);
        response.status(204);
        return theCampus.delete();
    }
}
