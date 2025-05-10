function summarizeText(text) {
    if (!text || typeof text !== "string") {
        return "No valid text provided.";
    }

    // Convert to lower case and tokenize the text
    const words = text.toLowerCase().split(/\s+/);

    // Define a simple stop word list
    const stopWords = new Set([
        "what",
        "is",
        "the",
        "tell",
        "me",
        "more",
        "about",
        "in",
        "a",
        "an",
        "and",
        "for",
        "to",
        "are",
        "who",
        "when",
        "where",
        "how",
        "?",
    ]);

    // Filter out stop words
    const filteredWords = words.filter((word) => !stopWords.has(word));

    // If no words remain after filtering, return the original text or a short summary.
    if (filteredWords.length === 0) {
        return text.length <= 50 ? text : text.slice(0, 50) + "...";
    }

    // For a simple summary, we join the top 4 keywords or all if less than 4.
    const summaryWordCount = Math.min(6, filteredWords.length);
    const summary = filteredWords.slice(0, summaryWordCount).join(" ");

    return summary;
}

export default summarizeText;