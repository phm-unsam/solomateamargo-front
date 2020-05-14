
class SessionSerivice {
    
    createSession(user) {
        localStorage.setItem('login', JSON.stringify({ ...user, isLogged: true }))
    }

    deleteSession(){
        localStorage.clear()
    }

    getSession(){
        return JSON.parse(localStorage.getItem('login'))
    }

    getUserLoggedId(){
        if(this.getSession())
        return this.getSession().id
    }
}

export default new SessionSerivice()