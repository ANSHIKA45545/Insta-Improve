import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs){
    return twMerge(clsx(inputs))
}

export const readFileAsDataURL = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Error reading file"));
        reader.readAsDataURL(file);
    })
}