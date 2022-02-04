export interface IUser {
  id?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  removedAt?: Date;
}

export interface ICreateUser {
  id?: string;
  name: string;
}

export interface IUpdateUser {
  id?: string;
  name: string;
}

export interface IUserList {
  data: IUser[];
  totalCount: number;
}
