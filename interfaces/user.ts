export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRolestype;

  createdAt?: string;
  updatedAt?: string;
}

export enum UserRoles {
  ADMIN = 'admin',
  CLIENT = 'client',
  SUPERUSER = 'superuser',
}

export type UserRolestype = `${UserRoles}`;
