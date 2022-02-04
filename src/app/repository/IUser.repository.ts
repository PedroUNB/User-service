import { ICreateUser, IUpdateUser, IUser, IUserList } from '@interfaces/IUser.interface';

export interface IUserRepository {
  createUser(createUserInput: ICreateUser): Promise<IUser>;

  getUserList(filter): Promise<IUserList>;
  getUserById(userId: string): Promise<IUser>;

  updateUser(userId: string, updateUserInput: IUpdateUser): Promise<IUser>;
  removeUser(userId: string): Promise<IUser>;
}
