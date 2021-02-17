import {useDispatch, useSelector} from "react-redux";
import {selectAuthUserData} from "../store/ducks/user/selectors";
import {selectUser} from "../store/ducks/users/selector";
import {useEffect, useState} from "react";
import {IUser} from "../store/ducks/user/contracts/state";
import {fetchGetUser} from "../store/ducks/users/actionCreators";

export const useGetUserProfile = (username: string) => {
  // decide if user is auth user or another
  const dispatch = useDispatch()
  const authUserData = useSelector(selectAuthUserData);
  const userData = useSelector(selectUser)
  const [user, setUser] = useState<IUser | undefined>(undefined)
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    if (userData) {
      if (userData.username === username) {
        setUser(userData)
      }
    }
  }, [userData, username])

  useEffect(() => {
    if (username === authUserData?.username) {
      setIsMe(true)
      setUser(authUserData)
    } else {
      setIsMe(false)
      dispatch(fetchGetUser(username))
    }
    //eslint-disable-next-line
  }, [authUserData?.username, authUserData?.following, username, dispatch])

  return {user, authUser: authUserData, isMe}
}