export class AuthService {
    authenticated: boolean = false;

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated():Promise<boolean> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(this.authenticated), 200);
        });
    }

    isLoggedIn(): boolean {
        return this.authenticated;
    }

}