/* eslint-disable n/no-process-env */

import { createEnv } from "valibot-env/nextjs";
import * as v from "valibot";

export const env = createEnv({
    schema: {
        public: {
            NEXT_PUBLIC_SITE_URL: v.pipe(v.string(), v.url()),
            NEXT_PUBLIC_SITE_NAME: v.string(),
        },
        private: {
            FOO: v.pipe(v.string(), v.url()),
        },
        shared: {
            NODE_ENV: v.union([v.literal("development"), v.literal("production")]),
            VERCEL_ENV: v.union([
                v.literal("development"),
                v.literal("preview"),
                v.literal("production"),
            ]),
        },
    },
    values: {
        NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        FOO: process.env.API_URL,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
    },
});