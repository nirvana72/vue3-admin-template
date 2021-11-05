import type { Directive, DirectiveBinding } from 'vue'
import { useSessionStore } from '@/store/modules/session'

export function hasAuth(val?: string): boolean {
  const { getRole: role, getAuths: auths } = useSessionStore()

  if (!val) return true

  if (role.id === 'admin') return true

  if (val.startsWith('role:')) {
    const roleId = val.substr(5)
    return roleId === role.id
  }

  if (val.startsWith('auth:')) {
    const auth = val.substr(5)
    return auths.includes(auth)
  }

  return false
}

const directive: Directive = {
  mounted(el: Element, binding: DirectiveBinding<string>) {
    if (false === hasAuth(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

export default directive
