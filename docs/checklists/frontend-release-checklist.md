# Frontend Release Checklist

- [ ] Report is `domain_complete` and `validated`.
- [ ] Content and product owners approved frontend release.
- [ ] Add `frontend_enabled` separately from domain stages.
- [ ] Add the type to the explicit frontend allowlist.
- [ ] Do not use report-registry presence as the release gate.
- [ ] Verify persisted-result and preview-result loading.
- [ ] Verify loading, incomplete, not-found, unavailable, and error states.
- [ ] Verify free result CTA and unsupported-type denial.
- [ ] Verify complete report section order and rule metadata.
- [ ] Verify print, navigation, template, and recipient-name behaviour.
- [ ] Verify keyboard focus and accessible labels.
- [ ] Confirm release copy does not imply unimplemented payment or entitlement.
- [ ] Run frontend validation, full validation, typecheck, lint, and build.
- [ ] Confirm no unintended type became frontend-accessible.
