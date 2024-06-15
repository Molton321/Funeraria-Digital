import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserChat from 'App/Models/UserChat'
import UserChatValidator from 'App/Validators/UserChatValidator'
import axios from 'axios'
import env from '@ioc:Adonis/Core/Env'

export default class UserChatsController {
  public async find({ request, params }: HttpContextContract) {
    if (params.id) {
      // return UserChat.findOrFail(params.id)
      return await this.fetchUserChatDataUser(UserChat.findOrFail(params.id))
    } else {
      const data = request.all()
      if ('page' in data && 'per_page' in data) {
        const page = request.input('page', 1)
        const perPage = request.input('per_page', 20)
        // return await UserChat.query().paginate(page, perPage)
        return await this.fetchUserChatDataUsers(UserChat.query().paginate(page, perPage))
      } else {
        // return await UserChat.query()
        return await this.fetchUserChatDataUsers(UserChat.query())
      }
    }
  }
  
  public async findByUser({ params }: HttpContextContract) {
    return await UserChat.query().preload('messages').where("user_id", params.user_id)
  }

  public async findByChat({ params }: HttpContextContract) {
    return await UserChat.query().preload('messages').where("chat_id", params.chat_id)
  }

  public async findByChatAndUser({ params }: HttpContextContract) {
    return await UserChat.query().preload('messages').where("chat_id", params.chat_id).where("user_id", params.user_id)
  }

  public async create({ request }: HttpContextContract) {
    // const body = request.body()
    const body = await request.validate(UserChatValidator)
    const theUserChat: UserChat = await UserChat.create(body)
    return theUserChat
  }

  public async update({ params, request }: HttpContextContract) {
    const theUserChat: UserChat = await UserChat.findOrFail(params.id)
    // const body = request.body()
    const body = await request.validate(UserChatValidator)
    theUserChat.user_chat_state = body.user_chat_state
    theUserChat.user_id = body.user_id
    theUserChat.chat_id = body.chat_id
    return theUserChat.save()
  }

  public async delete({ params, response }: HttpContextContract) {
    const theUserChat: UserChat = await UserChat.findOrFail(params.id)
    await theUserChat?.load("messages")
    if (theUserChat.messages) {
      response.status(400);
      return { "message": "Cannot be deleted because it has associated messages"}
    } else {
        response.status(204)
        return theUserChat.delete()
    }
  }

  public async fetchUserChatDataUsers(UserChatQuery: Promise<UserChat[]>): Promise<any[]> {
    let auxUserChats: any[] = [];
    let originalUserChats: UserChat[] = await UserChatQuery;

    for (let UserChat of originalUserChats) {
        let api_response = await axios.get(`${env.get('MS_SECURITY_URL')}/api/users/${UserChat.user_id}`);
        let data = {
            "id": UserChat.id,
            "user_chat_state": UserChat.user_chat_state,
            "user_id": UserChat.user_id,
            "user": api_response.data.name,
            "email": api_response.data.email
        };
        auxUserChats.push(data);
    }

    return auxUserChats;
  }

  public async fetchUserChatDataUser(UserChatQuery: Promise<UserChat>): Promise<any> {
    let originalUserChat: UserChat = await UserChatQuery
    originalUserChat?.load('messages')
    let api_response = await axios.get(`${env.get('MS_SECURITY_URL')}/api/users/${originalUserChat.user_id}`)
    let data = {
      "id": originalUserChat.id,
      "user_chat_state": originalUserChat.user_chat_state,
      "user_id": originalUserChat.user_id,
      "user": api_response.data.name,
      "email": api_response.data.email,
      "messages": originalUserChat.messages
    }
    return data
  }
 
}
