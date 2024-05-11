import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MoveValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'moves', column: 'id' , where: {id: this.ctx.request.input('id')}})]),
    move_location : schema.string([rules.minLength(3), rules.maxLength(20 )]),
    move_date: schema.date({format: "yyyy-MM-dd"},[rules.afterOrEqual('today')]),
    move_type: schema.string([rules.minLength(3)]),
    service_id: schema.number([
      rules.exists({ table: 'services', column: 'id'}),
      rules.unique({ table: 'burials', column: 'service_id', where: {service_id: this.ctx.request.input('service_id') }}),
      rules.unique({ table: 'cremations', column: 'service_id', where: {service_id: this.ctx.request.input('service_id') }}),

    ]),
  })

 
  public messages: CustomMessages = {
    'move_location.required': 'Move location es obligatorio',
    'move_location.minLength': 'Move location debe tener al menos 3 caracteres',
    'move_location.maxLength': 'Move location debe tener como máximo 20 caracteres',
    'move_date.required': 'Move date es obligatorio',
    'move_date.date': 'Move date debe ser una fecha válida',
    'move_date.afterOrEqual': 'Move date debe ser igual o posterior a la fecha actual',
    'move_type.required': 'Move type es obligatorio',
    'move_type.minLength': 'Move type debe tener al menos 3 caracteres',
    'service_id.required': 'Service id es obligatorio',
    'service_id.exists': 'Service id no existe en la tabla services',
    'id.unique': 'Move id ya existe en la tabla moves',
    'service_id.unique': 'El servicio ya tiene otro tipo de servicio asociado',
  }
}
