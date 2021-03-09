import { IShortUser, IUser } from "../../authUser/contracts/state";

export interface updateFollowPayload {
  user: IShortUser;
  authUserData: IUser;
}
