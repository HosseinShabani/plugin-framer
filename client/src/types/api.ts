import { QueryKey, UseQueryOptions } from "@tanstack/react-query";

export type ResponseType<T = []> = T;

export type HookApiOptions<T = any> =
  | Omit<UseQueryOptions<ResponseType<T>, Error, ResponseType<T>, QueryKey>, "queryKey" | "queryFn">
  | undefined;
