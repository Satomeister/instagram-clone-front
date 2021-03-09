import { IShortUser, IUser } from "../../authUser/contracts/state";

export interface IPost {
  _id: string;
  media: IMedia[];
  description?: string;
  author: IUser | IShortUser;
  likes: string[];
  likesCount: number;
  comments: IComment[];
  commentsCount: number;
  commentsCountWithoutReplies: number;
  createdAt: Date;
}

export interface IShortPost {
  _id: string;
  media: IMedia[];
  likesCount: number;
  commentsCount: number;
}

export interface IFile {
  file: File;
  type: "image" | "video";
}

export interface IMedia {
  url: string;
  type: "image" | "video";
}

export interface IReply {
  _id: string;
  text: string;
  usernameTo: string;
  likes: string[];
  author: IShortUser;
  createdAt: Date;
}

export interface IComment {
  _id: string;
  text: string;
  author: IShortUser;
  likes: string[];
  replies: IReply[];
  repliesCount: number;
  createdAt: Date;
}

export interface ICreatePostPayload {
  files: IFile[];
  description: string;
}

export interface FetchCommentPostPayload {
  text: string;
  postId: string;
}

export interface CommentPostPayload {
  comment: IComment;
  postId: string;
}

export interface LikePostPayload {
  userId: string;
  postId: string;
}

export interface LikeCommentPayload {
  userId: string;
  postId: string;
  commentId: string;
}

export interface FetchReplyCommentPayload {
  postId: string;
  commentId: string;
  usernameTo: string;
  text: string;
}

export interface ReplyCommentPayload {
  reply: IReply;
  postId: string;
  commentId: string;
}

export interface LikeReplyPayload {
  postId: string;
  commentId: string;
  replyId: string;
  userId: string;
}

export interface GetRepliesPayload {
  postId: string;
  commentId: string;
  repliesCount: number;
}

export interface SetRepliesPayload {
  postId: string;
  commentId: string;
  replies: IReply[];
}

export interface GetNewCommentsChunkPayload {
  postId: string;
  count: number;
}

export interface SetNewCommentsChunkPayload {
  postId: string;
  comments: IComment[];
}
