import type { Response } from '../../interfaces';
import type { Log } from './log';

export type GetLogResponseSuccess = { object: 'log' } & Log;

export type GetLogResponse = Response<GetLogResponseSuccess>;
