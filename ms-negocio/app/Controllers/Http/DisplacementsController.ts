import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Displacement from 'App/Models/Displacement';
import axios from 'axios';
import env from '@ioc:Adonis/Core/Env'
import DisplacementValidator from 'App/Validators/DisplacementValidator';

export default class DisplacementsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theDisplacement:Displacement=await Displacement.findOrFail(params.id);
            await theDisplacement?.load("driver")
            await theDisplacement?.load("coffin")
            return theDisplacement;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Displacement.query().paginate(page, perPage)
            } else {
                return await Displacement.query()
            }
        }
    }

    public async findByDriver({ params }: HttpContextContract) {
        if (params.id) {
            return await Displacement.query().where("driver_id", params.id)
        } else {
            return await Displacement.query()
        }
    }

    public async findByCoffin({ params }: HttpContextContract) {
        if (params.id) {
            return await Displacement.query().where("coffin_id", params.id)
        } else {
            return await Displacement.query()
        }
    }

    public async findByDriverAndCoffin({ params }: HttpContextContract) {
        if (params.driver_id && params.coffin_id) {
            return await Displacement.query().where("driver_id", params.driver_id).where("coffin_id", params.coffin_id)
        } else {
            return await Displacement.query()
        }
    }

    public async create({ request }: HttpContextContract) {
        const body = await request.validate(DisplacementValidator)
        let airport = await axios.get(`${env.get('API_COLOMBIA')}Airport/${body.displacement_id_airport}`)
        body.displacement_name_airport = airport.data.name
        const theDisplacement: Displacement = await Displacement.create(body);
        return theDisplacement;
    }
}
