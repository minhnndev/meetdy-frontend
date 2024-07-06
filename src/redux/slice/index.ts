import global from "./globalSlice";

import chat from "./chat/chatSlice";
import media from "./chat/mediaSlice";

import account from "./accountSlice";
import friend from "./friendSlice";
import home from "./homeSlice";
import callVideo from "./callVideoSlice";

import admin from "./adminSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  global,
  account,
  admin,
  callVideo,
  chat,
  friend,
  home,
  media,
});

export default rootReducer;
