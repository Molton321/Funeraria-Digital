import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';

export default class CitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return City.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await City.query().paginate(page, perPage)
            } else {
                return await City.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCity: City = await City.create(body);
        return theCity;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        const body = request.body();
        theCity.city_location = body.city_location;
        theCity.department_id = body.department_id;
        return theCity.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        await theCity.load("campuses")
        if (theCity.campuses) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated campuses"}
        } else {
            response.status(204);
            return theCity.delete();
        }
    }
}
