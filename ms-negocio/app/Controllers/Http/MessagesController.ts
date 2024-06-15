import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import MessageValidator from 'App/Validators/MessageValidator';

export default class MessagesController {

    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            return await Message.findOrFail(params.id);
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

    public async findByUserChat({ params }: HttpContextContract) {
        return await Message.query().where("user_chat_id", params.user_chat_id)
    }

    public async findByChat({ params }: HttpContextContract) {
        const messages = await Message.query()
          .whereHas('userChat', (query) => {
            query.where('chat_id', params.chat_id);
          });
        return messages;
    }

    public async findByUser({ params }: HttpContextContract) {
        const messages = await Message.query()
          .whereHas('userChat', (query) => {
            query.where('user_id', params.user_id);
          });
        return messages;
    }

    public async findByUserAndChat({ params }: HttpContextContract) {
        const messages = await Message.query()
          .whereHas('userChat', (query) => {
            query.where('user_id', params.user_id).where('chat_id', params.chat_id);
          });
        return messages;
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(MessageValidator)
        const theMessage: Message = await Message.create(body);
        return theMessage;
    }

    public async update({ params, request }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        const body = request.body();
        theMessage.message_date = body.message_date;
        theMessage.message_text = body.message_text;
        theMessage.user_chat_id = body.user_chat_id;
        return theMessage.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theMessage: Message = await Message.findOrFail(params.id);
        response.status(204);
        return theMessage.delete();
    }

}
