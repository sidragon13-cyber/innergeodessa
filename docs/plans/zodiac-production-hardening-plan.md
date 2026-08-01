# Zodiac Production Hardening Plan

## Goal

Prepare the current RC core for controlled public Beta without modifying frozen astronomical calculations.

## P0

1. Shared city-search contract
2. Searchable location provider abstraction
3. Unknown birth-time degradation mode
4. Mobile QA
5. Print PDF QA
6. Error monitoring
7. Privacy policy integration
8. Terms and astrology disclaimer integration

## P1

1. User accounts
2. Database persistence
3. Cross-device chart recovery
4. Shareable report links
5. Chinese UI architecture
6. Chinese report content architecture

## P2

1. Jupiter through Pluto
2. Houses
3. Planet-to-house mapping
4. Major aspects
5. Orb engine
6. SVG chart wheel

## Frozen-Core Boundary

- Do not modify frozen calculation files.
- New features consume `AstrologyResultContract`.
- Design a versioned contract before adding core fields.
- Keep production hardening and astrology expansion in separate commits.

## First Task

City Search Architecture

The current list of 10 preset cities is the largest usability barrier to public testing.
