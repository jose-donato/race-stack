import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomLinearGradient() {
  let randomHue1 = Math.floor(Math.random() * 360);
  let randomHue2 = Math.floor(Math.random() * 360);
  let randomColor1 = `hsl(${randomHue1}, 100%, 50%)`;
  let randomColor2 = `hsl(${randomHue2}, 100%, 50%)`;
  return `linear-gradient(to right, ${randomColor1}, ${randomColor2})`;
}
