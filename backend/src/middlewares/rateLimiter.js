// rateLimiter.js
import rateLimit from 'express-rate-limit';

// Apply to all requests: 100 requests per 15 minutes per IP
export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10, // Limit each IP to 10 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Send rate limit info in headers
  legacyHeaders: false,  // Disable X-RateLimit-* headers
});
