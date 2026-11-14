# resend-node

## What this codebase does

`resend` on npm: the official Node.js/TypeScript SDK for the Resend email
API, built to ESM and CJS from `src/index.ts`. It is a client library with
no server, routes, database or CLI, and no notion of end users or sessions.
One `Resend` class owns a resource class per API area (`emails`, `batch`,
`contacts`, `domains`, `webhooks`, `inboxes`, …). Each method builds a
request path and calls `Resend.get/post/put/patch/delete`, which all go
through `Resend.fetchRequest` and return `{ data, error, headers }` instead
of throwing. It runs on Node 20+ and edge runtimes (global `fetch`, guarded
`process` access). Runtime dependencies are `postal-mime` and
`standardwebhooks`; `@react-email/render` is an optional peer for the
`react` email option. `e2e/` holds bundler smoke fixtures and
`.github/workflows/` the CI and npm release pipeline.

## Auth shape

- `new Resend(key)` or `RESEND_API_KEY`: the key is kept on `resend.key`
  and sent as `Authorization: Bearer` on every `fetchRequest` call. The SDK
  holds this secret; it does not authenticate its own callers.
- `baseUrl` (constructor option or `RESEND_BASE_URL`) picks the host that
  receives the key. The default is `https://api.resend.com`.
- `RequestOptions.headers` are merged over the default headers per request,
  and `idempotencyKey` becomes the `Idempotency-Key` header.
- `hasDotSegment` runs in `fetchRequest` and rejects any path with a `.` or
  `..` segment (percent-encoded, backslash and whitespace forms included)
  before the request is sent.
- `resend.webhooks.verify({ payload, headers, webhookSecret })` wraps
  `standardwebhooks`. It is the only check on inbound data and needs the
  raw body string.

## Threat model

- API key disclosure. The key gives full account access: send as the
  customer's domains, read contacts and received mail, create API keys. It
  can leak by going to a host other than `baseUrl`, into logs or error
  objects, or into committed test recordings.
- Confused-deputy requests. Applications pass end-user input (IDs, email
  addresses) to SDK methods. An identifier that changes the request path or
  query makes the application's key perform a different operation.
- Untrusted inbound content. Anyone can email a receiving address, so raw
  MIME, attachment metadata and webhook bodies are attacker-controlled.
  Forged or replayed webhooks matter to apps that rely on `webhooks.verify`.
- Supply chain. The package ships into many production apps, so the build
  and release workflows and the runtime dependencies are high-value targets.

## Project-specific patterns to flag

- Path parameters. Most resources interpolate caller-supplied IDs straight
  into the path (`/emails/${id}`, `/contacts/${email}`). Only the inbox
  selector, event identifiers and suppression identifiers go through
  `encodeURIComponent`. `hasDotSegment` stops dot segments only, so check
  whether `/`, `?`, `#` or an encoded separator in an identifier reaches
  another endpoint or adds query parameters.
- Where the key goes. `fetchRequest` concatenates `baseUrl + path`, so every
  path must start with a literal `/`. Flag a path whose first segment comes
  from input, and any `fetch` outside `fetchRequest` that sends the default
  headers to a URL taken from a response body or a caller.
- Secrets in output. `logError` (on when `RESEND_DEBUG=true`) prints the
  API error and the request path. Flag changes that put headers, the key or
  request bodies into logs, thrown errors or returned `ErrorResponse`
  objects.
- Inbound mail. `emails.receiving.forward` downloads raw MIME, parses it
  with `postal-mime` and re-sends `html`, `text` and attachment `filename`
  and `content_id`. Flag parsed values that reach recipients, headers or the
  request path instead of body fields.
- Recordings and release. Polly HAR files in `__recordings__/` are committed
  and `setupPolly` redacts only strings shaped like API keys, so flag other
  secrets in recordings (signing secrets, signed URLs). In `release.yml` the
  `publish-npm` job must publish only the tarball built by the `ci` job and
  never check out or run repository or dependency code.

## Known false-positives

- Key-shaped literals in `*.spec.ts` (`re_…`, `whsec_…`) and
  `re_REDACTED_API_KEY` in `__recordings__/` are fixtures used with mocked
  or replayed HTTP.
- `Receiving.downloadRaw` fetching `raw.download_url` is intended. The URL
  comes from the Resend API response and the request carries no
  `Authorization` header.
- Email `html`, `react`, `headers`, `attachments`, `from` and `to` go to the
  API unchanged. The SDK is a transport and callers own the content, so
  unsanitized HTML here is not XSS.
- `process.env` reads (`RESEND_API_KEY`, `RESEND_BASE_URL`,
  `RESEND_USER_AGENT`, `RESEND_DEBUG`) are operator configuration, not
  attacker input.
- `e2e/nextjs` and `e2e/esbuild` (`new Resend('')`, an unauthenticated `GET`
  route) are smoke fixtures that are only built in CI.
