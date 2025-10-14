export interface CountryData {
  name: string;
  code: string;
  flag: string;
  colors: string[];
}

export const countryDatabase: CountryData[] = [
  { name: "Portugal", code: "PT", flag: "🇵🇹", colors: ["#006600", "#FF0000"] },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", colors: ["#00B5E2", "#ED2939", "#3F9C35"] },
  { name: "Turkey", code: "TR", flag: "🇹🇷", colors: ["#E30A17", "#FFFFFF"] },
  { name: "United States", code: "US", flag: "🇺🇸", colors: ["#B22234", "#3C3B6E"] },
  { name: "United Kingdom", code: "GB-UK", flag: "🇬🇧", colors: ["#012169", "#C8102E"] },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", colors: ["#00732F", "#FF0000"] },
  { name: "Brazil", code: "BR", flag: "🇧🇷", colors: ["#009C3B", "#FFDF00"] },
  { name: "Argentina", code: "AR", flag: "🇦🇷", colors: ["#74ACDF", "#FFFFFF"] },
  { name: "Spain", code: "ES", flag: "🇪🇸", colors: ["#AA151B", "#F1BF00"] },
  { name: "Germany", code: "DE", flag: "🇩🇪", colors: ["#000000", "#DD0000", "#FFCE00"] },
  { name: "France", code: "FR", flag: "🇫🇷", colors: ["#002395", "#ED2939"] },
  { name: "England", code: "GB-ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", colors: ["#FFFFFF", "#CE1124"] },
  { name: "Italy", code: "IT", flag: "🇮🇹", colors: ["#009246", "#CE2B37"] },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", colors: ["#AE1C28", "#21468B"] },
  { name: "Colombia", code: "CO", flag: "🇨🇴", colors: ["#FCD116", "#003893", "#CE1126"] },
  { name: "Mexico", code: "MX", flag: "🇲🇽", colors: ["#006847", "#CE1126"] },
  { name: "Japan", code: "JP", flag: "🇯🇵", colors: ["#FFFFFF", "#BC002D"] },
  { name: "South Korea", code: "KR", flag: "🇰🇷", colors: ["#C60C30", "#003478"] },
  { name: "Belgium", code: "BE", flag: "🇧🇪", colors: ["#FDDA24", "#EF3340"] },
  { name: "Croatia", code: "HR", flag: "🇭🇷", colors: ["#FF0000", "#171796"] },
  { name: "Morocco", code: "MA", flag: "🇲🇦", colors: ["#C1272D", "#006233"] },
  { name: "Senegal", code: "SN", flag: "🇸🇳", colors: ["#00853F", "#FDEF42", "#E31B23"] },
];

export function findCountryByName(input: string): CountryData | null {
  const searchTerm = input.toLowerCase().trim();
  
  // Exact match
  const exactMatch = countryDatabase.find(
    c => c.name.toLowerCase() === searchTerm || c.code.toLowerCase() === searchTerm
  );
  if (exactMatch) return exactMatch;
  
  // Partial match
  const partialMatch = countryDatabase.find(
    c => c.name.toLowerCase().includes(searchTerm) || searchTerm.includes(c.name.toLowerCase())
  );
  
  return partialMatch || null;
}

export function getGradientFromColors(colors: string[]): string {
  if (colors.length === 1) {
    return `linear-gradient(135deg, ${colors[0]}, ${colors[0]})`;
  }
  if (colors.length === 2) {
    return `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`;
  }
  return `linear-gradient(135deg, ${colors[0]}, ${colors[1]}, ${colors[2] || colors[0]})`;
}
