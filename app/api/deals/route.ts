import { getDealsPage } from "@/lib/actions/deals";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)

    const session = await auth.api.getSession({ headers: req.headers });

    const page = await getDealsPage({
        sort: searchParams.get("sort") ?? "hot",
        cursor: searchParams.get("cursor"),
        currentUserId: session?.user.id,
    })
    return Response.json(page);
}