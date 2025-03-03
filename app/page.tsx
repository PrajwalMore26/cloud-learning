import Image from "next/image";

async function getImages() {
    const res = await fetch("/api/storage/images");
    return await res.json();
}

export default async function Home() {
    const images = await getImages();

    return (
        <div className="grid grid-cols-3 gap-4">
            {images.map((url: string) => (
                <Image
                    key={url}
                    src={url}
                    alt="Uploaded"
                    width={300}
                    height={300}
                    className="object-cover"
                />
            ))}
        </div>
    );
}
