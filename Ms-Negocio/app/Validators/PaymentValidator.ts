import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PaymentValidator {
  constructor(protected ctx: HttpContextContract) {}

 
  public schema = schema.create({
    id: schema.number([rules.unique({ table: 'payments', column: 'id', where:{id: this.ctx.request.input('id')} }), rules.range(0, 100000)]),
    payment_date:  schema.date({format: 'yyyy-MM-dd'}, [rules.beforeOrEqual('today')]),
    payment_amount: schema.number([rules.range(0, 10000000)]),
    payment_method: schema.string([rules.regex(/tarjeta|efectivo|consignacion/)]),
    subscription_id : schema.number([rules.exists({table: 'subscriptions', column:'id'})])
  })

 
  public messages: CustomMessages = {}
}
