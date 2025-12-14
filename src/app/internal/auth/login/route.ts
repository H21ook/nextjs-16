import { NextResponse } from "next/server";
import { setTokens } from "@/lib/tokens";
import { FakeResponse } from "@/types";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  let res: FakeResponse<{
    accessToken: string;
    refreshToken: string;
  }> = {
    ok: false,
  };
  // --- backend рүү хүсэлт илгээх ---
  if (email === "khishigbayar.u@gmail.com" && password === "123456") {
    res = {
      ok: true,
      data: {
        accessToken: `access_token_${Date.now()}`,
        refreshToken: "refresh_token",
      },
    };
  }
  //   const res = await fetch(process.env.AUTH_URL + "/login", {
  //     method: "POST",
  //     body: JSON.stringify({ email, password }),
  //     headers: { "Content-Type": "application/json" },
  //   });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const { accessToken, refreshToken } = res.data;

  await setTokens(accessToken, refreshToken);

  return NextResponse.json({ success: true });
}
