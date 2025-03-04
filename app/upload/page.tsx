"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("image", file);

        try {
            await axios.post("/api/storage/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Uploaded!");
        } catch {
            alert("Upload failed");
        }
    };
    const Router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-4 p-6 bg-white shadow-md rounded-2xl w-full max-w-md mx-auto"
            >
                <input
                    type="file"
                    className="block w-full text-sm text-gray-500 
                       file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100 cursor-pointer"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <button
                    type="submit"
                    className="w-full px-6 py-2 text-white bg-blue-600 
                       rounded-lg shadow-md hover:bg-blue-700 
                       transition-all duration-300 cursor-pointer"
                >
                    Upload
                </button>
            </form>
            <div>
                <button
                    onClick={() => Router.push("/")}
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer"
                >
                    Back to Gallery
                </button>
            </div>
        </div>
    );
}
