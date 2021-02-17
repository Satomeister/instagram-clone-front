export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  bio: string;
  avatar: string;
  posts: [];
  followers: IShortUser[];
  following: IShortUser[];
}

export interface SignUpPayload {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface EditProfilePayload {
  email?: string;
  fullname?: string;
  username?: string;
}

export interface IShortUser {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
}