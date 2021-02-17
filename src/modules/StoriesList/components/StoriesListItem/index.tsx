import React, {FC, useEffect, useRef} from "react";
import classNames from 'classnames'

import "./StoriesListItem.scss";
import { Avatar } from "../../../../components";

interface StoriesListItemProps {
  username: string;
  url?: string;
  watched?: boolean
}

const StoriesListItem: FC<StoriesListItemProps> = ({
  username,
  url,
  watched
}): JSX.Element => {
  const canvasBorderRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasBorderRef.current?.getContext) {
      const ctx = canvasBorderRef.current.getContext('2d')
      if (ctx) {
        ctx.beginPath()

        if (watched) { ctx.strokeStyle = '#dbdbdb'
        } else {
          const gradient = ctx.createLinearGradient(0,20, 50,50);

          gradient.addColorStop(0, '#fa7e1e');
          gradient.addColorStop(1, '#d62976');

          ctx.strokeStyle = gradient
        }

        ctx.arc(31, 31, 30, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.stroke()
      }
    }
  }, [canvasBorderRef, watched])

  return (
    <li className={classNames("story-item", {
      'story-item--watched': watched
    })}>
      <div className="story-item__avatar">
        <canvas width={66} height={66} ref={canvasBorderRef} className='story-item__avatar-border' />
        <Avatar size={56} url={url}/>
      </div>
      <div className="story-item__username">{username}</div>
    </li>
  );
};

export default StoriesListItem;
