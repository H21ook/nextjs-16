
export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RefreshResponse {
    accessToken: string;
}

export enum AuthStatus {
    UNKNOWN = "unknown",
    AUTHENTICATED = "authenticated",
    UNAUTHENTICATED = "unauthenticated",
    LOADING = "loading"
}