import { readFileSync } from "node:fs";

const paddleSource = readFileSync(
  "src/components/payment/paddle-checkout-button.tsx",
  "utf8",
);

const resultSource = readFileSync(
  "src/app/personality/result/[sessionId]/page.tsx",
  "utf8",
);

const checks = [
  [
    "PADDLE_EXPOSES_ON_COMPLETED_CALLBACK",
    /onCompleted\??\s*:\s*\(\)\s*=>\s*void/.test(paddleSource),
  ],
  [
    "PADDLE_LISTENS_FOR_CHECKOUT_COMPLETED",
    /CheckoutEventNames\.CHECKOUT_COMPLETED/.test(paddleSource) &&
      /eventCallback/.test(paddleSource),
  ],
  [
    "PADDLE_NOTIFIES_CALLER_AFTER_COMPLETION",
    /onCompleted\s*\?\.\s*\(\s*\)/.test(paddleSource),
  ],
  [
    "RESULT_WIRES_PAYMENT_COMPLETION",
    /<PaddleCheckoutButton[\s\S]*?onCompleted\s*=\s*\{/.test(resultSource),
  ],
  [
    "RESULT_HAS_POST_PAYMENT_RETRY_CONTRACT",
    /POST_PAYMENT_ACCESS_RETRY_DELAYS_MS/.test(resultSource),
  ],
  [
    "RESULT_RECHECKS_REPORT_ACCESS_AFTER_PAYMENT",
    /premiumAccessRevision/.test(resultSource) &&
      /setPremiumAccessRevision/.test(resultSource) &&
      /POST_PAYMENT_ACCESS_RETRY_DELAYS_MS/.test(resultSource),
  ],
];

let failures = 0;

console.log(
  "===== PERSONALITY POST-PAYMENT ACCESS REFRESH CONTRACT =====",
);

for (const [name, passed] of checks) {
  console.log(`${name}=${passed ? "PASS" : "FAIL"}`);

  if (!passed) {
    failures += 1;
  }
}

console.log(`FAILURES=${failures}`);

if (failures > 0) {
  console.log(
    "PERSONALITY_POST_PAYMENT_ACCESS_REFRESH=RED",
  );
  process.exit(1);
}

console.log(
  "PERSONALITY_POST_PAYMENT_ACCESS_REFRESH=PASS",
);
