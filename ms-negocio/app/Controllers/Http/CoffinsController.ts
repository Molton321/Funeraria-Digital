import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coffin from 'App/Models/Coffin';
import CoffinValidator from 'App/Validators/CoffinValidator';

export default class CoffinsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCoffin:Coffin=await Coffin.findOrFail(params.id);
            await theCoffin?.load("displacements")
            return theCoffin;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Coffin.query().paginate(page, perPage)
            } else {
                return await Coffin.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CoffinValidator)
        const theCoffin: Coffin = await Coffin.create(body);
        return theCoffin;
    }
}
