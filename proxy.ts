import { Session, User } from "better-auth";
import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

type UserWithRole = User & {
    role?: string;
};

type SessionResponse = {
    session: Session;
    user: UserWithRole;
};

export default async function proxy(req: NextRequest) {
    const {data} = await betterFetch<SessionResponse>("/api/auth/get-session", {
        baseURL: req.nextUrl.origin,
        headers: {cookie: req.headers.get("cookie") || ""}
    })

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

    if(isAdminRoute && data?.user?.role !== "admin") {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ["/admin/:path*"]
}