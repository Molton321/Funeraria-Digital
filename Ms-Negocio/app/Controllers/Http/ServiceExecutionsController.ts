import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ServiceExecution from 'App/Models/ServiceExecution'

export default class ServiceExecutionExecutionsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return ServiceExecution.findOrFail(params.id)
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await ServiceExecution.query().paginate(page, perPage)
            } else {
                return await ServiceExecution.query()
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await ServiceExecution.query().where('service_id', params.service_id)
    }

    public async findByClient({ params }: HttpContextContract) {
        return await ServiceExecution.query().where('client_id', params.client_id)
    }

    public async create({ request }: HttpContextContract) {
        const body = request.body()
        const theServiceExecution: ServiceExecution = await ServiceExecution.create(body)
        return theServiceExecution
    }

    public async update({ params, request }: HttpContextContract) {
        const theServiceExecution: ServiceExecution = await ServiceExecution.findOrFail(params.id)
        const body = request.body()
        theServiceExecution.service_execution_execution_date = body.service_execution_execution_date;
        theServiceExecution.service_execution_status = body.service_execution_status;
        theServiceExecution.service_execution_description = body.service_execution_description;
        theServiceExecution.service_execution_observation = body.service_execution_observation;
        theServiceExecution.service_id = body.service_id;
        theServiceExecution.client_id = body.client_id;
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
