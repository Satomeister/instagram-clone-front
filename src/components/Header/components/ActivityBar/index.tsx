import React, { FC, useEffect, useState } from "react";
import {
  BsHeart as HeartIcon,
  BsHeartFill as HeartIconFilled,
} from "react-icons/bs";
import Box from "../../../Box";
import { useDispatch, useSelector } from "react-redux";

import "./ActivityBar.scss";

import {
  selectActivities,
  selectGetActivitiesLoadingStatus,
} from "../../../../store/ducks/activities/selector";
import { fetchGetActivities } from "../../../../store/ducks/activities/actionCreators";
import { LoadingStatus } from "../../../../store/types";
import Preloader from "../../../Preloader";
import Activity from "../Activity";
import { ActivityApi } from "../../../../api/activity";

const ActivityBar: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const [notificationOpen, setNotificationOpen] = useState<boolean>(false);

  const activities = useSelector(selectActivities);
  const getActivitiesLoadingStatus = useSelector(
    selectGetActivitiesLoadingStatus
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (getActivitiesLoadingStatus === LoadingStatus.SUCCESS) {
      timer = setTimeout(async () => {
        await ActivityApi.watch();
        await ActivityApi.delete();
      }, 3000);
    }
    return () => timer && clearTimeout(timer);
  }, [dispatch, getActivitiesLoadingStatus]);

  const handleOpenNotification = () => {
    dispatch(fetchGetActivities());
    setNotificationOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpenNotification}
        style={{ position: "relative" }}
        className="header-navigation__item"
      >
        {notificationOpen ? (
          <>
            <HeartIconFilled />
            <div className="arrow-bottom">
              <div className="arrow-bottom__inner" />
            </div>
          </>
        ) : (
          <HeartIcon />
        )}
      </div>
      {notificationOpen ? (
        getActivitiesLoadingStatus !== LoadingStatus.LOADING ? (
          <Box width={500} height={240} setBoxOpen={setNotificationOpen}>
            {!!activities.length ? (
              <>
                {!!activities.filter((a) => !a.watched).length && (
                  <>
                    <h3 className="activity-bar__title">New</h3>
                    <ul>
                      {activities
                        .filter((a) => !a.watched)
                        .map((activity) => (
                          <Activity key={activity._id} activity={activity} />
                        ))}
                    </ul>
                  </>
                )}

                {!!activities.filter((a) => a.watched).length && (
                  <>
                    <h3 className="activity-bar__title">Watched</h3>
                    <ul>
                      {activities
                        .filter((a) => a.watched)
                        .map((activity) => (
                          <Activity key={activity._id} activity={activity} />
                        ))}
                    </ul>
                  </>
                )}
              </>
            ) : (
              <div className="activity-bar-empty">
                <div className="activity-bar-empty__icon">
                  <HeartIcon />
                </div>
                <p>Activity On Your Posts</p>
                <p>
                  When someone likes or comments on one of your posts, you'll
                  see it here.
                </p>
              </div>
            )}
          </Box>
        ) : (
          <Box width={500} height={240} setBoxOpen={setNotificationOpen}>
            <Preloader centered />
          </Box>
        )
      ) : null}
    </>
  );
};
export default ActivityBar;
