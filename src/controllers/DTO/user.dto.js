export class DTOCurrentUser{
    constructor(obj){
        this.name = `${obj.first_name} ${obj.last_name}`;
        this.email = obj.email;
        this.role = obj.role;
        this.cart = obj.cart;
    }
}