import { IFile, IShortPost } from "../../posts/contracts/state";
import { IStory } from "../../stories/contracts/state";

export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  bio: string;
  avatar: string;
  story?: IStory;
  posts: IShortPost[];
  saved: string[];
  followers: IShortUser[];
  following: IShortUser[];
  unreadActivitiesCount: number;
}

export interface SignUpPayload {
  email: string;
  fullname: string;
  username: string;
  password: string;
}

export interface IShortUser {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  story?: IStory;
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

export interface CreatePostPayload {
  files: IFile[];
  description: string;
}

export interface UpdatePostLikesCountPayload {
  postId: string;
  value: number;
}
