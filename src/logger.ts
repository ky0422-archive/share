import { Request } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export default (
    req: Request<{}, any, any, ParsedQs, Record<string, any>>,
    suffix?: string
) =>
    console.log(
        `${
            `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}]`
                .green
        } ${req.ip} ${suffix ? `(${suffix.blue})` : ''}`
    );