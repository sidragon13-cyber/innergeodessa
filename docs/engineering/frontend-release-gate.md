# Frontend Release Gate

## Separate states

Domain completeness and frontend release are independent:

- `domain_complete` means the 18/70 report and 51-rule domain contract exists.
- `validated` means individual, family, global, and manual checks passed.
- `frontend_enabled` means product approval permits user-facing access.

A generator-ready report is not automatically a released report.

## Source of truth

`generator/phase-one.ts` is the current frontend gate. It must remain an
explicit allowlist. The report registry answers whether generation is
possible; it must not be used as the frontend release decision.

The current released set is exactly:

- ISFJ
- ENTJ

Adding a registry entry or `domain_complete` stage must not change this list.

## Release procedure

Before adding `frontend_enabled`:

1. complete and validate domain content;
2. obtain content and product approval;
3. review free versus premium presentation;
4. verify persisted and preview result paths;
5. verify print, navigation, recipient name, loading, unavailable, and error
   states;
6. update the explicit frontend allowlist and manifest together;
7. add a frontend validation case for allowed and denied types;
8. run the full validation and build suite.

This gate does not implement payment, authentication, subscription, or email.
Those concerns require separate decisions and contracts.
