import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Outlet,
  notFoundComponent: () => {
    return (
      <div>
        <p>not found</p>
      </div>
    );
  },
});
