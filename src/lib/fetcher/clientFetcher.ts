import { CustomResponse } from "@/types";
import { coreFetcher, CoreFetcherOptions } from "./coreFetcher";

const responseHandler = <T>(res: CustomResponse<T>) => {
  if (!res.isOk && res?.status === 401 && !window.location.pathname?.startsWith("/auth")) {
    window.location.href = "/auth/login"
  }

  return res
}
export const clientFetcher = {
  get: async <T>(
    url: string,
    token?: string,
    options?: Omit<CoreFetcherOptions, "token">
  ) => {
    const res = await coreFetcher<T>("GET", url, undefined, { ...options, token })
    return responseHandler(res)
  },

  post: async <T, TBody = undefined>(
    url: string,
    data?: TBody,
    token?: string,
    options?: Omit<CoreFetcherOptions, "token">
  ) => {
    const res = await coreFetcher<T, TBody>("POST", url, data, { ...options, token })
    return responseHandler(res)
  },

  put: async <T, TBody = undefined>(
    url: string,
    data?: TBody,
    token?: string,
    options?: Omit<CoreFetcherOptions, "token">
  ) => {
    const res = await coreFetcher<T, TBody>("PUT", url, data, { ...options, token })
    return responseHandler(res)
  },

  patch: async <T, TBody = undefined>(
    url: string,
    data?: TBody,
    token?: string,
    options?: Omit<CoreFetcherOptions, "token">
  ) => {
    const res = await coreFetcher<T, TBody>("PATCH", url, data, { ...options, token })
    return responseHandler(res)
  },

  delete: async <T>(
    url: string,
    token?: string,
    options?: Omit<CoreFetcherOptions, "token">
  ) => {
    const res = await coreFetcher<T>("DELETE", url, undefined, { ...options, token })
    return responseHandler(res)
  },
};
