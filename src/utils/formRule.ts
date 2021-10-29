import { FormItemRule } from 'element-plus/lib/components/form/src/form.type'
import { InternalRuleItem, Value } from 'async-validator/dist-types/interface'

interface IRuleOption {
  rule: string
  lbl?: string
  rex?: RegExp
}

function is_array(rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) {
  if (value instanceof Array) {
    if (rule.required && value.length <= 0) {
      callback(rule.message?.toString())
    } else {
      callback()
    }
  } else {
    callback(rule.message?.toString())
  }
}

function is_march_rex(rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void) {
  if (rule.required === false && value === '') {
    callback()
  } else {
    const rex = rule.pattern as RegExp
    if (rex.test(value)) {
      callback()
    } else {
      callback(rule.message?.toString())
    }
  }
}

/**
  { lbl: '企业名称', rule: 'require' },
  { lbl: '小票失效天数', rule: 'number' },
  { lbl: '小票失效月数', rule: 'require|number' },
  { lbl: '联系手机号', rule: 'phone' },
  { lbl: '企业邮箱', rule: 'require|customize', rex: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ },
 */

/**
 * 创建表单验证规则
 */
export function makeRule(option: IRuleOption): FormItemRule[] {
  let required = false
  const ary = option.rule.split('|')
  if (ary.length > 1 && ary[0] === 'require') {
    required = true
    option.rule = ary[1]
  }
  if (!option.lbl) option.lbl = '该项'

  const rule: FormItemRule = {
    required,
    message: `${option.lbl}格式不正确`,
  }
  switch (option.rule) {
    case 'require':
      rule.required = true
      rule.message = `${option.lbl}不能为空`
      break
    case 'customize':
      rule.pattern = option.rex
      rule.validator = is_march_rex
      break
    case 'number':
      rule.pattern = /^[0-9]{1,10}$/
      rule.message = `${option.lbl}必须为数字`
      rule.validator = is_march_rex
      break
    case 'phone':
      rule.pattern = /^1[0-9]{10}$/
      rule.validator = is_march_rex
      break
    case 'array':
      rule.validator = is_array
      break
  }
  return [rule]
}
