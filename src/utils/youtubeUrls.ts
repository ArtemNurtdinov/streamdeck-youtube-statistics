const VIDEO_URL_FORMAT = "https://www.youtube.com/watch?v=";
const CHANNEL_URL_FORMAT = "https://www.youtube.com/channel/";

export function getYouTubeVideoUrl(video: string): string {
    if (video.includes("youtube.com") || video.includes("youtu.be")) {
        return video;
    }
    return `${VIDEO_URL_FORMAT}${video}`;
}

export function getYouTubeChannelUrl(channelId: string): string {
    if (channelId.includes("youtube.com")) {
        return channelId;
    }
    return `${CHANNEL_URL_FORMAT}${channelId}`;
}

export function getYouTubeStreamUrl(stream: string): string {
    if (stream.includes("youtube.com") || stream.includes("youtu.be")) {
        return stream;
    }
    return `${VIDEO_URL_FORMAT}${stream}`;
}

export function extractVideoId(input: string): string {
    return extractYouTubeId(input);
}

export function extractStreamId(input: string): string {
    return extractYouTubeId(input);
}

function extractYouTubeId(input: string): string {
    const value = input?.trim();
    if (!value) {
        return "";
    }

    let normalized = value;
    if ((value.includes("youtube.com") || value.includes("youtu.be")) && !/^[a-z]+:\/\//i.test(value)) {
        normalized = `https://${value}`;
    }

    if (!normalized.includes("youtube.com") && !normalized.includes("youtu.be")) {
        return cleanId(value);
    }

    try {
        const parsed = new URL(normalized);
        const host = parsed.hostname.replace(/^www\./i, "").replace(/^m\./i, "");
        const pathParts = parsed.pathname.split("/").filter(Boolean);

        if (host.includes("youtu.be")) {
            return cleanId(pathParts[0] ?? "");
        }

        const shortPathPrefix = pathParts[0];
        if (shortPathPrefix === "shorts" || shortPathPrefix === "live" || shortPathPrefix === "embed") {
            return cleanId(pathParts[1] ?? "");
        }

        const videoIdFromQuery = parsed.searchParams.get("v");
        if (videoIdFromQuery) {
            return cleanId(videoIdFromQuery);
        }

        return cleanId(pathParts[pathParts.length - 1] ?? "");
    } catch {
        const regexMatch = value.match(/[?&]v=([^&]+)/i);
        if (regexMatch?.[1]) {
            return cleanId(regexMatch[1]);
        }
        return cleanId(value);
    }
}

function cleanId(value: string): string {
    return String(value ?? "").trim().split(/[?&#/]/)[0] ?? "";
}
