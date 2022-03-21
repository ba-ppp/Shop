import { combineReducers } from "@reduxjs/toolkit";
import { AdminReducers } from 'app/slices/User/admin.slice';

export const rootReducer = combineReducers({
    admin: AdminReducers,
});

export type RootState = ReturnType<typeof rootReducer>;