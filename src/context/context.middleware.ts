import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction } from 'express'
import { v4 as v4 } from 'uuid'
import { ContextService } from './context.service'

@Injectable()
export class ContextMiddleware implements NestMiddleware{
	constructor(private readonly service : ContextService) {}

	use(req: any, res: any, next: NextFunction) {
		this.service.run(() => {
			const executionId = v4();
			this.service.set('executionId', executionId);
			next();
		});
	}
}