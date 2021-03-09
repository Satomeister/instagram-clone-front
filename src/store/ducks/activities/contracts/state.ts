import { IShortUser } from "../../authUser/contracts/state";
import { IMedia } from "../../posts/contracts/state";

export interface IActivity {
  _id: string;
  user: IShortUser;
  post: {
    _id: string;
    media: IMedia[];
  };
  type: "like" | "comment";
  comment?: {
    _id: string;
    text: string;
  };
  watched: boolean;
  createdAt: Date;
}
