import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientFetcher } from "../fetcher/clientFetcher";

interface RefreshTokenResponse {
    accessToken: string;
}
export const refreshToken = createAsyncThunk<
    RefreshTokenResponse,
    void,
    { rejectValue: string }
>(
    "auth/refreshToken",
    async (_, { rejectWithValue }) => {
        const res = await clientFetcher.post<RefreshTokenResponse>("/internal/auth/refresh");

        if (!res.isOk) {
            return rejectWithValue(res.error ?? "Unauthorized");
        }

        return res.data;
    }
);