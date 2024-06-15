import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Subscription from 'App/Models/Subscription'
import SubscriptionValidator from 'App/Validators/SubscriptionValidator'

export default class SubscriptionsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theSubscription:Subscription = await Subscription.findOrFail(params.id);
            await theSubscription?.load("payments")
            await theSubscription?.load("client")
            return theSubscription;
        } else {
            const data = request.all()
            if ('page' in data && 'per_page' in data) {
                const page = request.input('page', 1)
                const perPage = request.input('per_page', 20)
                return await Subscription.query().preload('client').paginate(page, perPage)
            } else {
                return await Subscription.query().preload('client')
            }
        }
    }

    public async findByClient({ params }: HttpContextContract) {
        return await Subscription.query().where("client_id", params.client_id)
    }

    public async findByPlan({ params }: HttpContextContract) {
        return await Subscription.query().where("plan_id", params.plan_id)
    }

    public async findByClientAndPlan({ params }: HttpContextContract) {
        return await Subscription.query().where("client_id", params.client_id).where("plan_id", params.plan_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body()
        const body = await request.validate(SubscriptionValidator)
        const theSubscription: Subscription = await Subscription.create(body);
        return theSubscription
    }

    public async update({ params, request }: HttpContextContract) {
        const theSubscription: Subscription = await Subscription.findOrFail(params.id)
        // const body = request.body()
        const body = await request.validate(SubscriptionValidator)
        theSubscription.subscription_start_date = body.subscription_start_date
        theSubscription.subscription_end_date = body.subscription_end_date
        theSubscription.subscription_payments_number = body.subscription_payments_number
        theSubscription.plan_id = body.plan_id
        theSubscription.client_id = body.client_id
        return theSubscription.save()
    }

    public async delete({ params, response }: HttpContextContract) {
        const theSubscription: Subscription = await Subscription.findOrFail(params.id)
        await theSubscription.load("payments")
        if (theSubscription.payments.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated payments"}
        } else {
            response.status(204);
            return theSubscription.delete();
        }
    }

}
