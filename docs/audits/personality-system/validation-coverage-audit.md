# Validation Coverage Audit

| Contract | Current coverage | Evidence / limitation |
|---|---|---|
| Required eight files | Covered | Expansion/family validators and Phase 6F filesystem audit |
| Canonical section count/order/access | Covered | Complete-definition validator |
| Exactly 70 base blocks | Covered | Complete-definition validator |
| Empty content and placeholders | Covered | Complete-definition validator |
| English-only / Han-script rejection | Covered | Complete-definition and expansion validation |
| Non-clinical methodology | Covered | Per-type validators |
| 36/7/8 and 51 total rules | Covered | Rule-set validators |
| Rule and block identifier uniqueness | Covered | Rule and complete-definition validators |
| Personality identity and prefixes | Covered | Batch validator |
| Rule conditions, priority, targets, slots | Covered | Rule-set and batch validators |
| Report/rule registry presence | Covered | Batch validation |
| Manifest completeness/state | Covered | Manifest validation |
| Family membership | Covered | Family validation command |
| Full section/base-block duplicates | Covered | Cross-personality batch validation; methodology exempt |
| Full dynamic-rule content duplicates | **Added in Phase 6F** | Exact normalized title + content is now rejected across selected types |
| Barrel exports | Covered | Expansion validation imports all production modules |
| `_template` exclusion | Covered | Expansion/template validation |
| Frontend allowlist | Covered | Frontend and expansion validators require exactly ISFJ/ENTJ |
| Generator smoke behavior | Covered | Standard validation plus Phase 6F four-profile, all-type audit |

## Reusable gap corrected

The batch validator previously rejected duplicate report titles, full sections, and full base blocks but did not compare generated dynamic-rule content. The audit found seven exact cross-type rule-content collisions. The validator now compares normalized rule title and body across personality types and emits a deterministic error naming the conflicting type and rule.

Shared methodology language remains exempt only from base-report comparison; dynamic rules have no shared-methodology exemption.

## Remaining blind spots

- Semantic paraphrases and conceptual collisions require human review.
- Rule reachability is checked through condition validation and representative smoke profiles, not exhaustive combinatorial proof.
- Static import success supports barrel coverage but does not prove third-party consumers use the preferred export path.
- Writing quality, stereotype risk, factual suitability, and tone cannot be reduced to reliable lexical rules without false positives.
- No automated check can establish clinical or psychometric validity.

