import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToStream(str: string) {
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    start(controller) {
      const buffer = encoder.encode(str);
      controller.enqueue(buffer);
      controller.close();
    },
  });
  return readableStream;
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") {
    return path;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path}`;
  }
  return `http://localhost:${process.env.port ?? 3000}${path}`;
}

export function constructMetadata({
  title = "Quill - the SaaS for students.",
  description = "Quill is an open source software to make chatting to your PDF files easy.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@Jeetjyoti_Deka",
    },
    icons,
    metadataBase: new URL("https://saas-quill-yt.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
