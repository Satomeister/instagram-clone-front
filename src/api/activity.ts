import axios from "../core/axios";

export const ActivityApi = {
  getActivities: async () => {
    const { data } = await axios.get("/activity");
    return data;
  },
  watch: async () => {
    await axios.put("/activity");
  },
  delete: async () => {
    await axios.delete("/activity");
  },
};
