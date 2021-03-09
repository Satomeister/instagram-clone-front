import axios from "../core/axios";

const StoryApi = {
  getStories: async () => {
    const { data } = await axios.get("/story");
    return data;
  },
  create: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const { data: fileData } = await axios.post(`/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { data } = await axios.post("/story", { video: fileData.data });
    return data;
  },
  getById: async (storyId: string) => {
    const { data } = await axios.get(`/story/${storyId}`);
    return data;
  },
  watch: async (storyId: string) => {
    await axios.put(`/story/${storyId}`);
  },
};

export default StoryApi;
