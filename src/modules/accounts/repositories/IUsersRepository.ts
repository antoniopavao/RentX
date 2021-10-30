import { ICreateUserDTO } from "../dtos/ICreateUsersDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
}
export { IUsersRepository };
