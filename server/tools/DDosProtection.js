import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests",
    },
});
export const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 50,
    delayMs: () => 500,
});
const allowedBrowsers = [
    /Chrome/i,
    /Firefox/i,
    /Edg/i,
    /OPR/i,
    /Safari/i,
];
const blockedAgents = [
    /curl/i,
    /wget/i,
    /postman/i,
    /insomnia/i,
    /httpclient/i,
    /bot/i,
    /spider/i,
    /crawl/i,
    /ReactNative/i,
    /FBAN/i,
    /FBAV/i,
    /Instagram/i,
    /TikTok/i,
    /Snapchat/i,
    /wv/i,
    /WebView/i,
];
export const browserOnly = (request, response, next) => {
    const ua = request.headers["user-agent"] || "";
    if (blockedAgents.some(r => r.test(ua))) {
        return response.status(403).json({
            success: false,
            message: "Apps, bots, and WebViews are not allowed",
        });
    }
    if (!allowedBrowsers.some(r => r.test(ua))) {
        return response.status(403).json({
            success: false,
            message: "Only real browsers are allowed",
        });
    }
    if (!request.headers["accept"] || !request.headers["accept-language"] || !request.headers["sec-fetch-site"]) {
        return response.status(403).json({
            success: false,
            message: "Invalid browser request",
        });
    }
    next();
};