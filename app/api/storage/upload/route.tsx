import { NextResponse } from "next/server";
import { bucket } from "@/lib/gcp";

export async function POST(req: Request) {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file) {
        return NextResponse.json(
            { error: "No file uploaded" },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const blob = bucket.file(file.name);

    try {
        await blob.save(buffer);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
