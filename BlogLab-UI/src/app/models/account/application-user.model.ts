export class ApplicationUser {

    constructor(
        public applicationUserId: number,
        public username: string,
        public fullnmae: string,
        public email: string,
        public token: string
       
    ){

    }
}