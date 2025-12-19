import React, { Suspense } from "react";
import { createClient } from "@/utils/supabase/server";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Spinner from "@/components/spinner/Spinner";

async function layout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const supaBaseUser = await supabase.auth.getUser();

  // console.log(supaBaseUser.data.user);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        user={{
          name: supaBaseUser.data.user?.user_metadata.full_name,
          email: supaBaseUser.data.user?.email || "",
        }}
      />
      <SidebarInset>
        <SiteHeader />
        <Suspense fallback={<Spinner />}>
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2 animate fade-in">
              {children}
            </div>
          </div>
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default layout;
