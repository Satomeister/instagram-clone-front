import axios from "../core/axios";
import { ICreatePostPayload } from "../store/ducks/posts/contracts/state";

const PostApi = {
  create: async (payload: ICreatePostPayload) => {
    const media = [];

    for (const file of payload.files) {
      const formData = new FormData();
      formData.append("file", file.file);
      const { data } = await axios.post(`/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      media.push({ url: data.data, type: file.type });
    }

    const { data } = await axios.post("/post", {
      media,
      description: payload.description,
    });
    return data;
  },
  getById: async (payload: string) => {
    const { data } = await axios.get(`/post/${payload}`);
    return data;
  },
  getPosts: async () => {
    const { data } = await axios.get(`/post`);
    return data;
  },
  like: async (postId: string) => {
    await axios.put(`/post/like/${postId}`);
  },
  unLike: async (postId: string) => {
    await axios.put(`/post/unlike/${postId}`);
  },
};

export default PostApi;
