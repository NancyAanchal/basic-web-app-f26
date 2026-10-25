export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("andrew id")) {
    return "njha";
  }

   const plusMatch = q.match(/(-?\d+)\s+plus\s+(-?\d+)/);
  if (plusMatch) {
    return String(Number(plusMatch[1]) + Number(plusMatch[2]));
  }

  // "Which of the following numbers is the largest: 61, 40, 14?"
  if (q.includes("largest")) {
    const afterColon = q.includes(":") ? q.split(":")[1] : q;
    const nums = afterColon.match(/-?\d+/g);
    if (nums) {
      return String(Math.max(...nums.map(Number)));
    }
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