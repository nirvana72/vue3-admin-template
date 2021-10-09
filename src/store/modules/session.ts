import { Nullable } from 'element-plus/es/utils/types'
import { defineStore } from 'pinia'

export interface UserSession {
  userId: number
  realName: string
  avatar: string
  token: string
  refToken: string
}

export interface UserRole {
  id: string
  name: string
}

interface SessionState {
  session: Nullable<UserSession>
  time: string
  role: UserRole
  auths: string[]
}

const STORE_KEY = 'app-session'

export const useSessionStore = defineStore({
  id: 'store-session',
  state: (): SessionState => ({
    session: null,
    time: new Date().getTime().toString(),
    role: { id: 'unknow', name: 'unknow' },
    auths: [],
  }),
  getters: {
    getSession(): UserSession {
      if (this.session === null) {
        const store = sessionStorage.getItem(STORE_KEY)
        if (store) {
          this.session = JSON.parse(store)
        } else {
          this.session = {
            userId: -1,
            realName: '',
            avatar: '/avatar/unknow.png',
            token: '',
            refToken: '',
          }
        }
      }
      return this.session!
    },
    getRole(): UserRole {
      return this.role
    },
    getAuths(): string[] {
      return this.auths
    },
    getTime(): string {
      return this.time
    },
    isLogin(): boolean {
      return this.getSession.userId > 0
    },
  },
  actions: {
    setSesssion(session: UserSession) {
      this.session = session
      this.time = new Date().getTime().toString()
      sessionStorage.setItem(STORE_KEY, JSON.stringify(session))
    },
    setAvatar(avatar: string) {
      if (this.session) {
        this.session.avatar = avatar
        this.time = new Date().getTime().toString()
      }
    },
    setRoleAndAuths(role: UserRole, auths: string[]) {
      this.role = role
      this.auths = auths
    },
    updateToken(token: string, refToken: string) {
      this.getSession.token = token
      this.getSession.refToken = refToken
    },
    reset() {
      // eslint-disable-next-line no-console
      console.log('SessionStore.reset')
      this.session = null
      this.role = { id: 'unknow', name: 'unknow' }
      this.auths = []
      this.time = ''
      sessionStorage.removeItem(STORE_KEY)
    },
  },
})
