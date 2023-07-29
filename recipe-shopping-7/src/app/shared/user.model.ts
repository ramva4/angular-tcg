export class User {
    constructor(
        public email: string,
        public localId: string,
        private _token: string,
        private _expiry: Date) { }

    get token() {
        /* Return null in case of missing expiry or expired token */
        if (!this._expiry || this._expiry < new Date()) return null;
        return this._token;
    }
}