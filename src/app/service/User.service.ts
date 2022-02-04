import { UserRepository } from '../repository/implementations/Psql.user.repository';
import { existsOrError, notExistsOrError } from '../helpers/validators';

export class UserService {
  private _userRepository: UserRepository;

  constructor() {
    this._userRepository = new UserRepository();
  }

  public async createUser(createUserInput) {
    return await this._userRepository.createUser(createUserInput);
  }

  public async getUserById(userId) {
    try {
      const userFromDb = await this._userRepository.getUserById(userId);
      existsOrError(userFromDb, 'User não existe!');

      return userFromDb;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getUserList(filter) {
    return await this._userRepository.getUserList(filter);
  }

  public async updateUser(userId, updateUserInput) {
    try {
      const userToBeRemoved = await this._userRepository.getUserById(userId);
      existsOrError(userToBeRemoved, 'User não existe!');

      return await this._userRepository.updateUser(userId, updateUserInput);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async removeUser(userId) {
    try {
      const userToBeRemoved = await this._userRepository.getUserById(userId);
      existsOrError(userToBeRemoved, 'User não existe!');
      notExistsOrError(userToBeRemoved.removedAt, 'User já foi removido!');

      return await this._userRepository.removeUser(userId);
    } catch (err) {
      throw new Error(err);
    }
  }
}
