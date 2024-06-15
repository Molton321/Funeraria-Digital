import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coffin from 'App/Models/Coffin';
import CoffinValidator from 'App/Validators/CoffinValidator';

export default class CoffinsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theCoffin:Coffin = await Coffin.findOrFail(params.id);
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

    public async update({ params, request }: HttpContextContract) {
        const theCoffin: Coffin = await Coffin.findOrFail(params.id)
        const body = await request.validate(CoffinValidator)
        theCoffin.coffin_weight = body.coffin_weight
        return theCoffin.save()
    }
    
    public async delete({ params, response }: HttpContextContract) {
        const theCoffin: Coffin = await Coffin.findOrFail(params.id)
        await theCoffin?.load("displacements")
        if(theCoffin.displacements.length>0){
            response.status(400)
            return {message:"Cannot delete coffin with displacements"}
        }else{
            response.status(204)
            return theCoffin.delete()
        }
    }
}
