import { type ClassValue, clsx } from "clsx";
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
