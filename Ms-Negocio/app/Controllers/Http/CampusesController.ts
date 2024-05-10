import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Campus from "App/Models/Campus";
import CampusValidator from 'App/Validators/CampusValidator';

export default class CampusesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCampus:Campus=await Campus.findOrFail(params.id);
            await theCampus.load("city")
            return theCampus;
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
        // const body = request.body();
        const body = await request.validate(CampusValidator)
        const theCampus: Campus = await Campus.create(body);
        return theCampus;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCampus: Campus = await Campus.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(CampusValidator)
        theCampus.campus_name = body.campus_name;
        theCampus.campus_is_active = body.campus_is_active;
        theCampus.city_id = body.city_id;
        return theCampus.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCampus: Campus = await Campus.findOrFail(params.id);
        await theCampus.load("halls")
        if (theCampus.halls) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated halls"}
        } else {
            response.status(204);
            return theCampus.delete();
        }
    }
}
