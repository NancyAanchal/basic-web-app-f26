function power(base: number, exp: number): string {
  let result = BigInt(1);
  const b = BigInt(base);
  for (let i = 0; i < exp; i++) {
    result = result * b;
  }
  return result.toString();
}

export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("andrew id")) {
    return "njha";
  }

  // "What is 83 to the power of 93?"
  const powMatch = q.match(/(-?\d+)\s+to the power of\s+(\d+)/);
  if (powMatch) {
    return power(Number(powMatch[1]), Number(powMatch[2]));
  }

  // "What is 9 plus 85?"
  const plusMatch = q.match(/(-?\d+)\s+plus\s+(-?\d+)/);
  if (plusMatch) {
    return String(Number(plusMatch[1]) + Number(plusMatch[2]));
  }

  const minusMatch = q.match(/(-?\d+)\s+minus\s+(-?\d+)/);
  if (minusMatch) {
    return String(Number(minusMatch[1]) - Number(minusMatch[2]));
  }

  const mulMatch = q.match(/(-?\d+)\s+multiplied by\s+(-?\d+)/);
  if (mulMatch) {
    return (BigInt(mulMatch[1]) * BigInt(mulMatch[2])).toString();
  }

  const divMatch = q.match(/(-?\d+)\s+divided by\s+(-?\d+)/);
  if (divMatch) {
    return String(Number(divMatch[1]) / Number(divMatch[2]));
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