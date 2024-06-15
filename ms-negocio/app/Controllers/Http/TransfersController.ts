import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Transfer from 'App/Models/Transfer';
import TransferValidator from 'App/Validators/TransferValidator';

export default class TransfersController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let transfer = await Transfer.findOrFail(params.id);
            await transfer?.load("service");
            return transfer;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Transfer.query().preload('service').paginate(page, perPage)
            } else {
                return await Transfer.query().preload('service')
            }
        }
    }

    public async findByService({ params }: HttpContextContract) {
        return await Transfer.query().where("service_id", params.service_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(TransferValidator)
        const theTransfer: Transfer = await Transfer.create(body);
        return theTransfer;
    }

    public async update({ params, request }: HttpContextContract) {
        const theTransfer: Transfer = await Transfer.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(TransferValidator)
        theTransfer.transfer_from = body.transfer_from;
        theTransfer.transfer_to = body.transfer_to;
        theTransfer.transfer_date = body.transfer_date;
        theTransfer.service_id = body.service_id;
        return theTransfer.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theTransfer: Transfer = await Transfer.findOrFail(params.id);        
        response.status(204);
        return theTransfer.delete();
    }
}
