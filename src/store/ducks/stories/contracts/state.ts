import { IShortUser } from "../../authUser/contracts/state";

export interface IStory {
  _id: string;
  author: IShortUser;
  video: string;
  watchers: string[];
  date: Date;
}

export interface WatchStoryPayload {
  userId: string;
  storyId: string;
}
