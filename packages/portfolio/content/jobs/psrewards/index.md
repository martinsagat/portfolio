---
date: '2026-01-01'
title: 'Senior Software Engineer (Sole Engineer)'
company: 'PS Rewards'
location: 'Perth, WA (Hybrid)'
range: 'Jan 2026 - Present'
url: 'https://psrewards.com.au/'
logo: './psrewards.png'
tech:
  - TypeScript
  - Hono
  - AWS Lambda
  - DynamoDB
  - Cognito
  - SST
  - Next.js
  - React
  - MUI
  - TanStack Query
  - Turborepo
  - Expo / React Native
  - Stripe
  - Playwright
---

PS Rewards is a rewards and cashback platform comprising three web portals (consumer, merchant, admin) and a cross-platform iOS/Android mobile app. As the sole in-house engineer, I scaled the platform from launch to 1,500 active users while owning everything from infrastructure to incident response.

- Designed, built and operated the entire platform end-to-end cloud infrastructure, UX, security and on-call operations
- Architected a serverless AWS stack with Hono on Lambda/API Gateway, DynamoDB single-table design via ElectroDB, Cognito JWT auth, and OpenAPI docs; deployed across four SST stages (dev, e2e, uat, production) with CloudFront, Route 53 and EventBridge
- Built three Next.js 16 / React 19 / MUI v7 portals consumer storefront, merchant dashboard, admin console on a Turborepo monorepo backed by TanStack Query and a shared component library
- Shipped a cross-platform Expo / React Native app with Face ID biometric sign-in, push notifications with gifting triggers, typed Expo Router navigation, and EAS OTA releases across uat and production channels
- Delivered the gifting system end-to-end (email/push delivery, recipient redemption, dispose-on-claim security model), a dynamic campaign engine, and a unified catalog/cashback engine spanning Blackhawk Network and Rakuten
- Integrated Stripe (checkout hardening, refunds, pending-order recovery, reconciliation), Blackhawk Network (mTLS gift-card supply), Rakuten affiliate offers, Twilio SMS, SendGrid, and Novatti webhooks
- Patched IDOR vulnerabilities across consumer endpoints, hardened gift-card disposal against double-spend, enforced mobile verification on all orders, and shipped per-user app-version gating
- Owned production deploys, DB migrations, cron monitoring, incident response, vulnerability remediation, and structured-log observability
