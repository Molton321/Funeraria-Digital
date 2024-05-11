import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation';

export default class CremationsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Cremation.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cremation.query().paginate(page, perPage)
            } else {
                return await Cremation.query()
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await Cremation.query().where("service_id", params.service_id)
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const theCremation: Cremation = await Cremation.create(body);
        return theCremation;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        const body = request.body();
        theCremation.cremation_date = body.cremation_date;
        theCremation.service_id = body.service_id;
        return theCremation.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        response.status(204);
        return theCremation.delete();
    }

}
