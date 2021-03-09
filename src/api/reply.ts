import axios from "../core/axios";
import { FetchReplyCommentPayload } from "../store/ducks/posts/contracts/state";

const ReplyApi = {
  replyComment: async (payload: FetchReplyCommentPayload) => {
    const { data } = await axios.post("/reply", payload);
    return data;
  },
  getReplies: async (payload: { commentId: string; repliesCount: number }) => {
    const { data } = await axios.get(
      `/reply/${payload.commentId}/?count=${payload.repliesCount}`
    );
    return data;
  },
  like: async (replyId: string) => {
    await axios.put(`/reply/like/${replyId}`);
  },
  unLike: async (replyId: string) => {
    await axios.put(`/reply/unlike/${replyId}`);
  },
};

export default ReplyApi;
