import axios from "../core/axios";

export const UsersApi = {
  findUsers: async (payload: string) => {
    const { data } = await axios.get(`/users/?user=${payload}`);
    return data;
  },
  getUser: async (payload: string) => {
    const { data } = await axios.get(`/users/${payload}`);
    return data;
  },
  follow: async (userId: string) => {
    const { data } = await axios.put(`/users/follow/${userId}`);
    return data;
  },
  unfollow: async (userId: string) => {
    const { data } = await axios.put(`/users/unfollow/${userId}`);
    return data;
  },
};
