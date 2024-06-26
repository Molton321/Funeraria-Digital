import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cremation from 'App/Models/Cremation';
import CremationValidator from 'App/Validators/CremationValidator';

export default class CremationsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let cremation = await Cremation.findOrFail(params.id);
            cremation.load("service");
            return cremation;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Cremation.query().preload('service').paginate(page, perPage)
            } else {
                return await Cremation.query().preload('service')
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await Cremation.query().where("service_id", params.service_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(CremationValidator)
        const theCremation: Cremation = await Cremation.create(body);
        return theCremation;
    }

    public async update({ params, request }: HttpContextContract) {
        const theCremation: Cremation = await Cremation.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(CremationValidator)
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
