import produce, { Draft } from "immer";
import { IPost } from "./contracts/state";
import { PostsActions, PostsActionTypes } from "./contracts/actionTypes";
import { LoadingStatus } from "../../types";

export interface PostsState {
  selectedPost: IPost | undefined;
  posts: IPost[];
  fetchGetSelectedPostLoadingStatus: LoadingStatus;
  fetchGetPostsLoadingStatus: LoadingStatus;
  fetchCommentPostLoadingStatus: LoadingStatus;
  fetchGetNewChunkLoadingStatus: LoadingStatus;
  fetchReplyCommentLoadingStatus: LoadingStatus;
  getSelectedPostError: string;
}

const initialState: PostsState = {
  selectedPost: undefined,
  posts: [],
  fetchGetSelectedPostLoadingStatus: LoadingStatus.NEVER,
  fetchGetPostsLoadingStatus: LoadingStatus.NEVER,
  fetchCommentPostLoadingStatus: LoadingStatus.NEVER,
  fetchGetNewChunkLoadingStatus: LoadingStatus.NEVER,
  fetchReplyCommentLoadingStatus: LoadingStatus.NEVER,
  getSelectedPostError: "",
};

export const postsReducer = produce(
  (draft: Draft<PostsState>, action: PostsActions) => {
    switch (action.type) {
      case PostsActionTypes.SET_SELECTED_POST:
        action.payload.comments.reverse();
        draft.selectedPost = action.payload;
        break;
      case PostsActionTypes.SET_FETCH_GET_SELECTED_POST_LOADING_STATUS:
        draft.fetchGetSelectedPostLoadingStatus = action.payload;
        break;
      case PostsActionTypes.SET_GET_SELECTED_POST_ERROR:
        draft.getSelectedPostError = action.payload;
        break;
      case PostsActionTypes.SET_POSTS:
        draft.posts = action.payload;
        break;
      case PostsActionTypes.SET_FETCH_GET_POSTS_LOADING_STATUS:
        draft.fetchGetPostsLoadingStatus = action.payload;
        break;
      case PostsActionTypes.LIKE_POST:
        if (draft.selectedPost) {
          if (!draft.selectedPost.likes.includes(action.payload.userId)) {
            draft.selectedPost.likes.push(action.payload.userId);
            draft.selectedPost.likesCount += 1;
          }
        }
        if (draft.posts.length) {
          draft.posts = draft.posts.map((post) => {
            if (post._id === action.payload.postId) {
              if (!post.likes.includes(action.payload.userId)) {
                post.likes.push(action.payload.userId);
                post.likesCount += 1;
              }
            }
            return post;
          });
        }
        break;
      case PostsActionTypes.UNLIKE_POST:
        if (draft.selectedPost?.likes) {
          draft.selectedPost.likes = draft.selectedPost.likes.filter(
            (id) => id !== action.payload.userId
          );
          draft.selectedPost.likesCount -= 1;
        }
        if (draft.posts.length) {
          draft.posts = draft.posts.map((post) => {
            if (post._id === action.payload.postId) {
              if (post.likes.includes(action.payload.userId)) {
                post.likes = post.likes.filter(
                  (id) => id !== action.payload.userId
                );
                post.likesCount -= 1;
              }
            }
            return post;
          });
        }
        break;
      case PostsActionTypes.SET_NEW_COMMENTS_CHUNK:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments = [
            ...action.payload.comments,
            ...draft.selectedPost.comments,
          ];
        }
        break;
      case PostsActionTypes.SET_FETCH_GET_NEW_COMMENTS_CHUNK_LOADING_STATUS:
        draft.fetchGetNewChunkLoadingStatus = action.payload;
        break;
      case PostsActionTypes.COMMENT_POST:
        if (draft.selectedPost) {
          draft.selectedPost.comments.push(action.payload.comment);
          draft.selectedPost.commentsCountWithoutReplies += 1;
          draft.selectedPost.commentsCount += 1;
        }
        if (draft.posts.length) {
          draft.posts = draft.posts.map((post) => {
            if (post._id === action.payload.postId) {
              post.comments.unshift(action.payload.comment);
              post.commentsCountWithoutReplies += 1;
              post.commentsCount += 1;
            }
            return post;
          });
        }
        break;
      case PostsActionTypes.SET_FETCH_COMMENT_POST_LOADING_STATUS:
        draft.fetchCommentPostLoadingStatus = action.payload;
        break;
      case PostsActionTypes.LIKE_COMMENT:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              if (!comment.likes.includes(action.payload.userId)) {
                comment.likes.push(action.payload.userId);
              }
            }
            return comment;
          });
        }
        if (draft.posts.length) {
          draft.posts = draft.posts.map((post) => {
            if (post._id === action.payload.postId) {
              post.comments.map((comment) => {
                if (comment._id === action.payload.commentId) {
                  if (!comment.likes.includes(action.payload.userId)) {
                    comment.likes.push(action.payload.userId);
                  }
                }
                return comment;
              });
            }
            return post;
          });
        }
        break;
      case PostsActionTypes.UNLIKE_COMMENT:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.likes = comment.likes.filter(
                (id) => id !== action.payload.userId
              );
            }
            return comment;
          });
        }
        if (draft.posts.length) {
          draft.posts = draft.posts.map((post) => {
            if (post._id === action.payload.postId) {
              post.comments.map((comment) => {
                if (comment._id === action.payload.commentId) {
                  comment.likes = comment.likes.filter(
                    (id) => id !== action.payload.userId
                  );
                }
                return comment;
              });
            }
            return post;
          });
        }
        break;
      case PostsActionTypes.SET_REPLIES:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              if (comment.replies) {
                comment.replies = [
                  ...action.payload.replies.reverse(),
                  ...comment.replies,
                ];
              } else {
                comment.replies = action.payload.replies.reverse();
              }
            }
            return comment;
          });
        }
        break;
      case PostsActionTypes.REPLY_COMMENT:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.repliesCount += 1;
              if (comment.replies) {
                comment.replies.push(action.payload.reply);
              } else {
                comment.replies = [action.payload.reply];
              }
            }
            return comment;
          });
        }
        break;
      case PostsActionTypes.SET_FETCH_REPLY_COMMENT_LOADING_STATUS:
        draft.fetchReplyCommentLoadingStatus = action.payload;
        break;
      case PostsActionTypes.LIKE_REPLY:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies.map((reply) => {
                if (reply._id === action.payload.replyId) {
                  reply.likes.push(action.payload.userId);
                }
                return reply;
              });
            }
            return comment;
          });
        }
        break;
      case PostsActionTypes.UNLIKE_REPLY:
        if (draft.selectedPost?._id === action.payload.postId) {
          draft.selectedPost.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              comment.replies.map((reply) => {
                if (reply._id === action.payload.replyId) {
                  reply.likes = reply.likes.filter(
                    (id) => id !== action.payload.userId
                  );
                }
                return reply;
              });
            }
            return comment;
          });
        }
        break;
      default:
        break;
    }
  },
  initialState
);
