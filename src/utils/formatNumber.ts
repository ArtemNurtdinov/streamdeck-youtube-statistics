export function formatNumber(value: unknown): string {
    const parsed = Number.parseInt(String(value ?? "0"), 10);
    if (!Number.isFinite(parsed) || Number.isNaN(parsed) || parsed < 0) {
        return "0";
    }

    if (parsed >= 100000000) {
        return `${(parsed / 1000000).toFixed(1)}M`;
    }
    if (parsed >= 1000000) {
        return `${(parsed / 1000000).toFixed(2)}M`;
    }
    if (parsed >= 100000) {
        return `${(parsed / 1000).toFixed(1)}K`;
    }
    if (parsed >= 10000) {
        return `${(parsed / 1000).toFixed(2)}K`;
    }

    return String(parsed);
}
