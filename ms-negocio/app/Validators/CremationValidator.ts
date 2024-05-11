import { schema, CustomMessages,rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CremationValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
      id : schema.number([rules.unique({ table: 'cremations', column: 'id' , where:{id: this.ctx.request.input('id')}})]),
      cremation_date: schema.date({format: "yyyy-MM-dd"},[rules.afterOrEqual('today')]),
      service_id: schema.number([
        rules.exists({ table: 'services', column: 'id' }),
        rules.unique({ table: 'moves', column: 'service_id' , where:{service_id: this.ctx.request.input('service_id')}}),
        rules.unique({ table: 'burials', column: 'service_id' , where:{service_id: this.ctx.request.input('service_id')}})

      ])
  })


  public messages: CustomMessages = {
    'cremation_date.required': 'Cremation date es obligatorio',
    'cremation_date.date': 'Cremation date debe ser una fecha válida',
    'cremation_date.afterOrEqual': 'Cremation date debe ser igual o posterior a la fecha actual',
    'service_id.required': 'Service id es obligatorio',
    'service_id.exists': 'Service id no existe en la tabla services',
    'id.unique': 'Cremation id ya existe en la tabla cremations',
    'service_id.unique': 'El servicio ya tiene otro tipo de servicio asociado',
  }
}
