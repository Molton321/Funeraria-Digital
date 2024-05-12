import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PlanService from 'App/Models/PlanService';

export default class PlanServicesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return PlanService.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await PlanService.query().paginate(page, perPage)
            } else {
                return await PlanService.query()
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await PlanService.query().where("service_id", params.service_id)
    }

    public async findByPlan({ params }: HttpContextContract) {
        return await PlanService.query().where("plan_id", params.plan_id)
    }

    public async findByServiceAndPlan({ params }: HttpContextContract) {
        return await PlanService.query().where("service_id", params.service_id).where("plan_id", params.plan_id)
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body();
        const thePlanService: PlanService = await PlanService.create(body);
        return thePlanService;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePlanService: PlanService = await PlanService.findOrFail(params.id);
        const body = request.body();
        thePlanService.service_id = body.service_id;
        thePlanService.plan_id = body.plan_id;
        return thePlanService.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePlanService: PlanService = await PlanService.findOrFail(params.id);
        response.status(204);
        return thePlanService.delete();
    }

}
