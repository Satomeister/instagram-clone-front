import {
  CommentPostPayload,
  IPost,
  LikePostPayload,
  LikeCommentPayload,
  ReplyCommentPayload,
  FetchReplyCommentPayload,
  LikeReplyPayload,
  GetRepliesPayload,
  SetRepliesPayload,
  GetNewCommentsChunkPayload,
  SetNewCommentsChunkPayload,
  FetchCommentPostPayload,
} from "./state";
import { LoadingStatus } from "../../../types";

export enum PostsActionTypes {
  FETCH_GET_SELECTED_POST = "posts/GET_GET_SELECTED_POST",
  SET_GET_SELECTED_POST_ERROR = "posts/SET_GET_SELECTED_POST_ERROR",
  FETCH_GET_POSTS = "posts/FETCH_GET_POSTS",
  SET_POSTS = "posts/SET_POSTS",
  SET_FETCH_GET_POSTS_LOADING_STATUS = "posts/SET_FETCH_GET_POSTS_LOADING_STATUS",
  SET_SELECTED_POST = "posts/SET_SELECTED_POST",
  SET_FETCH_GET_SELECTED_POST_LOADING_STATUS = "posts/SET_FETCH_GET_SELECTED_POST_LOADING_STATUS",
  FETCH_LIKE_POST = "posts/FETCH_LIKE_POST",
  FETCH_UNLIKE_POST = "posts/FETCH_UNLIKE_POST",
  LIKE_POST = "posts/LIKE_POST",
  UNLIKE_POST = "posts/UNLIKE_POST",
  FETCH_COMMENT_POST = "posts/FETCH_COMMENT_POST",
  COMMENT_POST = "posts/COMMENT_POST",
  SET_FETCH_COMMENT_POST_LOADING_STATUS = "posts/SET_FETCH_COMMENT_POST_LOADING_STATUS",
  FETCH_LIKE_COMMENT = "posts/FETCH_LIKE_COMMENT",
  LIKE_COMMENT = "posts/LIKE_COMMENT",
  FETCH_UNLIKE_COMMENT = "posts/FETCH_UNLIKE_COMMENT",
  UNLIKE_COMMENT = "posts/UNLIKE_COMMENT",
  FETCH_GET_REPLIES = "posts/FETCH_GET_REPLIES",
  SET_REPLIES = "posts/SET_REPLIES",
  FETCH_REPLY_COMMENT = "posts/FETCH_REPLY_COMMENT",
  SET_FETCH_REPLY_COMMENT_LOADING_STATUS = "posts/SET_FETCH_REPLY_COMMENT_LOADING_STATUS",
  REPLY_COMMENT = "posts/REPLY_COMMENT",
  FETCH_LIKE_REPLY = "posts/FETCH_LIKE_REPLY",
  LIKE_REPLY = "posts/LIKE_REPLY",
  FETCH_UNLIKE_REPLY = "posts/FETCH_UNLIKE_REPLY",
  UNLIKE_REPLY = "posts/UNLIKE_REPLY",
  FETCH_GET_NEW_COMMENTS_CHUNK = "posts/FETCH_GET_NEW_COMMENTS_CHUNK",
  SET_NEW_COMMENTS_CHUNK = "posts/SET_NEW_COMMENTS_CHUNK",
  SET_FETCH_GET_NEW_COMMENTS_CHUNK_LOADING_STATUS = "posts/SET_FETCH_GET_NEW_COMMENTS_CHUNK_LOADING_STATUS",
}

export interface FetchGetSelectedPostAction {
  type: PostsActionTypes.FETCH_GET_SELECTED_POST;
  payload: string;
}

export interface SetSelectedPostAction {
  type: PostsActionTypes.SET_SELECTED_POST;
  payload: IPost;
}

export interface SetGetSelectedPostErrorAction {
  type: PostsActionTypes.SET_GET_SELECTED_POST_ERROR;
  payload: string;
}

export interface SetFetchGetSelectedPostLoadingStatusAction {
  type: PostsActionTypes.SET_FETCH_GET_SELECTED_POST_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchGetPostsAction {
  type: PostsActionTypes.FETCH_GET_POSTS;
}

export interface SetPostsAction {
  type: PostsActionTypes.SET_POSTS;
  payload: IPost[];
}

export interface SetFetchGetPostsLoadingStatusAction {
  type: PostsActionTypes.SET_FETCH_GET_POSTS_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchLikePostAction {
  type: PostsActionTypes.FETCH_LIKE_POST;
  payload: string;
}

export interface FetchUnLikePostAction {
  type: PostsActionTypes.FETCH_UNLIKE_POST;
  payload: string;
}

export interface LikePostAction {
  type: PostsActionTypes.LIKE_POST;
  payload: LikePostPayload;
}

export interface UnLikePostAction {
  type: PostsActionTypes.UNLIKE_POST;
  payload: LikePostPayload;
}

export interface FetchGetNewCommentsChunkAction {
  type: PostsActionTypes.FETCH_GET_NEW_COMMENTS_CHUNK;
  payload: GetNewCommentsChunkPayload;
}

export interface SetNewCommentsChunkAction {
  type: PostsActionTypes.SET_NEW_COMMENTS_CHUNK;
  payload: SetNewCommentsChunkPayload;
}

export interface SetFetchGetNewCommentsChunkLoadingStatusAction {
  type: PostsActionTypes.SET_FETCH_GET_NEW_COMMENTS_CHUNK_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchCommentPostAction {
  type: PostsActionTypes.FETCH_COMMENT_POST;
  payload: FetchCommentPostPayload;
}

export interface CommentPostAction {
  type: PostsActionTypes.COMMENT_POST;
  payload: CommentPostPayload;
}

export interface SetFetchCommentLoadingStatusAction {
  type: PostsActionTypes.SET_FETCH_COMMENT_POST_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface FetchLikeCommentAction {
  type: PostsActionTypes.FETCH_LIKE_COMMENT;
  payload: LikeCommentPayload;
}

export interface LikeCommentAction {
  type: PostsActionTypes.LIKE_COMMENT;
  payload: LikeCommentPayload;
}

export interface FetchUnLikeCommentAction {
  type: PostsActionTypes.FETCH_UNLIKE_COMMENT;
  payload: LikeCommentPayload;
}

export interface UnLikeCommentAction {
  type: PostsActionTypes.UNLIKE_COMMENT;
  payload: LikeCommentPayload;
}

export interface FetchGetRepliesAction {
  type: PostsActionTypes.FETCH_GET_REPLIES;
  payload: GetRepliesPayload;
}

export interface SetRepliesAction {
  type: PostsActionTypes.SET_REPLIES;
  payload: SetRepliesPayload;
}

export interface FetchReplyCommentAction {
  type: PostsActionTypes.FETCH_REPLY_COMMENT;
  payload: FetchReplyCommentPayload;
}

export interface SetFetchReplyCommentLoadingStatusAction {
  type: PostsActionTypes.SET_FETCH_REPLY_COMMENT_LOADING_STATUS;
  payload: LoadingStatus;
}

export interface ReplyCommentAction {
  type: PostsActionTypes.REPLY_COMMENT;
  payload: ReplyCommentPayload;
}

export interface FetchLikeReplyAction {
  type: PostsActionTypes.FETCH_LIKE_REPLY;
  payload: LikeReplyPayload;
}

export interface LikeReplyAction {
  type: PostsActionTypes.LIKE_REPLY;
  payload: LikeReplyPayload;
}

export interface FetchUnLikeReplyAction {
  type: PostsActionTypes.FETCH_UNLIKE_REPLY;
  payload: LikeReplyPayload;
}

export interface UnLikeReplyAction {
  type: PostsActionTypes.UNLIKE_REPLY;
  payload: LikeReplyPayload;
}

export type PostsActions =
  | FetchGetSelectedPostAction
  | SetSelectedPostAction
  | SetGetSelectedPostErrorAction
  | SetFetchGetSelectedPostLoadingStatusAction
  | FetchGetPostsAction
  | SetPostsAction
  | SetFetchGetPostsLoadingStatusAction
  | FetchLikePostAction
  | LikePostAction
  | FetchUnLikePostAction
  | UnLikePostAction
  | FetchGetNewCommentsChunkAction
  | SetNewCommentsChunkAction
  | SetFetchGetNewCommentsChunkLoadingStatusAction
  | FetchCommentPostAction
  | CommentPostAction
  | SetFetchCommentLoadingStatusAction
  | FetchLikeCommentAction
  | LikeCommentAction
  | FetchUnLikeCommentAction
  | UnLikeCommentAction
  | FetchReplyCommentAction
  | FetchGetRepliesAction
  | SetRepliesAction
  | ReplyCommentAction
  | SetFetchReplyCommentLoadingStatusAction
  | FetchLikeReplyAction
  | LikeReplyAction
  | FetchUnLikeReplyAction
  | UnLikeReplyAction;
