import global from "./globalSlice";
import chat from "./chat/chatSlice";
import media from "./chat/mediaSlice";
import account from "./accountSlice";
import friend from "./friendSlice";
import admin from "./adminSlice";
import home from "./homeSlice";
import callVideo from "./callVideoSlice";

const rootReducer = {
  global,
  account,
  chat,
  friend,
  admin,
  media,
  callVideo,
  home,
};

export default rootReducer;
