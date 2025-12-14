// src/app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { REFRESH_TOKEN_KEY, setTokens } from "@/lib/tokens";
import { FakeResponse } from "@/types";
import { cookies } from "next/headers";

export async function POST() {
  let res: FakeResponse<{ accessToken: string; refreshToken: string }> = {
    ok: false,
  };

  const cookieStore = await cookies();

  const refreshTokenStore = cookieStore.get(REFRESH_TOKEN_KEY)?.value;

  if (!refreshTokenStore) {
    return NextResponse.json(
      { error: "Refresh token not found" },
      { status: 401 }
    );
  }

  res = {
    ok: true,
    data: {
      accessToken: `access_token_${Date.now()}`,
      refreshToken: "refresh_token",
    },
  };

  //   const res = await fetch(process.env.AUTH_URL + "/refresh", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //   });

  if (!res.ok)
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });

  const { accessToken, refreshToken } = res.data;
  await setTokens(accessToken, refreshToken);

  return NextResponse.json({ accessToken });
}
