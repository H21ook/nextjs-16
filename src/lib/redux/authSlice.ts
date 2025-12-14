import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { refreshToken } from "./thunks";
import { RootState } from "./store";
import { AuthStatus } from "@/types/auth-types";

// Define a type for the slice state
interface AuthState {
  accessToken?: string;
  status: AuthStatus;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: undefined,
  status: AuthStatus.UNKNOWN,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (action.payload) {
        state.status = AuthStatus.AUTHENTICATED;
      } else {
        state.status = AuthStatus.UNAUTHENTICATED;
      }
    },
    clearToken: (state) => {
      state.accessToken = undefined;
      state.status = AuthStatus.UNAUTHENTICATED;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.pending, (state) => {
        state.status = AuthStatus.LOADING;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.status = AuthStatus.AUTHENTICATED;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.status = AuthStatus.UNAUTHENTICATED;
      });
  },
});

export const { setAccessToken, clearToken } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.auth.accessToken;

export default authSlice.reducer;
