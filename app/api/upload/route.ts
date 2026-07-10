import { auth } from "@/lib/auth";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_FILES } from "@/lib/constants";
import { v2 as cloudinary } from "cloudinary"
import pLimit from "p-limit"

const limit = pLimit(5)

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });
        if (!session) {
            return Response.json({ error: "Не авторизовано" }, { status: 401 });
        }

        const formData = await req.formData();
        const files = formData.getAll('files') as File[];

        if (files.length === 0) {
            return Response.json({error: "Файли не надіслано"}, { status: 400 })
        }
        if (files.length > MAX_FILES) {
            return Response.json({error: `Максимум ${MAX_FILES}`}, { status: 400 })
        }
        for (const file of files) {
            if(!(file instanceof File)) {
                return Response.json({error: "Некоректні дані"}, { status: 400 })
            }
            if(!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                return Response.json({error: "Підтримуються лише .jpeg, .jpg, .png, .webp" }, { status: 400 })
            }
            if (file.size > MAX_FILE_SIZE) {
                return Response.json({ error: "Максимальний розмір файлу 5МБ" }, { status: 400 });
            }
        }

        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            return limit(() => new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        folder: 'uploads',
                        format: 'avif',
                        transformation: [
                            { crop: "fit", quality: "auto:best", fetch_format: "auto" },
                        ],
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
    } catch (error) {
        console.error(error);
        return Response.json({ error: "Upload failed" }, { status: 500 });
    }
}