import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class ViewingValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
      id : schema.number.optional([rules.unique({ table: 'viewings', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      viewing_entry_date: schema.date({format:"yyyy-MM-dd\'T\'HH:mm"},[rules.beforeOrEqual('today')]),
      viewing_exit_date: schema.date({format: "yyyy-MM-dd\'T\'HH:mm"},[]),
      service_id: schema.number([rules.unique({ table: 'services', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      room_id: schema.number([rules.unique({ table: 'rooms', column: 'id' , where:{id: this.ctx.request.input('id')}})])
      
  })

  
  public messages: CustomMessages = {}
}
