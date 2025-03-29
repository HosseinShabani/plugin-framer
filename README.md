# Framer Plugin Monorepo

This is a monorepo for a Framer plugin, containing the client, server, and shared code.

## Structure

- `client/`: Framer plugin frontend
- `server/`: Backend API server
- `shared/`: Shared types and utilities

## Setup

```bash
# Install dependencies
pnpm install
```

## Development

To run both the client and server simultaneously:

```bash
pnpm dev
```

To run just the client:

```bash
pnpm dev:client
```

To run just the server:

```bash
pnpm dev:server
```

## Building

To build all packages:

```bash
pnpm build
```

To build individual packages:

```bash
# Shared package
pnpm build:shared

# Client
pnpm build:client

# Server
pnpm build:server
```

## Packaging for Framer

```bash
cd client
pnpm pack
```

This will create a plugin.zip file that can be imported into Framer.
