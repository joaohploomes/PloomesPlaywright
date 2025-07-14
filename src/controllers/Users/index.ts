import type { IUsers } from "@schemas";
import UsersService from "@services/Users";
import type { IUser } from "@types";

class UsersController {

    private user?: IUser;

    constructor(user?: IUser) {
        this.user = user;
    }

    async findAllUsers(top = 15) {
        const usersService = new UsersService(this.user);
        const response = await usersService.findAllUsers(top);
        return response;
    };

    async findUsersById(Id: number) {
        const usersService = new UsersService(this.user);
        const response = await usersService.findUserById(Id);
        return response;
    };

    async createUsers(data: IUsers) {
        const usersService = new UsersService(this.user);
        const response = await usersService.createUser(data);
        return response;
    };

    async updateUsers(user: IUsers, data: Partial<IUsers>) {
        const usersService = new UsersService(this.user);
        const response = await usersService.updateUser(user, data);
        return response;
    };

    async suspendUsers(user: IUsers) {
        const usersService = new UsersService(this.user);
        const data = {
            Suspended: true,
        };
        const response = await usersService.updateUser(user, data);
        return response;
    };
};

export default UsersController;
