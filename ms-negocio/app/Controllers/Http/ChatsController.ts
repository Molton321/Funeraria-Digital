import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Chat from "App/Models/Chat";
import ChatValidator from 'App/Validators/ChatValidator';

export default class ChatsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let chat = await Chat.findOrFail(params.id);
            await chat?.load("userChats", async actualScreening=>{
                await actualScreening?.preload("messages")
            })
            return chat;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Chat.query().paginate(page, perPage)
            } else {
                return await Chat.query()
            }
        }
    }

    public async findByServiceExecution({ params }: HttpContextContract) {
        return await Chat.query().where("service_execution_id", params.service_execution_id)
    }

    public async create({ request }: HttpContextContract) {
        // const body = request.body();
        const body = await request.validate(ChatValidator)
        const theChat: Chat = await Chat.create(body);
        return theChat;
    }

    public async update({ params, request }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        // const body = request.body();
        const body = await request.validate(ChatValidator)
        theChat.chat_date = body.chat_date;
        theChat.chat_state = body.chat_state;
        theChat.service_execution_id = body.service_execution_id;
        return theChat.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theChat: Chat = await Chat.findOrFail(params.id);
        await theChat?.load("userChats")
        if (theChat.userChats.length > 0) {
            response.status(400);
            return { "message": "Cannot be deleted because it has associated userChats"}
        } else {
            response.status(204);
            return theChat.delete();
        }
    }
}
