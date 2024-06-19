import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';
import PaymentValidator from 'App/Validators/PaymentValidator';

export default class PaymentsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let thePayment:Payment = await Payment.findOrFail(params.id);
            await thePayment?.load("subscription")
            return thePayment;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Payment.query().preload('subscription').paginate(page, perPage)
            } else {
                return await Payment.query().preload('subscription')
            }
        }
    }

    public async findBySubscription({ params }: HttpContextContract) {
        return await Payment.query().where("subscription_id", params.subscription_id)
    }

    public async findByClient({ params }: HttpContextContract) {
        return await Payment.query().whereHas("subscription", (query) => {
            query.where("client_id", params.client_id)
        })
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(PaymentValidator)
        const thePayment: Payment = await Payment.create(body);
        return thePayment;
    }

    public async update({ params, request }: HttpContextContract) {
        const thePayment: Payment = await Payment.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(PaymentValidator)
        thePayment.payment_date = body.payment_date;
        thePayment.payment_amount = body.payment_amount;
        thePayment.payment_method = body.payment_method;
        thePayment.subscription_id = body.subscription_id;
        return thePayment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const thePayment: Payment = await Payment.findOrFail(params.id);
        response.status(204);
        return thePayment.delete();
    }

}