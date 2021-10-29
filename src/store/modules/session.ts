import { Nullable } from 'element-plus/es/utils/types'
import { defineStore } from 'pinia'

export interface IUserSession {
  userId: number
  realName: string
  avatarUrl: string
  token: string
  refToken: string
}

export interface IUserRole {
  id: string
  name: string
}

interface ISessionState {
  session: Nullable<IUserSession>
  time: string
  role: IUserRole
  auths: string[]
}

const STORE_KEY = 'app-session'

export const useSessionStore = defineStore({
  id: 'store-session',
  state: (): ISessionState => ({
    session: null,
    time: new Date().getTime().toString(),
    role: { id: 'unknow', name: 'unknow' },
    auths: [],
  }),
  getters: {
    getSession(): IUserSession {
      if (this.session === null) {
        const store = sessionStorage.getItem(STORE_KEY)
        if (store) {
          this.session = JSON.parse(store)
        } else {
          this.session = {
            userId: -1,
            realName: '',
            avatarUrl: '/avatar/unknow.png',
            token: '',
            refToken: '',
          }
        }
      }
      return this.session!
    },
    getRole(): IUserRole {
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
    setSesssion(session: IUserSession) {
      this.session = session
      this.time = new Date().getTime().toString()
      sessionStorage.setItem(STORE_KEY, JSON.stringify(session))
    },
    setAvatar(avatarUrl: string) {
      if (this.session) {
        this.session.avatarUrl = avatarUrl
        this.time = new Date().getTime().toString()
      }
    },
    setRoleAndAuths(role: IUserRole, auths: string[]) {
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
