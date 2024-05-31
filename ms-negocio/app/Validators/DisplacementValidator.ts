import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DisplacementValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    id : schema.number.optional(
      [
        rules.unique({ table: 'displacements', column: 'id' , where:{id: this.ctx.request.input('id')}})
      ]),
    displacement_date: schema.date(
      {format:"yyyy-MM-dd"},
      [
        rules.afterOrEqual('today')
      ]),
    displacement_id_airport : schema.number(
      [
        rules.required()
      ]),
    displacement_name_airport : schema.string.optional(),
    driver_id: schema.number(
      [
        rules.exists({ table: 'drivers', column: 'id'})
      ]),
    coffin_id: schema.number(
      [
        rules.exists({ table: 'coffins', column: 'id'})
      ]) 
  })

  public messages: CustomMessages = {}
}
