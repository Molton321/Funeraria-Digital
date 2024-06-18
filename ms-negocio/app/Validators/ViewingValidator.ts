import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class ViewingValidator {
  constructor(protected ctx: HttpContextContract) {}


  public schema = schema.create({
      id : schema.number.optional([rules.unique({ table: 'viewings', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      viewing_entry_date: schema.date({format:"yyyy-MM-dd\'T\'HH:mm"},[rules.afterOrEqual('today')]),
      viewing_exit_date: schema.date({format: "yyyy-MM-dd\'T\'HH:mm"},[rules.after(this.ctx.request.input('viewing_entry_date'))]),
      service_id: schema.number([rules.exists({ table: 'services', column: 'id'}),
        rules.unique({ table: 'cremations', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), 
        rules.unique({ table: 'burials', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), 
        rules.unique({ table: 'transfers', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}}), 
        // rules.unique({ table: 'viewings', column: 'service_id' , where: {service_id: this.ctx.request.input('service_id')}})
      ]),
      room_id: schema.number([rules.unique({ table: 'rooms', column: 'id' , where:{id: this.ctx.request.input('id')}})])
  })

  
  public messages: CustomMessages = {}
}
