export class User {
    constructor(
        public email: string,
        id: string,
        private $token: string,
        private $tokenExpiration: Date
    ) {}

    get token() {
        if (!this.$tokenExpiration || new Date() > this.$tokenExpiration) {
            return null;
        }

        return this.$token;
    }
}
