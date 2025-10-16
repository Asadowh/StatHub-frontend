import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts height from centimeters to a formatted string with both cm and feet/inches
 * @param cm - Height in centimeters
 * @returns Formatted string like "178 cm (5'10")"
 */
export function formatHeight(cm: string | number): string {
  const heightInCm = typeof cm === 'string' ? parseFloat(cm.replace(/[^\d.]/g, '')) : cm;
  
  if (isNaN(heightInCm) || heightInCm <= 0) {
    return '';
  }
  
  // Convert cm to inches
  const totalInches = heightInCm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  
  return `${heightInCm} cm (${feet}'${inches}")`;
}
