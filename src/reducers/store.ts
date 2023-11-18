import { configureStore } from "@reduxjs/toolkit";

import monthSlice from "./monthSlice/monthSlice";
import eventSlice from "./eventReducer/eventSlice";
import authSlice from "./authReducer/authSlice";

export const store = configureStore({
	reducer: {
		monthState: monthSlice,
		eventState: eventSlice,
		authState: authSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
