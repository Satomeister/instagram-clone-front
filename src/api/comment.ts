import axios from "../core/axios";
import {
  FetchCommentPostPayload,
  GetNewCommentsChunkPayload,
} from "../store/ducks/posts/contracts/state";

const CommentApi = {
  commentPost: async (payload: FetchCommentPostPayload) => {
    const { data } = await axios.post(`/comment/${payload.postId}`, {
      text: payload.text,
    });
    return data;
  },
  getNewChunk: async (payload: GetNewCommentsChunkPayload) => {
    const { data } = await axios.get(
      `/comment/${payload.postId}/?count=${payload.count}`
    );
    return data;
  },
  like: async (commentId: string) => {
    await axios.put(`/comment/like/${commentId}`);
  },
  unLike: async (commentId: string) => {
    await axios.put(`/comment/unlike/${commentId}`);
  },
};

export default CommentApi;
