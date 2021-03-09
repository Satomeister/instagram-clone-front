import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  FetchCommentPostAction,
  FetchGetNewCommentsChunkAction,
  FetchGetRepliesAction,
  FetchGetSelectedPostAction,
  FetchLikeCommentAction,
  FetchLikePostAction,
  FetchLikeReplyAction,
  FetchReplyCommentAction,
  FetchUnLikeCommentAction,
  FetchUnLikeReplyAction,
  PostsActionTypes,
} from "./contracts/actionTypes";
import {
  CommentPost,
  likeComment,
  likePost,
  likeReply,
  replyComment,
  setFetchCommentPostLoadingStatus,
  setFetchGetNewChunkCommentsActionPayload,
  setFetchGetPostsLoadingStatus,
  setFetchGetSelectedPostLoadingStatus,
  setFetchReplyCommentLoadingStatus,
  setGetSelectedPostError,
  setNewCommentsChunk,
  setPosts,
  setReplies,
  setSelectedPost,
  unLikeComment,
  unLikePost,
  unLikeReply,
} from "./actionCreators";
import { LoadingStatus } from "../../types";
import { CommentApi, PostApi } from "../../../api";
import { AppState } from "../../rootReducer";
import {
  updatePostCommentsCount,
  updatePostLikesCount,
} from "../authUser/actionCreators";
import ReplyApi from "../../../api/reply";

function* fetchGetSelectPostRequest({ payload }: FetchGetSelectedPostAction) {
  try {
    yield put(setGetSelectedPostError(""));
    yield put(setFetchGetSelectedPostLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(PostApi.getById, payload);
    data.post.commentsCountWithoutReplies = data.commentsCountWithoutReplies;
    yield put(setSelectedPost(data.post));
    yield put(setFetchGetSelectedPostLoadingStatus(LoadingStatus.SUCCESS));
  } catch (error) {
    yield put(setGetSelectedPostError("404"));
    yield put(setFetchGetSelectedPostLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchGetPostsRequest() {
  try {
    yield put(setFetchGetPostsLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(PostApi.getPosts);
    yield put(setPosts(data));
    yield put(setFetchGetPostsLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchGetPostsLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchLikePostRequest({ payload }: FetchLikePostAction) {
  const authUserData = yield select((state: AppState) => state.authUser.data);
  try {
    yield put(likePost({ userId: authUserData._id, postId: payload }));
    yield call(PostApi.like, payload);
    yield put(updatePostLikesCount({ postId: payload, value: +1 }));
  } catch (e) {
    yield put(unLikePost({ userId: authUserData._id, postId: payload }));
    yield put(updatePostLikesCount({ postId: payload, value: -1 }));
  }
}

function* fetchUnLikePostRequest({ payload }: FetchLikePostAction) {
  const authUserData = yield select((state: AppState) => state.authUser.data);
  try {
    yield put(unLikePost({ userId: authUserData._id, postId: payload }));
    yield put(updatePostLikesCount({ postId: payload, value: -1 }));
    yield call(PostApi.unLike, payload);
  } catch (e) {
    yield put(likePost({ userId: authUserData._id, postId: payload }));
    yield put(updatePostLikesCount({ postId: payload, value: +1 }));
  }
}

function* fetchGetNewCommentsChunkRequest({
  payload,
}: FetchGetNewCommentsChunkAction) {
  try {
    yield put(setFetchGetNewChunkCommentsActionPayload(LoadingStatus.LOADING));
    const { data } = yield call(CommentApi.getNewChunk, payload);
    yield put(
      setNewCommentsChunk({ comments: data.comments, postId: payload.postId })
    );
    yield put(setFetchGetNewChunkCommentsActionPayload(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchGetNewChunkCommentsActionPayload(LoadingStatus.ERROR));
  }
}

function* fetchCommentPostRequest({ payload }: FetchCommentPostAction) {
  try {
    yield put(setFetchCommentPostLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(CommentApi.commentPost, payload);
    yield put(CommentPost({ comment: data, postId: payload.postId }));
    yield put(updatePostCommentsCount({ postId: payload.postId, value: +1 }));
    yield put(setFetchCommentPostLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchCommentPostLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchLikeCommentRequest({ payload }: FetchLikeCommentAction) {
  try {
    yield put(likeComment(payload));
    yield call(CommentApi.like, payload.commentId);
  } catch (e) {
    yield put(unLikeComment(payload));
  }
}

function* fetchUnLikeCommentRequest({ payload }: FetchUnLikeCommentAction) {
  try {
    yield put(unLikeComment(payload));
    yield call(CommentApi.unLike, payload.commentId);
  } catch (e) {
    yield put(likeComment(payload));
  }
}

function* fetchGetRepliesRequest({ payload }: FetchGetRepliesAction) {
  try {
    const { data } = yield call(ReplyApi.getReplies, {
      commentId: payload.commentId,
      repliesCount: payload.repliesCount,
    });
    data.commentId = data._id;
    data.postId = payload.postId;
    yield put(setReplies(data));
  } catch (e) {}
}

function* fetchReplyCommentRequest({ payload }: FetchReplyCommentAction) {
  try {
    yield put(setFetchReplyCommentLoadingStatus(LoadingStatus.LOADING));
    const { data } = yield call(ReplyApi.replyComment, payload);
    yield put(
      replyComment({
        reply: data,
        commentId: payload.commentId,
        postId: payload.postId,
      })
    );
    yield put(setFetchReplyCommentLoadingStatus(LoadingStatus.SUCCESS));
  } catch (e) {
    yield put(setFetchReplyCommentLoadingStatus(LoadingStatus.ERROR));
  }
}

function* fetchLikeReplyRequest({ payload }: FetchLikeReplyAction) {
  try {
    yield put(likeReply(payload));
    yield call(ReplyApi.like, payload.replyId);
  } catch (e) {
    yield put(unLikeReply(payload));
  }
}

function* fetchUnLikeReplyRequest({ payload }: FetchUnLikeReplyAction) {
  try {
    yield put(unLikeReply(payload));
    yield call(ReplyApi.unLike, payload.replyId);
  } catch (e) {
    yield put(likeReply(payload));
  }
}

export function* postSaga() {
  yield takeLatest(
    PostsActionTypes.FETCH_GET_SELECTED_POST,
    fetchGetSelectPostRequest
  );
  yield takeLatest(PostsActionTypes.FETCH_GET_POSTS, fetchGetPostsRequest);
  yield takeLatest(PostsActionTypes.FETCH_LIKE_POST, fetchLikePostRequest);
  yield takeLatest(PostsActionTypes.FETCH_UNLIKE_POST, fetchUnLikePostRequest);
  yield takeLatest(
    PostsActionTypes.FETCH_COMMENT_POST,
    fetchCommentPostRequest
  );
  yield takeLatest(
    PostsActionTypes.FETCH_GET_NEW_COMMENTS_CHUNK,
    fetchGetNewCommentsChunkRequest
  );
  yield takeLatest(
    PostsActionTypes.FETCH_LIKE_COMMENT,
    fetchLikeCommentRequest
  );
  yield takeLatest(
    PostsActionTypes.FETCH_UNLIKE_COMMENT,
    fetchUnLikeCommentRequest
  );
  yield takeLatest(
    PostsActionTypes.FETCH_REPLY_COMMENT,
    fetchReplyCommentRequest
  );
  yield takeLatest(PostsActionTypes.FETCH_LIKE_REPLY, fetchLikeReplyRequest);
  yield takeLatest(
    PostsActionTypes.FETCH_UNLIKE_REPLY,
    fetchUnLikeReplyRequest
  );
  yield takeLatest(PostsActionTypes.FETCH_GET_REPLIES, fetchGetRepliesRequest);
}
