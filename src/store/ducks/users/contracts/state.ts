import {IShortUser, IUser} from "../../user/contracts/state";

export interface updateFollowPayload {
  user: IShortUser,
  authUserData: IUser
}