# Email & Account Recovery V1 Design

## Architecture

Extend the existing FastAPI/SQLite authentication system with provider-neutral transactional email functions, Resend-compatible API delivery, resend verification, forgot password, and reset password. Existing token hashing, auth test-mode token exposure, password policy, Next.js API proxy, AuthProvider, bilingual dictionaries, and account UI patterns remain authoritative.

## Token and Cooldown Model

Verification and reset tokens are cryptographically random and only SHA-256 hashes are stored. Password reset tokens have creation, expiry, and single-use timestamps. Verification resend and password-reset cooldowns use the latest token `created_at` for the relevant user. When a request is allowed, its token row is committed before delivery; therefore the request enters cooldown whether delivery succeeds or fails. Delivery failure never marks a token consumed.

Unknown, inactive, already-verified, and cooling-down accounts receive the same generic response from enumeration-sensitive endpoints. Unknown email requests do not send mail or create user-linked token state.

## Email Delivery

`app.email` exposes `send_verification_email` and `send_password_reset_email` and hides the Resend HTTP implementation. It uses server-only environment variables for API key, sender, and public application URL. Production requires an HTTPS public URL. Raw tokens occur only in generated links and provider request bodies; they are not logged or persisted.

Registration commits the account and verification token, then sends email. Delivery failure preserves both and returns a recoverable 503. Resend and forgot-password provider failures are hidden behind their generic response.

## Reset Transaction

A valid, unexpired, unused reset token updates the password hash, marks that token used, and revokes every active auth session for its user in one SQLite transaction. The old password and all existing cookies cease to authenticate.

## Frontend

Add bilingual forgot-password and reset-password pages, a login recovery link, automatic emailed-token verification, and resend controls for unverified accounts. All browser calls use same-origin Next.js proxies. No server-only email configuration enters client code.

## Production Configuration

The backend runtime receives `INNERGEO_EMAIL_API_KEY`, `INNERGEO_EMAIL_SENDER`, and `INNERGEO_PUBLIC_APP_URL` through required Compose interpolation. No values are tracked.

## Testing

Focused integration tests cover registration delivery, verification lifecycle, resend cooldown, enumeration resistance, reset lifecycle, session revocation, provider failures, hashed storage, and test-only token exposure. Final checks include all Python tests, TypeScript, diff whitespace, webpack production build, and secret scanning.
