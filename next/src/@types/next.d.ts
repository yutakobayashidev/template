// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import type { NextApiRequest, NextApiResponse } from 'next';

declare module "next" {
    export type NextSegmentPage<
        Props extends {
            params?: Record<string, string | string[]>;
        } = object,
    > = React.FC<{
        params: Promise<Props["params"]>;
        searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
    }>;

    export type StrictNextApiRequest = Omit<NextApiRequest, 'body'> & {
        body: unknown;
    };

    export type StrictNextApiHandler = (req: StrictNextApiRequest, res: NextApiResponse) => void | Promise<void>;
}