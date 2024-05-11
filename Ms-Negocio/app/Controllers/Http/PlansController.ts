import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';
import PlanValidator from 'App/Validators/PlanValidator';

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
        // const body = request.body();
        const body = await request.validate(PlanValidator)
        const thePlan: Plan = await Plan.create(body);
        return thePlan;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(PlanValidator)
        thePlan.plan_type = body.plan_type;
        thePlan.plan_description = body.plan_description;
        thePlan.plan_price = body.plan_price;
        thePlan.plan_is_active = body.plan_is_active;
        return thePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        await thePlan.load("planServices")
        await thePlan.load("subscriptions")
        if (thePlan.planServices) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated service plans"}
        } else if (thePlan.subscriptions) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated subscriptions"}
        } else {
            response.status(204);
            return thePlan.delete();
        }
    }

}
