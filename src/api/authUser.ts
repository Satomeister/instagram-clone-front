import axios from "../core/axios";

import {
  EditProfilePayload,
  LoginPayload,
  SignUpPayload,
} from "../store/ducks/user/contracts/state";

export const AuthUserApi = {
  signup: async (payload: SignUpPayload) => {
    const { data } = await axios.post("/user/signup", payload);
    return data;
  },
  login: async (payload: LoginPayload) => {
    const { data } = await axios.post("/user/login", payload);
    return data;
  },
  logout: async () => {
    await axios.put("/user/logout");
  },
  getMe: async () => {
    const { data } = await axios.get("/user/me");
    return data;
  },
  edit: async (payload: EditProfilePayload) => {
    const { data } = await axios.put("/user/edit", payload);
    return data;
  },
  updateAvatar: async (payload: FormData | null) => {
    if (payload) {
      const { data } = await axios.put("/user/avatar/update", payload, {
        headers: { "Content-Type": "multipart/form-data", },
      });
      return data;
    } else {
      const { data } = await axios.delete("/user/avatar/delete");
      return data;
    }
  },
};
