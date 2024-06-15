import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Plan from 'App/Models/Plan';
import PlanValidator from 'App/Validators/PlanValidator';

export default class PlansController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let plan = await Plan.findOrFail(params.id)
            await plan?.load("planServices", async actualScreening=>{
              await actualScreening?.preload("service")
            })
            await plan?.load("subscriptions", async actualScreening=>{
              await actualScreening?.preload("client")
            })
            return plan
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

    public async findByService({ params }: HttpContextContract) {
        const plans = await Plan.query()
          .whereHas('planServices', (query) => {
            query.where('service_id', params.service_id);
          });
        return plans;
    }

    public async findByClient({ params }: HttpContextContract) {
        const plans = await Plan.query()
          .whereHas('subscriptions', (query) => {
            query.where('client_id', params.client_id);
          });
        return plans;
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
        thePlan.plan_beneficiaries_number = body.plan_beneficiaries_number;
        thePlan.plan_state = body.plan_state;
        return thePlan.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlan: Plan = await Plan.findOrFail(params.id);
        await thePlan.load("planServices")
        await thePlan.load("subscriptions")
        if (thePlan.planServices.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated service plans"}
        } else if (thePlan.subscriptions.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated subscriptions"}
        } else {
            response.status(204);
            return thePlan.delete();
        }
    }

}
