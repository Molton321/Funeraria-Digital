import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import ServiceValidator from 'App/Validators/ServiceValidator'

export default class ServicesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let service = await Service.findOrFail(params.id)
            service.load("move")
            service.load("burial")
            service.load("cremation")

            return service
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Service.query().preload('move').preload('cremation').preload('viewing').preload('burial').paginate(page, perPage)
            } else {
                return await Service.query().preload('move').preload('cremation').preload('viewing').preload('burial')
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body()
        const body = await request.validate(ServiceValidator)
        const theService: Service = await Service.create(body)
        return theService
    }

    public async update({ params, request }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id)
        // const body = request.body()
        const body = await request.validate(ServiceValidator)
        //theService.service_date = body.service_date
        theService.service_state = body.service_state        
        return theService.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theService: Service = await Service.findOrFail(params.id)
        await theService.load("move")
        await theService.load("burial")
        await theService.load("cremation")
        await theService.load("serviceExecutions")
        await theService.load("planServices")
        await theService.load("viewing")
        if (theService.move) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated move"}
        } else if (theService.burial) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated burial"}
        } else if (theService.cremation) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated cremation"}
        } else if (theService.serviceExecutions.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated sevice executions"}
        } else if (theService.planServices.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated service plans"}
        } else if(theService.viewing){
            response.status(400);
            return { "message": "Cannot be deleted because it has associated viewing"}
        } else {
            response.status(204);
            return theService.delete();
        }
    }

}
