import { IUserRepository } from '../IUser.repository';
import { UserModel } from '@db/models/User.model';
import { User } from '../../entities/User';
import { IUpdateUser, IUser, IUserList } from '@interfaces/IUser.interface';
import { getSqlOptions } from '../../helpers/customSQL';

export class UserRepository implements IUserRepository {
  public async createUser(createUserInput: User): Promise<IUser> {
    try {
      const newUser = new User(createUserInput);
      return await UserModel.create({...newUser});
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUserById(userId: string): Promise<IUser> {
    try {
      return await UserModel.findByPk(userId);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUserList(filter): Promise<IUserList> {
    const { limit, offset, order, orientation, where, raw } = getSqlOptions.userListOptions(filter);
    try {
      const userListFromDB = await UserModel.findAndCountAll({
        limit,
        offset,
        order: [[order, orientation]],
        where,
        raw
      });

      return {
        data: userListFromDB.rows,
        totalCount: userListFromDB.count
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateUser(userId: string, updateUserInput: IUpdateUser): Promise<IUser> {
    try {
      const userToBeUpdated = await UserModel.findByPk(userId);
      userToBeUpdated.set(updateUserInput);

      return await userToBeUpdated.save();
    } catch (err) {
      throw new Error(err);
    }
  }

  public async removeUser(userId: string): Promise<IUser> {
    try {
      const userToBeRemoved = await UserModel.findByPk(userId);
      userToBeRemoved.set('removedAt', new Date());

      return await userToBeRemoved.save();
    } catch (err) {
      throw new Error(err);
    }
  }
}
