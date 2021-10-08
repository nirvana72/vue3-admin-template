import type { Directive, DirectiveBinding } from 'vue'
import { useSessionStore } from '@/store/modules/session'

const directive: Directive = {
  mounted(el: Element, binding: DirectiveBinding<string>) {
    const { getRole: role, getAuths: auths } = useSessionStore()
    if (role.id === 'admin') return

    let value = binding.value
    if (!value) return

    if (value.startsWith('@')) {
      value = value.substr(1)
      return value === role.id
    }

    const hasPermission = auths.includes(value)
    if (!hasPermission) {
      el.parentNode?.removeChild(el)
    }
  },
}

export default directive
