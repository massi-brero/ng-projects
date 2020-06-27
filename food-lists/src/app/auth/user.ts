export class User {
    constructor(
        public email: string,
        public id: string,
        private $token: string,
        public $tokenExpiration: Date
    ) {}

    get token() {
        if (!this.$tokenExpiration || new Date() > this.$tokenExpiration) {
            return null;
        }

        return this.$token;
    }
}
