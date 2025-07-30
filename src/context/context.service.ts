import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks'

const storage = new AsyncLocalStorage<Map<string, any>>();

@Injectable()
export class ContextService {
	run(callback: () => void){
		storage.run(new Map(), callback);
	}

	set(key: string, value: any){
		storage.getStore()?.set(key, value);
	}

	get<T = any>(key : string) : T {
		return storage.getStore()?.get(key);
	}
}
