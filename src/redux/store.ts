import { Middleware, configureStore } from "@reduxjs/toolkit";

import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import rootReducer from "./slice";

// Hàm để lưu trạng thái vào local storage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error("Không thể lưu trạng thái vào local storage", e);
  }
};

// Hàm để tải trạng thái từ local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Không thể tải trạng thái từ local storage", e);
    return undefined;
  }
};

// Tạo một middleware để lưu trạng thái vào local storage
const localStorageMiddleware: Middleware = storeAPI => next => action => {
  const result = next(action);
  const state = storeAPI.getState();
  saveState({
    account: state.account,
  });
  return result;
};

// Khởi tạo trạng thái đã lưu (nếu có)
const preloadedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: preloadedState,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(localStorageMiddleware);
  },
});

// Sử dụng store như bình thường
// store.dispatch({ type: 'UPDATE_STATE', payload: { key: 'value' } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
