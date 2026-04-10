const normalizeText = (text) => text.trim();
const uniqueFlags = (flags) => Array.from(new Set(flags));
export const calculateReviewRisk = ({ rating, text, }) => {
    const normalizedText = normalizeText(text);
    const lowerText = normalizedText.toLowerCase();
    const flags = [];
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
    if (normalizedText.length > 0 && normalizedText.length < 20) {
        score += 20;
        flags.push("Review text is very short");
    }
    // Heuristic 3: extreme rating values
    if (rating === 1 || rating === 5) {
        score += 20;
        flags.push("Extreme rating detected");
    }
    // Heuristic 4: repeated punctuation / all-caps text
    const repeatedPunctuationCount = (normalizedText.match(/([!?\.])\1+/g) || [])
        .length;
    const uppercaseCount = (normalizedText.match(/[A-Z]/g) || []).length;
    const uppercaseRatio = normalizedText.length
        ? uppercaseCount / normalizedText.length
        : 0;
    if (repeatedPunctuationCount >= 2 ||
        (uppercaseRatio > 0.5 && normalizedText.length >= 15)) {
        score += 20;
        flags.push("Aggressive or unusual punctuation/casing detected");
    }
    return {
        riskScore: Math.min(Math.max(score, 0), 100),
        flags: uniqueFlags(flags),
    };
};
