# Meteors

## Install

```sh
npm ci
```

## Bootstrap

```sh
npm run bootstrap
```

## Start Dev Server

```sh
npm run dev
```

## Features

- **Vite-Powered**: Fast build times and features of Vite, a build tool that significantly outperforms older tools.
- **Feature-Based Folder Structure**: Organized by feature for scalability and ease of navigation, moving away from the traditional type-based structure which can become unwieldy as projects grow.
- **SSR-Ready**: Server-Side Rendering setup is included, ready to be extended for full SSR capabilities, enhancing SEO, and improving initial load times.

## TODO

- I'm still missing react-query SSR integration, but I was planning to implement it with Tanstack's router that nicely handle SSR data load times with dehydration on server and hydration on client, and has examples of use with react-query and vite (I think is more suitable for lightweight and custom setups instead of nextjs, remix, etc.)
- Validation and Sanitization: Integrate Zod to provide validation and sanitization for API app. This will ensure robust server-client contracts and help prevent typos and bugs.
- Planning to use tRPC lib to achieve end-to-end type safety between the client and server. Already using Kysely, a query builder which provides typed database queries (I don't like ORMs that much, buy query builders are ok). I'm planning on implementing a lib or an extension for tRPC that prevents overfetching, GraphQL queries are nice on handling this.
- More tests. Vitest already configured.
