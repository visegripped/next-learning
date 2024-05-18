This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

In a separate terminal, start up the test runner:

```bash
pnpm test
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Features to Add and Bugs to fix

- on initial load, card faces are incorrect because SSR and CSR are not in sync.
- An undo button (1 move only)
- Counter that shows number of moves
- A 'you win' screen
- Error handler/boundary
- Deck pile should only be a single card, stacked. Instead of the tall pile it is.
- - Card css should not make assumptions about card height
- - Need a min height on that top bar. when build piles are empty and deck is low/out, waste pile is taller than the piles.
- add bg image to each build pile for suit and get rid of heading.
