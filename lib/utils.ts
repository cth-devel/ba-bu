import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Pauses all video elements on the page to prevent play() interruption errors during navigation
 */
export function pauseAllVideos() {
  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    if (!video.paused) {
      video.pause();
    }
  });
}

/**
 * Normalizes image paths to handle spaces correctly by URL-encoding them.
 * Accepts paths with or without spaces and ensures they work correctly.
 * @param imagePath - The image path (e.g., "/images/WEDDING/WEDDING (1).webp")
 * @returns Normalized path with spaces properly encoded (e.g., "/images/WEDDING/WEDDING%20(1).webp")
 */
export function normalizeImagePath(imagePath: string): string {
  if (!imagePath) return imagePath;

  // Split the path into parts: directory path and filename
  const parts = imagePath.split('/');
  const filename = parts.pop();

  if (!filename) return imagePath;

  // Replace spaces with %20 in the filename only (preserve other characters like parentheses)
  const encodedFilename = filename.replace(/ /g, '%20');

  // Reconstruct the path with encoded filename
  return [...parts, encodedFilename].join('/');
}
