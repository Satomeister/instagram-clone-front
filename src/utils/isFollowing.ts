import { IUser } from "../store/ducks/authUser/contracts/state";

const isFollowing = (authUser: IUser | undefined, userId: string) => {
  return authUser?.following.some(
    (followingUser) => followingUser._id === userId
  );
};

export default isFollowing;
