import { dirname, join } from 'node:path';
import FetchAdapter from '@pollyjs/adapter-fetch';
import { Polly } from '@pollyjs/core';
import FsPersister from '@pollyjs/persister-fs';

Polly.register(FetchAdapter);
Polly.register(FsPersister);

export function setupPolly() {
  const { currentTestName, testPath } = expect.getState();
  if (!currentTestName || !testPath) {
    throw new Error('setupPolly must be called within a test context');
  }

  const polly = new Polly(currentTestName, {
    adapters: ['fetch'],
    persister: 'fs',
    persisterOptions: {
      fs: {
        recordingsDir: join(dirname(testPath), '__recordings__'),
      },
    },
    mode: process.env.TEST_MODE === 'record' ? 'record' : 'replay',
    recordIfMissing: process.env.TEST_MODE === 'dev',
    recordFailedRequests: true,
    logLevel: 'error',
    matchRequestsBy: {
      headers: function normalizeHeadersForMatching(headers) {
        // Match all headers exactly, except authorization and user-agent, which
        // should match based on presence only
        const normalizedHeaders = { ...headers };
        if ('authorization' in normalizedHeaders) {
          normalizedHeaders.authorization = 'present';
        }
        if ('user-agent' in normalizedHeaders) {
          normalizedHeaders['user-agent'] = 'present';
        }
        return normalizedHeaders;
      },
    },
  });

  // Redact API keys from recordings before saving them
  polly.server.any().on('beforePersist', (_, recording) => {
    const resendApiKeyRegex = /re_[a-zA-Z0-9]{8}_[a-zA-Z0-9]{24}/g;
    const redactApiKeys = (value: string) =>
      value.replace(resendApiKeyRegex, 're_REDACTED_API_KEY');

    recording.request.headers = recording.request.headers.map(
      ({ name, value }: { name: string; value: string }) => ({
        name,
        value: redactApiKeys(value),
      }),
    );
    if (recording.request.postData?.text) {
      recording.request.postData.text = redactApiKeys(
        recording.request.postData.text,
      );
    }
    if (recording.response.content?.text) {
      recording.response.content.text = redactApiKeys(
        recording.response.content.text,
      );
    }
  });

  return polly;
}
