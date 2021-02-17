import React, {createContext, FC} from "react";
import { Link, NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Home.scss";

import { Post, StoriesList } from "../../modules";
import { Avatar } from "../../components";
import { selectIsAuth, selectAuthUserData } from "../../store/ducks/user/selectors";

const Home: FC = (): JSX.Element => {
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectAuthUserData);

  if (!isAuth) {
    return <Redirect to={"/auth/signin"} />;
  }

  return (
    <div className="home">
      <div className="home__content">
        <StoriesList />
        <Post
          lastComments={[
            {
              _id: "wqwe1wqe2e12e1221e12",
              text: "hahahhahahahhahah",
              sender: { username: "taras" },
              likes: 0,
            },
            {
              _id: "wqwe12qwe12e1221e12",
              text: "nice photo fwef w",
              sender: { username: "pid" },
              likes: 2,
            },
          ]}
          commentsCount={5}
          description={
            "wwww wwwwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwww"
          }
          username={"anton"}
          media={[
            {
              type: "image",
              url:
                "https://hi-static.z-dn.net/files/d77/f657b830c0541791efbd2092026017e9.jpg",
            },
            {
              url: "https://i.ytimg.com/vi/Uw9nJfXUXNA/maxresdefault.jpg",
              type: "image",
            },
          ]}
        />
        <Post
          lastComments={[
            {
              _id: "wqwe1wqe2e12e1221e12",
              text: "hahahhahahahhahah",
              sender: { username: "taras" },
              likes: 0,
            },
            {
              _id: "wqwe12qwe12e1221e12",
              text: "nice photo fwef w",
              sender: { username: "pid" },
              likes: 2,
            },
          ]}
          commentsCount={5}
          description={
            "wwww wwwwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwwwwwwwww wwwwwwwwwwwwww"
          }
          username={"anton"}
          media={[
            {
              type: "image",
              url:
                "https://hi-static.z-dn.net/files/d77/f657b830c0541791efbd2092026017e9.jpg",
            },
            {
              url: "https://i.ytimg.com/vi/Uw9nJfXUXNA/maxresdefault.jpg",
              type: "image",
            },
          ]}
        />
      </div>
      <div className="home__user-info">
        <div className="home__user-info-inner">
          <NavLink to={`${userData?.username}`}>
            <Avatar url={userData?.avatar} size={56} />
          </NavLink>
          <NavLink to={`${userData?.username}`} className="home__user-data">
            <span className="home__user-username">{userData?.username}</span>
            <span className="home__user-fullname">{userData?.fullname}</span>
          </NavLink>
        </div>
        <Link to={"/"} className="home__user-link">
          Switch
        </Link>
      </div>
    </div>
  );
};

export default Home;
