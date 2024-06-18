import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City';
import CityValidator from 'App/Validators/CityValidator';

export default class CitiesController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCity:City=await City.findOrFail(params.id);
            await theCity?.load("department")
            return theCity;
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

    public async findByDepartment({ params }: HttpContextContract) {
        return await City.query().where("department_id", params.id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(CityValidator)
        const theCity: City = await City.create(body);
        return theCity;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(CityValidator)
        theCity.city_name = body.city_name;
        theCity.department_id = body.department_id;
        return theCity.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCity: City = await City.findOrFail(params.id);
        await theCity.load("funeralHomes")
        if (theCity.funeralHomes.length > 0) {
            response.status(400);
            return { "message": "La ciudad tiene sedes asociadas. No se puede eliminar."}
        } else {
            response.status(204);
            return theCity.delete();
        }
    }
}
