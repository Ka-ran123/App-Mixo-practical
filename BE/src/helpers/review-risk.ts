interface ReviewRiskContext {
  rating: number;
  text: string;
}

interface ReviewRiskResult {
  riskScore: number;
  flags: string[];
}

const normalizeText = (text: string) => text.trim();

const uniqueFlags = (flags: string[]) => Array.from(new Set(flags));

const NEGATIVE_WORDS = [
  "terrible",
  "horrible",
  "awful",
  "worst",
  "hate",
  "disgusting",
  "useless",
  "broken",
  "scam",
  "fraud",
  "waste",
  "disappointed",
  "poor",
  "bad",
  "never again",
];
const POSITIVE_WORDS = [
  "amazing",
  "excellent",
  "fantastic",
  "love",
  "perfect",
  "best",
  "great",
  "awesome",
  "outstanding",
  "wonderful",
];

export const calculateReviewRisk = ({
  rating,
  text,
}: ReviewRiskContext): ReviewRiskResult => {
  const normalizedText = normalizeText(text);
  const lowerText = normalizedText.toLowerCase();
  const flags: string[] = [];
  let score = 0;

  // Heuristic 1: promotional / suspicious phrases
  const suspiciousPhrases = [
    "buy now",
    "limited offer",
    "free",
    "click here",
    "best price",
    "guaranteed",
  ];
  if (suspiciousPhrases.some((phrase) => lowerText.includes(phrase))) {
    score += 25;
    flags.push("Contains promotional or suspicious phrasing");
  }

  // Heuristic 2: very short review text
  if (normalizedText.length > 0 && normalizedText.length < 30) {
    score += 20;
    flags.push("Review text is very short");
  }

  // Heuristic 3: extreme rating values
  if (rating === 1 || rating === 5) {
    score += 20;
    flags.push("Extreme rating detected");
  }

  // Heuristic 4: repeated words (e.g. "great great great")
  const words = lowerText.split(/\s+/).filter(Boolean);
  const wordFreq: Record<string, number> = {};
  words.forEach((w) => {
    wordFreq[w] = (wordFreq[w] || 0) + 1;
  });
  const maxRepeat = Math.max(...Object.values(wordFreq));
  if (words.length >= 4 && maxRepeat / words.length > 0.35) {
    score += 20;
    flags.push("Excessive word repetition detected");
  }

  // Heuristic 5: repeated characters (e.g. "sooooo good", "amazinggggg")
  if (/([a-zA-Z])\1{3,}/.test(normalizedText)) {
    score += 15;
    flags.push("Repeated characters detected");
  }

  // Heuristic 6: rating-sentiment mismatch
  const hasNegativeSentiment = NEGATIVE_WORDS.some((w) =>
    lowerText.includes(w),
  );
  const hasPositiveSentiment = POSITIVE_WORDS.some((w) =>
    lowerText.includes(w),
  );
  if (
    (rating >= 4 && hasNegativeSentiment) ||
    (rating <= 2 && hasPositiveSentiment)
  ) {
    score += 25;
    flags.push("Rating does not match review sentiment");
  }

  return {
    riskScore: Math.min(Math.max(score, 0), 100),
    flags: uniqueFlags(flags),
  };
};
