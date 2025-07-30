import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule'
import { ContextService } from 'src/context/context.service'
import { v4 } from 'uuid';

@Injectable()
export class CronService {
	constructor(private readonly service : ContextService){}

	@Cron('*/30 * * * *')
	public cronCall(){
		this.service.run(() => {
			const executionId = v4();
			this.service.set('executionId', executionId);
			console.log('cron execution id :', this.service.get('executionId'));
		})
	}
}
