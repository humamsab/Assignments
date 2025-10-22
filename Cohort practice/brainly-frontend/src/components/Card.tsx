import { useEffect } from "react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube" | "instagram" | "gdocs" | "pdf" | "link";
}

export default function Card({ title, link, type }: CardProps) {
  useEffect(() => {
    if (type === "twitter" && (window as any).twttr?.widgets) {
      (window as any).twttr.widgets.load();
    }
    if (type === "instagram" && (window as any).instgrm?.Embeds) {
      (window as any).instgrm.Embeds.process();
    }
  }, [type, link]);

  return (
    <div
      className="p-4 rounded-md border border-gray-400 bg-gray-50
                 shadow-sm hover:shadow-lg hover:scale-[1.02]
                 transition-all duration-300
                 w-72 min-w-72
                 overflow-hidden"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold">{title}</div>
        <span className="px-2 py-1 rounded-full text-xs font-medium
                        bg-indigo-100 text-indigo-700 capitalize">
          {type}
        </span>
      </div>

      {/* Body */}
      <div className="space-y-2">
        {type === "youtube" && (
          <div className="w-full overflow-hidden rounded">
            <iframe
              className="w-full aspect-video"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

        {type === "twitter" && (
          <blockquote className="twitter-tweet">
            <a href={link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        )}

        {type === "instagram" && (
          <div className="overflow-hidden rounded">
            <blockquote
              className="instagram-media w-full"
              data-instgrm-permalink={link}
              data-instgrm-version="14"
              style={{
                background: "#fff",
                border: 0,
                margin: "0 auto",
                maxWidth: "100%",
              }}
            >
              <a href={link}></a>
            </blockquote>
          </div>
        )}

        {type === "gdocs" && (
          <iframe className="w-full aspect-video rounded" src={link}></iframe>
        )}

        {type === "pdf" && (
          <iframe
            className="w-full aspect-video rounded"
            src={link}
            type="application/pdf"
          ></iframe>
        )}

        {type === "link" && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {link}
          </a>
        )}
      </div>
    </div>
  );
}
