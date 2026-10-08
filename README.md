# Dairy Product Shop

A responsive shopping basket application built with React, TypeScript, Redux Toolkit, Tailwind CSS, and Firebase Firestore.

## Live Demo

https://dairy-product-shop.web.app

## GitHub Repository

https://github.com/prashantshinare07/dairy-product-shop

## Features

- Browse dairy products loaded from Firebase Firestore
- Add products to the basket
- Increase and decrease product quantities
- Remove products from the basket
- Automatic subtotal calculation
- Automatic offer and savings calculation
- Final total calculation
- Responsive layout for desktop and mobile
- Unit tests for pricing and offer rules
- Production deployment using Firebase Hosting

## Products

| Product | Price |
|---|---:|
| Bread | £1.10 |
| Milk | £0.50 |
| Cheese | £0.90 |
| Soup | £0.60 |
| Butter | £1.20 |

## Special Offers

### Cheese

Buy one, get the second one free.

Example:

- 2 Cheese → £1.80
- Savings → £0.90
- Final price → £0.90

### Soup + Bread

Each Soup allows one Bread to be purchased at 50% off.

Example:

- 1 Soup + 1 Bread
- Bread discount → £0.55

### Butter

Butter has a 1/3 discount.

Example:

- Original price → £1.20
- Savings → £0.40
- Final price → £0.80

## Tech Stack

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Firebase Firestore
- Firebase Hosting
- Vite
- Vitest
- ESLint

## Project Structure

```text
src/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   ├── Basket.tsx
│   ├── BasketItem.tsx
│   └── BillSummary.tsx
│
├── data/
│   └── products.ts
│
├── features/
│   └── cart/
│       ├── cartSelectors.ts
│       └── cartSlice.ts
│
├── services/
│   └── productService.ts
│
├── store/
│   ├── store.ts
│   └── hooks.ts
│
├── types/
│   └── product.ts
│
├── utils/
│   ├── pricing.ts
│   └── pricing.test.ts
│
├── App.tsx
├── firebase.ts
├── index.css
└── main.tsx
