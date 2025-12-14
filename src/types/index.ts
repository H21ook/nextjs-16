export type FakeResponse<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error?: string;
    };

type CustomSuccessResponse<
  T = {
    isOk: true;
  }
> = {
  isOk: true;
  data: T;
};

type CustomErrorResponse = {
  isOk: false;
  error?: string;
};

export type CustomResponse<T> = CustomSuccessResponse<T> | CustomErrorResponse;
