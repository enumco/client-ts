# enum TypeScript API Client

TypeScript client for the enum API.

## Installation

```bash
npm install @enumco/client
```

## Usage

```ts
import { createClient } from "@enumco/client";

const client = createClient({ token: "your-api-token" });

const { users } = await client.users.listUsers({});
const { organization } = await client.organizations.getOrganization({ id: "org-123" });
const { project } = await client.projects.getProject({ id: "proj-456" });
```

## Services

| Property | Service |
|---|---|
| `client.users` | UserService |
| `client.organizations` | OrganizationService |
| `client.projects` | ProjectService |
| `client.kubernetes.clusters` | KubernetesClusterService |
| `client.storage.users` | ObjectStorageUserService |
| `client.storage.accessKeys` | ObjectStorageAccessKeyService |
| `client.storage.buckets` | ObjectStorageBucketService |

## Options

```ts
createClient({
    token: string;    // required - API token
})
```

## Documentation

See [enum Docs](https://docs.enum.co/api/).

## License

[Apache License 2.0](LICENSE)
