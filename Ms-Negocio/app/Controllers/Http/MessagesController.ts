import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Message from 'App/Models/Message';
import axios from 'axios'
import env from '@ioc:Adonis/Core/Env'

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

    public async findByChat({ params }: HttpContextContract) {
        return await Message.query().where('chat_id', params.chat_id)
    }

    public async findByUser({ params }: HttpContextContract) {
        return await Message.query().where('user_id', params.user_id)
    }

    public async findByChatAndUser({ params }: HttpContextContract) {
        return await Message.query().where('chat_id', params.chat_id).where('user_id', params.user_id)
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

    public async fetchMessageDataUsers(messageQuery: Promise<Message[]>): Promise<any[]> {
        let auxMessages: any[] = [];
        let originalMessages: Message[] = await messageQuery;

        for (let message of originalMessages) {
            let api_response = await axios.get(`${env.get('MS_SECURITY')}/api/users/${message.user_id}`);
            let data = {
                "id": message.id,
                "message_date": message.message_date,
                "message_text": message.message_text,
                "chat_id": message.chat_id,
                "user_id": message.user_id,
                "user": api_response.data.name
            };
            auxMessages.push(data);
        }

        return auxMessages;
    }

    public async fetchMessageDataUser(messageQuery: Promise<Message>): Promise<any> {
        let originalMessage: Message = await messageQuery
        let api_response = await axios.get(`${env.get('MS_SECURITY')}/api/users/${originalMessage.user_id}`)
        let data = {
            "id": originalMessage.id,
            "message_date": originalMessage.message_date,
            "message_text": originalMessage.message_text,
            "chat_id": originalMessage.chat_id,
            "user_id": originalMessage.user_id,
            "user": api_response.data.name
        }
        return data
    }
}
