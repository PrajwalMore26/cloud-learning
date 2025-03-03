import { NextResponse } from "next/server";
import { bucket } from "@/lib/gcp";

export async function GET() {
    try {
        const [files] = await bucket.getFiles();
        console.log(
            "files in bucket: ",
            files.map((file) => file.name)
        );
        const urls = await Promise.all(
            files.map(async (file) => {
                const [url] = await file.getSignedUrl({
                    action: "read",
                    expires: Date.now() + 15 * 60 * 1000, // 15 minutes
                });
                return url;
            })
        );
        return NextResponse.json(urls);
    } catch (err) {
        console.error("Error fetching images", err);
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}
