/* eslint-disable n/no-process-env */

import { createEnv } from "valibot-env/nextjs";
import * as v from "valibot";

export const env = createEnv({
    schema: {
        private: {
            FOO: v.pipe(v.string(), v.url()),
        },
        public: {
            NEXT_PUBLIC_SITE_NAME: v.string(),
            NEXT_PUBLIC_SITE_URL: v.pipe(v.string(), v.url()),
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
        FOO: process.env.API_URL,
        NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NODE_ENV: process.env.NODE_ENV,
        VERCEL_ENV: process.env.VERCEL_ENV,
    },
});