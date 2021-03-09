import React from "react";

export const NotificationContext = React.createContext<any>({});

export enum NotificationActionTypes {
  SET_UNAUTH_NOTIFICATION = "notification/SET_UNAUTH_NOTIFICATION",
  SET_TEXT_NOTIFICATION = "notification/SET_NOTIFICATION",
  DELETE_NOTIFICATION = "notification/DELETE_NOTIFICATION",
}

export interface SetUnAuthNotificationAction {
  type: NotificationActionTypes.SET_UNAUTH_NOTIFICATION;
}

export interface SetTextNotificationAction {
  type: NotificationActionTypes.SET_TEXT_NOTIFICATION;
  payload: string;
}

export interface DeleteNotificationAction {
  type: NotificationActionTypes.DELETE_NOTIFICATION;
}

export type NotificationActions =
  | SetUnAuthNotificationAction
  | SetTextNotificationAction
  | DeleteNotificationAction;

export const setUnAuthNotification = (): SetUnAuthNotificationAction => ({
  type: NotificationActionTypes.SET_UNAUTH_NOTIFICATION,
});

export const setTextNotification = (
  payload: string
): SetTextNotificationAction => ({
  type: NotificationActionTypes.SET_TEXT_NOTIFICATION,
  payload,
});

export const deleteNotification = (): DeleteNotificationAction => ({
  type: NotificationActionTypes.DELETE_NOTIFICATION,
});

interface NotificationState {
  type: "unAuth" | "text" | null;
  text: string;
}

export const notificationReducer = (
  state: NotificationState,
  action: NotificationActions
): NotificationState => {
  switch (action.type) {
    case NotificationActionTypes.SET_UNAUTH_NOTIFICATION:
      return {
        ...state,
        type: "unAuth",
        text: "",
      };
    case NotificationActionTypes.SET_TEXT_NOTIFICATION:
      return {
        ...state,
        type: "text",
        text: action.payload,
      };
    case NotificationActionTypes.DELETE_NOTIFICATION:
      return {
        ...state,
        type: null,
        text: "",
      };
    default:
      return state;
  }
};
