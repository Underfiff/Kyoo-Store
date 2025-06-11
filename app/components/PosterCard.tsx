import Image from "next/image";

export default function PosterCard({
  src,
  link,
}: {
  src: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform transform hover:scale-105"
    >
      <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg">
        <Image
          src={src}
          alt="Poster"
          width={400}
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
    </a>
  );
}
