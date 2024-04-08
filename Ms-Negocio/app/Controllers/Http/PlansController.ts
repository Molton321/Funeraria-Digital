import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';

export default class PlansController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Plan.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Plan.query().paginate(page, perPage)
            } else {
                return await Plan.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thePlan: Plan = await Plan.create(body);
        return thePlan;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        const body = request.body();
        thePlan.plan_type = body.plan_type;
        thePlan.plan_description = body.plan_description;
        return thePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        response.status(204);
        return thePlan.delete();
    }

}