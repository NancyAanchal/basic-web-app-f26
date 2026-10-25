function bigPow(base: bigint, exp: bigint): bigint {
  let result = BigInt(1);
  const n = Number(exp);
  for (let i = 0; i < n; i++) {
    result = result * base;
  }
  return result;
}

// Precedence-aware evaluator: ^ then * / then + -
function evalTokens(tokens: string[], big: boolean): any {
  let pos = 0;
  const num = (s: string): any => (big ? BigInt(s) : Number(s));

  const parseAtom = (): any => {
    const t = tokens[pos++];
    if (t === "-") return -parseAtom();
    if (t === "(") {
      const v = parseAdd();
      pos++; // skip ")"
      return v;
    }
    return num(t);
  };

  const parsePow = (): any => {
    const base = parseAtom();
    if (tokens[pos] === "^") {
      pos++;
      const exp = parsePow();
      return big ? bigPow(base, exp) : Math.pow(base, exp);
    }
    return base;
  };

    const parseMul = (): any => {
    let l: any = parsePow();
    while (tokens[pos] === "*" || tokens[pos] === "/") {
      const op = tokens[pos++];
      const r: any = parsePow();
      if (op === "*") {
        l = l * r;
      } else if (big) {
        const lb = l as bigint;
        const rb = r as bigint;
        if (rb === BigInt(0) || lb % rb !== BigInt(0)) throw new Error("inexact");
        l = lb / rb;
      } else {
        l = l / r;
      }
    }
    return l;
  };

  const parseAdd = (): any => {
    let l = parseMul();
    while (tokens[pos] === "+" || tokens[pos] === "-") {
      const op = tokens[pos++];
      const r = parseMul();
      l = op === "+" ? l + r : l - r;
    }
    return l;
  };

  return parseAdd();
}

function solveMath(q: string): string | null {
  const expr = q
    .replace(/to the power of/g, "^")
    .replace(/multiplied by|times/g, "*")
    .replace(/divided by/g, "/")
    .replace(/plus|added to/g, "+")
    .replace(/minus|subtracted by/g, "-");

  const m = expr.match(/-?\d[\d\s+\-*/^().]*\d|-?\d/);
  if (!m || !/[+\-*/^]/.test(m[0].slice(1))) return null;

  const tokens = m[0].match(/\d+(?:\.\d+)?|[+\-*/^()]/g);
  if (!tokens) return null;

  try {
    return evalTokens(tokens, true).toString();
  } catch (e) {
    try {
      const v = evalTokens(tokens, false);
      if (typeof v === "number" && isFinite(v)) return String(v);
    } catch (e2) {
      // fall through
    }
  }
  return null;
}

export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();

  if (q.includes("andrew id")) {
    return "njha";
  }

  // "Which of the following numbers is the largest: 61, 40, 14?"
  if (q.includes("largest")) {
    const afterColon = q.includes(":") ? q.split(":")[1] : q;
    const nums = afterColon.match(/-?\d+/g);
    if (nums) {
      return String(Math.max(...nums.map(Number)));
    }
  }

  // "add 5 and 3", "add 5 to 3", "divide 20 by 4"
  const addMatch = q.match(/\badd\s+(-?\d+)\s+(?:and|to)\s+(-?\d+)/);
  if (addMatch) {
    return String(Number(addMatch[1]) + Number(addMatch[2]));
  }
  const divideMatch = q.match(/\bdivide\s+(-?\d+)\s+by\s+(-?\d+)/);
  if (divideMatch) {
    return String(Number(divideMatch[1]) / Number(divideMatch[2]));
  }

  const math = solveMath(q);
  if (math !== null) {
    return math;
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