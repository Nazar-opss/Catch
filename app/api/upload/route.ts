import { v2 as cloudinary } from "cloudinary"
import pLimit from "p-limit"

const limit = pLimit(5)

export async function POST(req: Request) {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    const uploadPromises = files.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        return limit(() => new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: 'uploads',
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            ).end(buffer);
        }));
    })

    const urls = await Promise.all(uploadPromises);
    return Response.json({ urls });
}