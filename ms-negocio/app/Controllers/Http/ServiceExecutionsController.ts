import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceExecution from 'App/Models/ServiceExecution'
import ServiceExecutionValidator from 'App/Validators/ServiceExecutionValidator'

export default class ServiceExecutionExecutionsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let serviceExecution = await ServiceExecution.findOrFail(params.id);
            await serviceExecution.load("service");
            await serviceExecution.load("client");
            await serviceExecution.load("deceased");
            await serviceExecution.load("comments");
            await serviceExecution.load("chat");
            return serviceExecution;
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await ServiceExecution.query().preload('service').preload('client').preload('deceased').preload('comments').paginate(page, perPage)
            } else {
                return await ServiceExecution.query().preload('service').preload('client').preload('deceased').preload('comments')
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await ServiceExecution.query().where('service_id', params.service_id)
    }

    public async findByClient({ params }: HttpContextContract) {
        return await ServiceExecution.query().where('client_id', params.client_id)
    }

    public async findByDeceased({ params }: HttpContextContract) {
        return await ServiceExecution.query().where('deceased_id', params.client_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body()
        const body = await request.validate(ServiceExecutionValidator)
        const theServiceExecution: ServiceExecution = await ServiceExecution.create(body)
        return theServiceExecution
    }

    public async update({ params, request }: HttpContextContract) {
        const theServiceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id)
        // const body = request.body()
        const body = await request.validate(ServiceExecutionValidator)
        theServiceExecution.service_execution_date = body.service_execution_date;
        theServiceExecution.service_id = body.service_id;
        theServiceExecution.client_id = body.client_id;
        theServiceExecution.deceased_id = body.deceased_id;
        return theServiceExecution.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theServiceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id)
        await theServiceExecution.load("comments")
        await theServiceExecution.load("chat")
        if (theServiceExecution.comments) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated comments"}
        } else if (theServiceExecution.chat) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated chat"}
        } else {
            response.status(204)
            return theServiceExecution.delete()
        }
    }
}
