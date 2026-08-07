import { createClient as createConnectClient, type PromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { DnsService } from "./gen/enum/api/v1/dns_service_connect.js";
import { KubernetesClusterService } from "./gen/enum/api/v1/kubernetes_clusters_service_connect.js";
import { ObjectStorageAccessKeyService } from "./gen/enum/api/v1/object_storage_access_keys_service_connect.js";
import { ObjectStorageBucketService } from "./gen/enum/api/v1/object_storage_buckets_service_connect.js";
import { ObjectStorageUserService } from "./gen/enum/api/v1/object_storage_users_service_connect.js";
import { OrganizationService } from "./gen/enum/api/v1/organizations_service_connect.js";
import { ProjectService } from "./gen/enum/api/v1/projects_service_connect.js";
import { RegionService } from "./gen/enum/api/v1/region_service_connect.js";
import { UserService } from "./gen/enum/api/v1/users_service_connect.js";

// Re-export all service definitions and message types
export * from "./gen/enum/api/v1/common_pb.js";
export * from "./gen/enum/api/v1/dns_pb.js";
export * from "./gen/enum/api/v1/dns_service_pb.js";
export * from "./gen/enum/api/v1/kubernetes_clusters_pb.js";
export * from "./gen/enum/api/v1/kubernetes_clusters_service_pb.js";
export * from "./gen/enum/api/v1/object_storage_access_keys_pb.js";
export * from "./gen/enum/api/v1/object_storage_access_keys_service_pb.js";
export * from "./gen/enum/api/v1/object_storage_buckets_pb.js";
export * from "./gen/enum/api/v1/object_storage_buckets_service_pb.js";
export * from "./gen/enum/api/v1/object_storage_users_pb.js";
export * from "./gen/enum/api/v1/object_storage_users_service_pb.js";
export * from "./gen/enum/api/v1/organizations_pb.js";
export * from "./gen/enum/api/v1/organizations_service_pb.js";
export * from "./gen/enum/api/v1/projects_pb.js";
export * from "./gen/enum/api/v1/projects_service_pb.js";
export * from "./gen/enum/api/v1/region_pb.js";
export * from "./gen/enum/api/v1/region_service_pb.js";
export * from "./gen/enum/api/v1/users_pb.js";
export * from "./gen/enum/api/v1/users_service_pb.js";
export { DnsService, KubernetesClusterService, ObjectStorageAccessKeyService, ObjectStorageUserService, OrganizationService, ProjectService, RegionService, UserService };

const DEFAULT_BASE_URL = "https://api.enum.co";

export interface ClientOptions {
  token: string;
  baseUrl?: string;
}

export interface Client {
  users: PromiseClient<typeof UserService>;
  organizations: PromiseClient<typeof OrganizationService>;
  projects: PromiseClient<typeof ProjectService>;
  regions: PromiseClient<typeof RegionService>;
  dns: PromiseClient<typeof DnsService>;
  kubernetes: {
    clusters: PromiseClient<typeof KubernetesClusterService>;
  };
  storage: {
    users: PromiseClient<typeof ObjectStorageUserService>;
    accessKeys: PromiseClient<typeof ObjectStorageAccessKeyService>;
    buckets: PromiseClient<typeof ObjectStorageBucketService>;
  };
}

export function createClient({ token, baseUrl = DEFAULT_BASE_URL }: ClientOptions): Client {
  const transport = createConnectTransport({
    baseUrl,
    interceptors: [
      (next) => (req) => {
        req.header.set("Authorization", `Bearer ${token}`);
        return next(req);
      },
    ],
  });

  return {
    users: createConnectClient(UserService, transport),
    organizations: createConnectClient(OrganizationService, transport),
    projects: createConnectClient(ProjectService, transport),
    regions: createConnectClient(RegionService, transport),
    dns: createConnectClient(DnsService, transport),
    kubernetes: {
      clusters: createConnectClient(KubernetesClusterService, transport),
    },
    storage: {
      users: createConnectClient(ObjectStorageUserService, transport),
      accessKeys: createConnectClient(ObjectStorageAccessKeyService, transport),
      buckets: createConnectClient(ObjectStorageBucketService, transport),
    },
  };
}
