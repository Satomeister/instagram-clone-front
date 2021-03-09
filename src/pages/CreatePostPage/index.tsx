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

import "./CreatePost.scss";

import { Preloader, Textarea } from "../../components";
import { useForm } from "../../hooks/useForm";
import { LoadingStatus } from "../../store/types";
import {
  selectCreatePostError,
  selectCreatePostLoadingStatus,
  selectIsAuth,
} from "../../store/ducks/authUser/selectors";
import {
  fetchCreatePost,
  setFetchCreatePostLoadingStatus,
} from "../../store/ducks/authUser/actionCreators";
import { selectSelectedPost } from "../../store/ducks/posts/selector";
import {
  deleteNotification,
  NotificationContext,
  setTextNotification,
} from "../../context/notification";
import { useSetDocumentTitle } from "../../hooks/useSetDocumentTitle";

const config = {
  fields: {
    description: {
      validations: {},
    },
  },
};

interface IMediaProps {
  file: File;
  blobUrl: string;
  type: "image" | "video";
}

const CreatePostPage: FC = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const notificationDispatch = useContext(NotificationContext);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mediaError, setMediaError] = useState<string>("");
  const [mediaFiles, setMediaFiles] = useState<IMediaProps[]>([]);

  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectCreatePostLoadingStatus);
  const submitError = useSelector(selectCreatePostError);
  const selectedPost = useSelector(selectSelectedPost);

  const { getFieldProps, values } = useForm(config);

  useSetDocumentTitle("Create Post • Instagram");

  useEffect(() => {
    if (loadingStatus === LoadingStatus.SUCCESS) {
      if (selectedPost) {
        notificationDispatch(setTextNotification("Post created Successfully."));
        history.push(`/post/${selectedPost._id}`);
        dispatch(setFetchCreatePostLoadingStatus(LoadingStatus.NEVER));
        setTimeout(() => {
          notificationDispatch(deleteNotification());
        }, 2000);
      }
    }
  }, [loadingStatus, history, dispatch, notificationDispatch, selectedPost]);

  if (!isAuth) {
    return <Redirect to="/auth/signin" />;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = mediaFiles.map((file) => ({
      file: file.file,
      type: file.type,
    }));
    dispatch(fetchCreatePost({ files, description: values.description }));
  };

  const handleChooseFile = (files: FileList | null) => {
    try {
      setMediaError("");
      if (files && files.length < 8) {
        if (files) {
          const media = Object.keys(files).map((key: any) => {
            const file = files[key];
            if (file.size / 1024 / 1024 > 70) {
              throw new Error(`${files[key].name} is to big`);
            }
            const blobUrl = URL.createObjectURL(new Blob([file]));
            const type: "image" | "video" = file.type.includes("image")
              ? "image"
              : "video";
            return { file, blobUrl, type };
          });
          setMediaFiles(media);
        }
      } else {
        setMediaError("Must be less than 7 files");
      }
    } catch (e) {
      setMediaError(e.message);
    }
  };

  const handleDeleteFile = (id: string) => {
    setMediaFiles((prev) => prev!.filter((file) => file.blobUrl !== id));
  };

  return (
    <div className="page-common">
      <h1 className="page-common__title">Create Post</h1>
      <ul className="media-list">
        {mediaFiles?.map((file) => (
          <li key={file.blobUrl} onClick={() => handleDeleteFile(file.blobUrl)}>
            {file.type === "image" ? (
              <img src={file.blobUrl} alt={file.file.name} />
            ) : (
              <video src={file.blobUrl} />
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <ul>
          <li className="page-common-form__item">
            <div className="page-common-form__item-inner">
              <div className="page-common-form__item-label">
                Photos or Videos
              </div>
              <input
                ref={fileInputRef}
                multiple
                accept="image/x-png,image/jpg,image/jpeg,video/*"
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
          <li className="page-common-form__item">
            <div className="page-common-form__item-inner">
              <div className="page-common-form__item-label">Description</div>
              <Textarea
                {...getFieldProps("description")}
                name={"description"}
              />
            </div>
          </li>
        </ul>
        {loadingStatus === LoadingStatus.LOADING ? (
          <div style={{marginLeft: 248, marginTop: 20}}>
            <Preloader size={24}/>
          </div>
        ) : (
          <button type="submit" className="button primary-button submit-button">
            Submit
          </button>
        )}
        <div className="submit-error">{submitError}</div>
      </form>
    </div>
  );
};

export default CreatePostPage;
