import {
  CommentPostPayload,
  FetchCommentPostPayload,
  FetchReplyCommentPayload,
  GetNewCommentsChunkPayload,
  GetRepliesPayload,
  IPost,
  LikeCommentPayload,
  LikePostPayload,
  LikeReplyPayload,
  ReplyCommentPayload,
  SetNewCommentsChunkPayload,
  SetRepliesPayload,
} from "./contracts/state";
import {
  CommentPostAction,
  FetchCommentPostAction,
  FetchGetNewCommentsChunkAction,
  FetchGetPostsAction,
  FetchGetRepliesAction,
  FetchGetSelectedPostAction,
  FetchLikeCommentAction,
  FetchLikePostAction,
  FetchLikeReplyAction,
  FetchReplyCommentAction,
  FetchUnLikeCommentAction,
  FetchUnLikePostAction,
  FetchUnLikeReplyAction,
  LikeCommentAction,
  LikePostAction,
  LikeReplyAction,
  PostsActionTypes,
  ReplyCommentAction,
  SetFetchCommentLoadingStatusAction,
  SetFetchGetNewCommentsChunkLoadingStatusAction,
  SetFetchGetPostsLoadingStatusAction,
  SetFetchGetSelectedPostLoadingStatusAction,
  SetFetchReplyCommentLoadingStatusAction,
  SetGetSelectedPostErrorAction,
  SetNewCommentsChunkAction,
  SetPostsAction,
  SetRepliesAction,
  SetSelectedPostAction,
  UnLikeCommentAction,
  UnLikePostAction,
  UnLikeReplyAction,
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";

export const fetchGetSelectedPost = (
  payload: string
): FetchGetSelectedPostAction => ({
  type: PostsActionTypes.FETCH_GET_SELECTED_POST,
  payload,
});

export const setSelectedPost = (payload: IPost): SetSelectedPostAction => ({
  type: PostsActionTypes.SET_SELECTED_POST,
  payload,
});

export const setGetSelectedPostError = (
  payload: string
): SetGetSelectedPostErrorAction => ({
  type: PostsActionTypes.SET_GET_SELECTED_POST_ERROR,
  payload,
});

export const setFetchGetSelectedPostLoadingStatus = (
  payload: LoadingStatus
): SetFetchGetSelectedPostLoadingStatusAction => ({
  type: PostsActionTypes.SET_FETCH_GET_SELECTED_POST_LOADING_STATUS,
  payload,
});

export const fetchGetPosts = (): FetchGetPostsAction => ({
  type: PostsActionTypes.FETCH_GET_POSTS,
});

export const setPosts = (payload: IPost[]): SetPostsAction => ({
  type: PostsActionTypes.SET_POSTS,
  payload,
});

export const setFetchGetPostsLoadingStatus = (
  payload: LoadingStatus
): SetFetchGetPostsLoadingStatusAction => ({
  type: PostsActionTypes.SET_FETCH_GET_POSTS_LOADING_STATUS,
  payload,
});

export const fetchLikePost = (payload: string): FetchLikePostAction => ({
  type: PostsActionTypes.FETCH_LIKE_POST,
  payload,
});

export const likePost = (payload: LikePostPayload): LikePostAction => ({
  type: PostsActionTypes.LIKE_POST,
  payload,
});

export const fetchUnLikePost = (payload: string): FetchUnLikePostAction => ({
  type: PostsActionTypes.FETCH_UNLIKE_POST,
  payload,
});

export const unLikePost = (payload: LikePostPayload): UnLikePostAction => ({
  type: PostsActionTypes.UNLIKE_POST,
  payload,
});

export const fetchCommentPost = (
  payload: FetchCommentPostPayload
): FetchCommentPostAction => ({
  type: PostsActionTypes.FETCH_COMMENT_POST,
  payload,
});

export const fetchGetNewCommentsChunk = (
  payload: GetNewCommentsChunkPayload
): FetchGetNewCommentsChunkAction => ({
  type: PostsActionTypes.FETCH_GET_NEW_COMMENTS_CHUNK,
  payload,
});

export const setNewCommentsChunk = (
  payload: SetNewCommentsChunkPayload
): SetNewCommentsChunkAction => ({
  type: PostsActionTypes.SET_NEW_COMMENTS_CHUNK,
  payload,
});

export const setFetchGetNewChunkCommentsActionPayload = (
  payload: LoadingStatus
): SetFetchGetNewCommentsChunkLoadingStatusAction => ({
  type: PostsActionTypes.SET_FETCH_GET_NEW_COMMENTS_CHUNK_LOADING_STATUS,
  payload,
});

export const CommentPost = (
  payload: CommentPostPayload
): CommentPostAction => ({
  type: PostsActionTypes.COMMENT_POST,
  payload,
});

export const setFetchCommentPostLoadingStatus = (
  payload: LoadingStatus
): SetFetchCommentLoadingStatusAction => ({
  type: PostsActionTypes.SET_FETCH_COMMENT_POST_LOADING_STATUS,
  payload,
});

export const fetchLikeComment = (
  payload: LikeCommentPayload
): FetchLikeCommentAction => ({
  type: PostsActionTypes.FETCH_LIKE_COMMENT,
  payload,
});

export const likeComment = (
  payload: LikeCommentPayload
): LikeCommentAction => ({
  type: PostsActionTypes.LIKE_COMMENT,
  payload,
});

export const fetchUnLikeComment = (
  payload: LikeCommentPayload
): FetchUnLikeCommentAction => ({
  type: PostsActionTypes.FETCH_UNLIKE_COMMENT,
  payload,
});

export const unLikeComment = (
  payload: LikeCommentPayload
): UnLikeCommentAction => ({
  type: PostsActionTypes.UNLIKE_COMMENT,
  payload,
});

export const fetchGetReplies = (
  payload: GetRepliesPayload
): FetchGetRepliesAction => ({
  type: PostsActionTypes.FETCH_GET_REPLIES,
  payload,
});

export const setReplies = (payload: SetRepliesPayload): SetRepliesAction => ({
  type: PostsActionTypes.SET_REPLIES,
  payload,
});

export const fetchReplyComment = (
  payload: FetchReplyCommentPayload
): FetchReplyCommentAction => ({
  type: PostsActionTypes.FETCH_REPLY_COMMENT,
  payload,
});

export const setFetchReplyCommentLoadingStatus = (
  payload: LoadingStatus
): SetFetchReplyCommentLoadingStatusAction => ({
  type: PostsActionTypes.SET_FETCH_REPLY_COMMENT_LOADING_STATUS,
  payload,
});

export const replyComment = (
  payload: ReplyCommentPayload
): ReplyCommentAction => ({
  type: PostsActionTypes.REPLY_COMMENT,
  payload,
});

export const fetchLikeReply = (
  payload: LikeReplyPayload
): FetchLikeReplyAction => ({
  type: PostsActionTypes.FETCH_LIKE_REPLY,
  payload,
});

export const likeReply = (payload: LikeReplyPayload): LikeReplyAction => ({
  type: PostsActionTypes.LIKE_REPLY,
  payload,
});

export const fetchUnLikeReply = (
  payload: LikeReplyPayload
): FetchUnLikeReplyAction => ({
  type: PostsActionTypes.FETCH_UNLIKE_REPLY,
  payload,
});

export const unLikeReply = (payload: LikeReplyPayload): UnLikeReplyAction => ({
  type: PostsActionTypes.UNLIKE_REPLY,
  payload,
});
