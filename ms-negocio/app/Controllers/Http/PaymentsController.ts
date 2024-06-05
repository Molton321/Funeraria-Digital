import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Payment from 'App/Models/Payment';
import PaymentValidator from 'App/Validators/PaymentValidator';

export default class PaymentsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Payment.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Payment.query().paginate(page, perPage)
            } else {
                return await Payment.query()
            }
        }
    }

    public async findBySubscription({ params }: HttpContextContract) {
        return await Payment.query().where("subscription_id", params.subscription_id)
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
