export interface CountryData {
  name: string;
  code: string;
  flag: string;
  colors: string[];
}

export const countryDatabase: CountryData[] = [
  // Europe
  { name: "Portugal", code: "PT", flag: "🇵🇹", colors: ["#006600", "#FF0000"] },
  { name: "Spain", code: "ES", flag: "🇪🇸", colors: ["#AA151B", "#F1BF00"] },
  { name: "France", code: "FR", flag: "🇫🇷", colors: ["#002395", "#ED2939"] },
  { name: "Germany", code: "DE", flag: "🇩🇪", colors: ["#000000", "#DD0000", "#FFCE00"] },
  { name: "Italy", code: "IT", flag: "🇮🇹", colors: ["#009246", "#CE2B37"] },
  { name: "England", code: "GB-ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", colors: ["#FFFFFF", "#CE1124"] },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", colors: ["#012169", "#C8102E"] },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", colors: ["#AE1C28", "#21468B"] },
  { name: "Belgium", code: "BE", flag: "🇧🇪", colors: ["#FDDA24", "#EF3340"] },
  { name: "Croatia", code: "HR", flag: "🇭🇷", colors: ["#FF0000", "#171796"] },
  { name: "Poland", code: "PL", flag: "🇵🇱", colors: ["#FFFFFF", "#DC143C"] },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", colors: ["#005BBB", "#FFD500"] },
  { name: "Sweden", code: "SE", flag: "🇸🇪", colors: ["#006AA7", "#FECC00"] },
  { name: "Norway", code: "NO", flag: "🇳🇴", colors: ["#EF2B2D", "#002868"] },
  { name: "Denmark", code: "DK", flag: "🇩🇰", colors: ["#C60C30", "#FFFFFF"] },
  { name: "Finland", code: "FI", flag: "🇫🇮", colors: ["#003580", "#FFFFFF"] },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", colors: ["#FF0000", "#FFFFFF"] },
  { name: "Austria", code: "AT", flag: "🇦🇹", colors: ["#ED2939", "#FFFFFF"] },
  { name: "Greece", code: "GR", flag: "🇬🇷", colors: ["#0D5EAF", "#FFFFFF"] },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿", colors: ["#D7141A", "#11457E"] },
  { name: "Romania", code: "RO", flag: "🇷🇴", colors: ["#002B7F", "#FCD116", "#CE1126"] },
  { name: "Hungary", code: "HU", flag: "🇭🇺", colors: ["#CE2939", "#FFFFFF", "#477050"] },
  { name: "Serbia", code: "RS", flag: "🇷🇸", colors: ["#C6363C", "#0C4076"] },
  { name: "Slovenia", code: "SI", flag: "🇸🇮", colors: ["#005DA4", "#ED1C24"] },
  { name: "Slovakia", code: "SK", flag: "🇸🇰", colors: ["#0B4EA2", "#EE1C25"] },
  { name: "Bosnia", code: "BA", flag: "🇧🇦", colors: ["#002395", "#FECB00"] },
  { name: "Iceland", code: "IS", flag: "🇮🇸", colors: ["#02529C", "#DC1E35"] },
  { name: "Ireland", code: "IE", flag: "🇮🇪", colors: ["#169B62", "#FF883E"] },
  { name: "Scotland", code: "GB-SCT", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", colors: ["#005EB8", "#FFFFFF"] },
  { name: "Wales", code: "GB-WLS", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿", colors: ["#00AB39", "#FFFFFF", "#C8102E"] },
  { name: "Russia", code: "RU", flag: "🇷🇺", colors: ["#FFFFFF", "#0039A6", "#D52B1E"] },
  
  // Asia & Middle East
  { name: "Turkey", code: "TR", flag: "🇹🇷", colors: ["#E30A17", "#FFFFFF"] },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", colors: ["#00B5E2", "#ED2939", "#3F9C35"] },
  { name: "Georgia", code: "GE", flag: "🇬🇪", colors: ["#FF0000", "#FFFFFF"] },
  { name: "Armenia", code: "AM", flag: "🇦🇲", colors: ["#D90012", "#0033A0", "#F2A800"] },
  { name: "Iran", code: "IR", flag: "🇮🇷", colors: ["#239F40", "#DA0000"] },
  { name: "Iraq", code: "IQ", flag: "🇮🇶", colors: ["#CE1126", "#FFFFFF", "#007A3D"] },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", colors: ["#006C35", "#FFFFFF"] },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", colors: ["#00732F", "#FF0000"] },
  { name: "Qatar", code: "QA", flag: "🇶🇦", colors: ["#8D1B3D", "#FFFFFF"] },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", colors: ["#007A3D", "#CE1126"] },
  { name: "Israel", code: "IL", flag: "🇮🇱", colors: ["#0038B8", "#FFFFFF"] },
  { name: "Japan", code: "JP", flag: "🇯🇵", colors: ["#FFFFFF", "#BC002D"] },
  { name: "South Korea", code: "KR", flag: "🇰🇷", colors: ["#C60C30", "#003478"] },
  { name: "China", code: "CN", flag: "🇨🇳", colors: ["#DE2910", "#FFDE00"] },
  { name: "India", code: "IN", flag: "🇮🇳", colors: ["#FF9933", "#138808"] },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", colors: ["#01411C", "#FFFFFF"] },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", colors: ["#FF0000", "#FFFFFF"] },
  { name: "Thailand", code: "TH", flag: "🇹🇭", colors: ["#A51931", "#2D2A4A"] },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", colors: ["#DA251D", "#FFCD00"] },
  { name: "Philippines", code: "PH", flag: "🇵🇭", colors: ["#0038A8", "#CE1126"] },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", colors: ["#010066", "#CC0001"] },
  { name: "Singapore", code: "SG", flag: "🇸🇬", colors: ["#ED2939", "#FFFFFF"] },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", colors: ["#00AFCA", "#FEC50C"] },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿", colors: ["#1EB53A", "#0099B5"] },
  
  // Americas
  { name: "United States", code: "US", flag: "🇺🇸", colors: ["#B22234", "#3C3B6E"] },
  { name: "Canada", code: "CA", flag: "🇨🇦", colors: ["#FF0000", "#FFFFFF"] },
  { name: "Mexico", code: "MX", flag: "🇲🇽", colors: ["#006847", "#CE1126"] },
  { name: "Brazil", code: "BR", flag: "🇧🇷", colors: ["#009C3B", "#FFDF00"] },
  { name: "Argentina", code: "AR", flag: "🇦🇷", colors: ["#74ACDF", "#FFFFFF"] },
  { name: "Colombia", code: "CO", flag: "🇨🇴", colors: ["#FCD116", "#003893", "#CE1126"] },
  { name: "Chile", code: "CL", flag: "🇨🇱", colors: ["#D52B1E", "#0039A6"] },
  { name: "Peru", code: "PE", flag: "🇵🇪", colors: ["#D91023", "#FFFFFF"] },
  { name: "Venezuela", code: "VE", flag: "🇻🇪", colors: ["#FFCC00", "#00247D", "#CF142B"] },
  { name: "Ecuador", code: "EC", flag: "🇪🇨", colors: ["#FFD100", "#034EA2"] },
  { name: "Uruguay", code: "UY", flag: "🇺🇾", colors: ["#0038A8", "#FFFFFF"] },
  { name: "Paraguay", code: "PY", flag: "🇵🇾", colors: ["#D52B1E", "#0038A8"] },
  { name: "Bolivia", code: "BO", flag: "🇧🇴", colors: ["#007934", "#D52B1E", "#F9E300"] },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷", colors: ["#002B7F", "#CE1126"] },
  { name: "Panama", code: "PA", flag: "🇵🇦", colors: ["#005293", "#D21034"] },
  { name: "Jamaica", code: "JM", flag: "🇯🇲", colors: ["#009B3A", "#FED100"] },
  { name: "Cuba", code: "CU", flag: "🇨🇺", colors: ["#002A8F", "#CB1515"] },
  { name: "Honduras", code: "HN", flag: "🇭🇳", colors: ["#0073CF", "#FFFFFF"] },
  { name: "El Salvador", code: "SV", flag: "🇸🇻", colors: ["#0F47AF", "#FFFFFF"] },
  { name: "Guatemala", code: "GT", flag: "🇬🇹", colors: ["#4997D0", "#FFFFFF"] },
  
  // Africa
  { name: "Morocco", code: "MA", flag: "🇲🇦", colors: ["#C1272D", "#006233"] },
  { name: "Algeria", code: "DZ", flag: "🇩🇿", colors: ["#006233", "#D21034"] },
  { name: "Tunisia", code: "TN", flag: "🇹🇳", colors: ["#E70013", "#FFFFFF"] },
  { name: "Egypt", code: "EG", flag: "🇪🇬", colors: ["#CE1126", "#000000"] },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", colors: ["#008751", "#FFFFFF"] },
  { name: "Ghana", code: "GH", flag: "🇬🇭", colors: ["#006B3F", "#FCD116", "#CE1126"] },
  { name: "Senegal", code: "SN", flag: "🇸🇳", colors: ["#00853F", "#FDEF42", "#E31B23"] },
  { name: "Cameroon", code: "CM", flag: "🇨🇲", colors: ["#007A5E", "#CE1126", "#FCD116"] },
  { name: "Ivory Coast", code: "CI", flag: "🇨🇮", colors: ["#F77F00", "#FFFFFF", "#009E60"] },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", colors: ["#007A4D", "#FFB612", "#DE3831"] },
  { name: "Kenya", code: "KE", flag: "🇰🇪", colors: ["#006600", "#BB0000"] },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", colors: ["#1EB53A", "#00A3DD"] },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", colors: ["#078930", "#FCDD09", "#DA121A"] },
  { name: "DR Congo", code: "CD", flag: "🇨🇩", colors: ["#007FFF", "#F7D618", "#CE1021"] },
  { name: "Mali", code: "ML", flag: "🇲🇱", colors: ["#14B53A", "#FCD116", "#CE1126"] },
  
  // Oceania
  { name: "Australia", code: "AU", flag: "🇦🇺", colors: ["#00008B", "#FFFFFF"] },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", colors: ["#00247D", "#CC142B"] },
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
