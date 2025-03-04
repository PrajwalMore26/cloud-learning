"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

async function getImages() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/storage/images`
    );
    if (!res.ok) throw new Error("Failed to fetch images");
    return await res.json();
}

export default function Home() {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        getImages().then(setImages).catch(console.error);
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">
                Image Gallery
            </h1>
            <button
                onClick={() => router.push("/upload")}
                className="mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 cursor-pointer"
            >
                Upload Images
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {images.map((url: string) => (
                    <div
                        key={url}
                        className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 cursor-pointer"
                        onClick={() => setSelectedImage(url)}
                    >
                        <Image
                            src={url}
                            alt="Uploaded Image"
                            width={300}
                            height={300}
                            className="object-cover w-full h-60"
                        />
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={() => setSelectedImage(null)}
                >
                    <img
                        src={selectedImage}
                        alt="Full size"
                        className="max-w-4xl max-h-screen"
                    />
                </div>
            )}
        </main>
    );
}
