import React, {
  FC,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuthUserData,
  selectIsAuth,
} from "../../store/ducks/authUser/selectors";
import { LoadingStatus } from "../../store/types";
import { Preloader } from "../../components";
import { selectFetchCreateStoryLoadingStatus } from "../../store/ducks/stories/selector";
import {
  fetchCreateStory,
  setFetchCreateStoryLoadingStatus,
} from "../../store/ducks/stories/actionCreators";
import {
  deleteNotification,
  NotificationContext,
  setTextNotification,
} from "../../context/notification";
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle";

const CreatePostPage: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const notificationDispatch = useContext(NotificationContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaError, setMediaError] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File>();

  const isAuth = useSelector(selectIsAuth);
  const authUser = useSelector(selectAuthUserData);
  const loadingStatus = useSelector(selectFetchCreateStoryLoadingStatus);

  useSetDocumentTitle("Create Story • Instagram");

  useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      if (authUser) {
        notificationDispatch(
          setTextNotification("Story created Successfully.")
        );
        history.push(`/${authUser.username}`);
        dispatch(setFetchCreateStoryLoadingStatus(LoadingStatus.NEVER));
        setTimeout(() => {
          notificationDispatch(deleteNotification());
        }, 2000);
      }
    }
  }, [loadingStatus, authUser, history, dispatch, notificationDispatch]);

  if (!isAuth) {
    return <Redirect to="/auth/signin" />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (videoFile) {
      dispatch(fetchCreateStory(videoFile));
    }
  };

  const handleChooseFile = (files: FileList | null) => {
    setMediaError("");
    if (files?.[0]) {
      const file = files[0];
      if (file.size / 1024 / 1024 > 150) {
        return setMediaError(`${file.name} is to big`);
      }
      setVideoFile(file);
    }
  };

  return (
    <div className="page-common">
      <h1 className="page-common__title">Create Story</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <li className="page-common-form__item">
            <div className="page-common-form__item-inner">
              <div className="page-common-form__item-label">Video</div>
              <input
                ref={fileInputRef}
                multiple
                accept="video/*"
                onChange={(e) => handleChooseFile(e.target.files)}
                type="file"
                name="media"
                hidden
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ color: mediaError ? "#ff7875" : undefined }}
                type="button"
                className="button secondary-button"
              >
                {mediaError || "Choose File"}
              </button>
            </div>
          </li>
        </ul>
        {loadingStatus === LoadingStatus.LOADING ? (
          <div style={{marginLeft: 248, marginTop: 20}}>
            <Preloader size={24}/>
          </div>
        ) : (
          <button
            disabled={!videoFile || !!mediaError}
            type="submit"
            className="button primary-button submit-button"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};

export default CreatePostPage;
