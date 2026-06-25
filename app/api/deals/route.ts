import { getDealsPage } from "@/lib/actions/deals";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)

    const session = await auth.api.getSession({ headers: req.headers });

    const limitParam = Number(searchParams.get("limit"))

    const page = await getDealsPage({
        q: searchParams.get("q"),
        sort: searchParams.get("sort") ?? "hot",
        cursor: searchParams.get("cursor"),
        limit: Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined,
        currentUserId: session?.user.id,
    })
    return Response.json(page);
}