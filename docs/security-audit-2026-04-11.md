# Security Audit & Dependency Vulnerability Report
**Date:** 2026-04-11
**Scope:** Full codebase — `web/` (Node.js/npm) + `requirements.txt` (Python/pip)
**Auditor:** Claude Code
**Final status:** ✅ All vulnerabilities resolved

---

## Summary

| Ecosystem | Vulnerabilities Found | Resolved |
|-----------|----------------------|---------|
| npm (Node.js) | 8 (2 Critical, 3 High, 3 Moderate) | ✅ All 8 |
| pip (Python) | 3 advisories in `requirements.txt` pin | ✅ All 3 |
| **Total** | **11** | **11** |

---

## Phase 1 — API Route Security Fixes

Applied before dependency audit. All mandatory security rules from `CLAUDE.md` verified and enforced.

### Issues Fixed

| ID | Severity | File | Issue | Fix |
|----|----------|------|-------|-----|
| K-1 | MEDIUM | `api/keepalive/route.ts` | No rate limiting — brute-force of Bearer token possible | Added 10 req/10 min rate limiter |
| K-2 | MEDIUM | `api/keepalive/route.ts` | `CRON_SECRET` absence didn't fail closed independently | Hard fail-500 if `CRON_SECRET` missing |
| K-3 | LOW | `api/keepalive/route.ts` | Timing-unsafe `===` secret comparison | Replaced with `crypto.timingSafeEqual` |
| K-4 | LOW | `api/keepalive/route.ts` | Response leaked Streamlit app URLs | Stripped `url` field from response |
| E-1 | MEDIUM | `api/book/check-email/route.ts` | Verbose 409 revealed booking date → schedule enumeration | Generic message, date removed |
| E-2 | LOW | `api/book/check-email/route.ts` | Unnecessary `id` column selected from DB | Changed to `.select("start_time")` only |
| S-1 | HIGH | `api/book/slots/route.ts` | Unbounded `startUtc`/`endUtc` enabled full-table scrape | 48-hour window cap + 422 on violation |
| S-2 | MEDIUM | `api/book/slots/route.ts` | UTC bounds not anchored to `date` param | Both bounds validated ±48 h from `date` |

### Shared Infrastructure Fix

| File | Change |
|------|--------|
| `web/lib/rate-limit.ts` *(new)* | Created shared `getClientIp()` + `makeRateLimiter()` utilities |

**IP spoofing fix:** All 6 API routes previously used `x-forwarded-for` (client-controllable). Migrated to `x-real-ip` (Vercel edge-injected, not forgeable) with `x-forwarded-for` as fallback.

**Routes migrated:**
- `api/keepalive/route.ts`
- `api/book/check-email/route.ts`
- `api/book/slots/route.ts`
- `api/chat/route.ts`
- `api/chat/lead/route.ts`
- `api/quote/route.ts`

---

## Phase 2 — Dependency Vulnerability Fixes

### npm Vulnerabilities (web/)

#### 1. `next` — HIGH (Direct dependency)
| | |
|-|-|
| **Installed (before)** | `16.1.6` |
| **Fixed version** | `16.2.3` |
| **Advisory** | [GHSA-q4gf-8mx6-v5v3](https://github.com/advisories/GHSA-q4gf-8mx6-v5v3) — DoS via Server Components (CVSS 7.5) |
| **Advisory** | [GHSA-jcc7-9wpm-mj36](https://github.com/advisories/GHSA-jcc7-9wpm-mj36) — null-origin CSRF bypass on dev HMR |
| **Fix applied** | `npm install next@16.2.3` |

---

#### 2. `axios` — CRITICAL (Transitive: `@langchain/community → ibm-cloud-sdk-core`)
| | |
|-|-|
| **Installed (before)** | `1.13.6` |
| **Vulnerable range** | `≤ 1.14.0` |
| **Advisory** | [GHSA-fvcv-3m26-pcqx](https://github.com/advisories/GHSA-fvcv-3m26-pcqx) — Header injection → cloud metadata exfiltration (CVSS **10.0**) |
| **Advisory** | [GHSA-3p68-rc4w-qgx5](https://github.com/advisories/GHSA-3p68-rc4w-qgx5) — NO_PROXY bypass → SSRF |
| **Fix applied** | `overrides.axios = ">=1.15.0"` in `package.json` |

---

#### 3. `handlebars` — CRITICAL (Transitive: `@langchain/community → @langchain/classic`)
| | |
|-|-|
| **Installed (before)** | `4.7.8` |
| **Vulnerable range** | `4.0.0 – 4.7.8` |
| **Advisory** | [GHSA-2w6w-674q-4c4q](https://github.com/advisories/GHSA-2w6w-674q-4c4q) — JS injection via AST type confusion (CVSS 9.8) |
| **Advisory** | [GHSA-3mfm-83xf-c92r](https://github.com/advisories/GHSA-3mfm-83xf-c92r) — JS injection via `@partial-block` (CVSS 8.1) |
| **Fix applied** | `overrides.handlebars = ">=4.7.9"` in `package.json` |

---

#### 4. `picomatch` — HIGH (Transitive: `eslint-config-next` build tooling)
| | |
|-|-|
| **Installed (before)** | `2.3.1` and `4.0.3` |
| **Vulnerable range** | `≤ 2.3.1` / `4.0.0 – 4.0.3` |
| **Advisory** | [GHSA-c2c7-rcm5-vvqj](https://github.com/advisories/GHSA-c2c7-rcm5-vvqj) — ReDoS via extglob quantifiers (CVSS 7.5) |
| **Advisory** | [GHSA-3v7f-55p6-f55p](https://github.com/advisories/GHSA-3v7f-55p6-f55p) — Method injection in POSIX character classes |
| **Fix applied** | `overrides.picomatch = ">=2.3.2"` in `package.json` |

---

#### 5. `flatted` — HIGH (Transitive: `eslint → file-entry-cache → flat-cache`)
| | |
|-|-|
| **Installed (before)** | `3.4.1` |
| **Vulnerable range** | `≤ 3.4.1` |
| **Advisory** | [GHSA-rf6f-7fwh-wjgh](https://github.com/advisories/GHSA-rf6f-7fwh-wjgh) — Prototype pollution via `parse()` |
| **Fix applied** | `overrides.flatted = ">=3.4.2"` in `package.json` |

---

#### 6. `langsmith` — MODERATE (Transitive: `langchain`, `@langchain/community`)
| | |
|-|-|
| **Installed (before)** | `0.5.10` |
| **Vulnerable range** | `≤ 0.5.17` |
| **Fix applied** | `overrides.langsmith = ">=0.5.18"` in `package.json` |

---

#### 7. `yaml` — MODERATE (Transitive: `@langchain/community → @langchain/classic`)
| | |
|-|-|
| **Installed (before)** | `2.8.2` |
| **Vulnerable range** | `2.0.0 – 2.8.2` |
| **Advisory** | [GHSA-48c2-rrv3-qjmp](https://github.com/advisories/GHSA-48c2-rrv3-qjmp) — Stack overflow via deeply nested YAML |
| **Fix applied** | `overrides.yaml = ">=2.8.3"` in `package.json` |

---

#### 8. `brace-expansion` — MODERATE (Transitive: `eslint`, `@typescript-eslint`)
| | |
|-|-|
| **Installed (before)** | `1.1.12` and `5.0.4` |
| **Vulnerable range** | `< 1.1.13` / `4.0.0 – 5.0.4` |
| **Advisory** | [GHSA-f886-m6hf-6m8v](https://github.com/advisories/GHSA-f886-m6hf-6m8v) — Zero-step sequence → memory exhaustion (CVSS 6.5) |
| **Fix applied** | `overrides.brace-expansion = ">=1.1.13"` in `package.json` |

---

### Python Vulnerabilities (requirements.txt)

The installed environment was already safe (streamlit 1.55.0, pillow 12.1.1). However `requirements.txt` was pinning the vulnerable version.

| Package | Advisory | Vulnerable Pin | Fix Applied |
|---------|----------|---------------|-------------|
| `streamlit==1.32.0` | PYSEC-2024-153 | `==1.32.0` | Changed to `>=1.54.0` |
| `streamlit==1.32.0` | CVE-2026-33682 | `==1.32.0` | Changed to `>=1.54.0` |
| `pillow` (transitive) | CVE-2026-25990 | Pinned by old streamlit | Resolved by streamlit upgrade |

---

## Verification Results

```
npm audit        →  found 0 vulnerabilities
npm run type-check  →  clean (no errors)
```

---

## Commits

| Hash | Message |
|------|---------|
| `a81726e` | security: fix IP spoofing + centralise rate limiter across all API routes |
| `630bb8d` | feat(keepalive): support external ping services via PING_SECRET |

---

## Residual Notes

- **In-memory rate limiter** resets on serverless cold start. Acceptable for current traffic. Upgrade path: swap `Map` in `web/lib/rate-limit.ts` for Vercel KV / Upstash Redis.
- **LangChain** (`@langchain/community`, `langchain`) is installed but not active in any production route handler. When activated, conduct a fresh audit of those code paths.
- **npm overrides** in `package.json` will need to be reviewed when upgrading `@langchain/community` or `langchain` to ensure the overrides don't conflict with new peer requirements.
