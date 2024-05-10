import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hall from 'App/Models/Hall';
import HallValidator from 'App/Validators/HallValidator';

export default class HallsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theHall:Hall=await Hall.findOrFail(params.id);
            await theHall.load("campus")
            return theHall;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Hall.query().paginate(page, perPage)
            } else {
                return await Hall.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(HallValidator)
        const theHall: Hall = await Hall.create(body);
        return theHall;
    }

    public async update({ params, request }: HttpContextContract) {
        const theHall: Hall = await Hall.findOrFail(params.id);
        const body = request.body();
        theHall.hall_name = body.hall_name;
        theHall.hall_capacity = body.hall_capacity;
        theHall.hall_is_active = body.hall_is_active;
        theHall.campus_id = body.campus_id;
        return theHall.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theHall: Hall = await Hall.findOrFail(params.id);
        await theHall.load("plans")
        if (theHall.plans) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated plans"}
        } else {
            response.status(204);
            return theHall.delete();
        }
    }

}
