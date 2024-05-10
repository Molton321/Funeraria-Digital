import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return Message.findOrFail(params.id);
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Message.query().paginate(page, perPage)
            } else {
                return await Message.query()
            }
        }
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(MessageValidator)
        const theMessage: Message = await Message.create(body);
        return theMessage;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(MessageValidator)
        theMessage.message_date = body.message_date;
        theMessage.message_text = body.message_text;
        theMessage.chat_id = body.chat_id;
        return theMessage.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        response.status(204);
        return theMessage.delete();
    }
    
}
