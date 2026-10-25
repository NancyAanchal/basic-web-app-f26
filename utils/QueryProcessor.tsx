export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("andrew id")) {
    return "njha";
  }

  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (q.includes("name")) {
    return "Nanzee";
  }

  if (q.includes("age")) {
    return "67";
  }

  return "";
}