import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room';
import RoomValidator from 'App/Validators/RoomValidator';

export default class RoomsController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRoom:Room = await Room.findOrFail(params.id);
            await theRoom.load("campus")
            return theRoom;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Room.query().preload('campus').paginate(page, perPage)
            } else {
                return await Room.query().preload('campus')
            }
        }
    }

    public async findByFuneralHome({ params }: HttpContextContract) {
        return await Room.query().where("funeral_home_id", params.funeral_home_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(RoomValidator)
        const theRoom: Room = await Room.create(body);
        return theRoom;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRoom: Room = await Room.findOrFail(params.id);
        const body = request.body();
        theRoom.room_name = body.room_name;
        theRoom.room_capacity = body.room_capacity;
        theRoom.room_state = body.room_state;
        theRoom.funeral_home_id = body.funeral_home_id;
        return theRoom.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRoom: Room = await Room.findOrFail(params.id);
        theRoom.load('viewings')
        if(theRoom.viewings.length>0){
            response.status(400)
            return {message:"Cannot delete Room with viewings"}
        }else{
            response.status(204);
            return theRoom.delete();
        }
    }

}


