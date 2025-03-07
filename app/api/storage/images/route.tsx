import { NextResponse } from "next/server";
import { bucket } from "@/lib/gcp";

export async function GET() {
    try {
        const [files] = await bucket.getFiles();

        if (!files.length) {
            console.warn("No files found in bucket.");
            return NextResponse.json({ message: "No files found" });
        }

        const urls = await Promise.all(
            files.map(async (file) => {
                try {
                    // console.log("Generating signed URL for file:", file.name);
                    const [url] = await file.getSignedUrl({
                        action: "read",
                        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
                    });

                    if (!url || typeof url !== "string") {
                        console.warn("Invalid URL generated for:", file.name);
                        return null; // Skip broken URLs
                    }
                    return url;
                } catch (err) {
                    console.error(
                        `Error generating signed URL for file: ${file.name}`,
                        err
                    );
                    return null;
                }
            })
        );

        const validUrls = urls.filter(Boolean); // Remove null values

        return NextResponse.json(validUrls);
    } catch (err) {
        console.error("Error fetching images", err);
        return NextResponse.json(
            { error: "Failed to fetch images" },
            { status: 500 }
        );
    }
}
