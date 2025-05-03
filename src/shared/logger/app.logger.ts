import { ConsoleLogger, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AppLogger extends ConsoleLogger {
    constructor(
        @Inject(REQUEST) private request: Request
    ){
        super();
    }

    log(message: string, context?: string) {
        const requestId = this.request?.['requestId'] ?? 'INIT';
        message = `ID [${requestId}]: ${message}`;
        super.log(message, context);
    }

    error(message: string, trace?: string, context?: string) {
        const requestId = this.request?.['requestId'] ?? 'INIT';
        message = `ID [${requestId}]: ${message}`;
        super.error(message, trace, context);
    }

    warn(message: string, context?: string) {
        const requestId = this.request?.['requestId'] ?? 'INIT';
        message = `ID [${requestId}]: ${message}`;
        super.warn(message, context);
    }

    debug(message: string, context?: string) {
        const requestId = this.request?.['requestId'] ?? 'INIT';
        message = `ID [${requestId}]: ${message}`;
        super.debug?.(message, context); // Optional, depending on config
    }

    verbose(message: string, context?: string) {
        const requestId = this.request?.['requestId'] ?? 'INIT';
        message = `ID [${requestId}]: ${message}`;
        super.verbose?.(message, context);
    }
}
