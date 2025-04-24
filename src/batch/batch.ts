import type * as React from "react";
import type { EmailApiOptions } from "../common/interfaces/email-api-options.interface";
import { parseEmailToApiOptions } from "../common/utils/parse-email-to-api-options";
import type { Resend } from "../resend";
import type {
	CreateBatchOptions,
	CreateBatchRequestOptions,
	CreateBatchResponse,
	CreateBatchSuccessResponse,
} from "./interfaces/create-batch-options.interface";
import { render } from "../common/utils/render";

export class Batch {
	constructor(private readonly resend: Resend) {}

	async send(
		payload: CreateBatchOptions,
		options: CreateBatchRequestOptions = {},
	): Promise<CreateBatchResponse> {
		return this.create(payload, options);
	}

	async create(
		payload: CreateBatchOptions,
		options: CreateBatchRequestOptions = {},
	): Promise<CreateBatchResponse> {
		const emails: EmailApiOptions[] = [];

		for (const email of payload) {
			if (email.react) {
				email.html = await render(email.react as React.ReactElement);
				email.react = undefined;
			}

			emails.push(parseEmailToApiOptions(email));
		}

		const data = await this.resend.post<CreateBatchSuccessResponse>(
			"/emails/batch",
			emails,
			options,
		);

		return data;
	}
}
