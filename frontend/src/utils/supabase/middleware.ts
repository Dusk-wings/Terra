import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user?.id);
  const url = request.nextUrl.clone();
  // if (request.nextUrl.pathname == "/authentication") {
  //   url.pathname = "/authentication/register";
  //   return NextResponse.redirect(url);
  // }

  if (user && request.nextUrl.pathname.startsWith("/authentication")) {
    url.pathname = "/account";
    return NextResponse.redirect(url);
  }

  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/authentication") &&
    !request.nextUrl.pathname.startsWith("/error")
  ) {
    url.pathname = "/authentication";
    return NextResponse.redirect(url);
  }

  // if (
  //   user &&
  //   request.nextUrl.pathname.startsWith("/authentication/verification")
  // ) {
  //   const token = url.searchParams.get("token");
  //   if (!token || !(await checkToken(user.id, token))) {
  //     return NextResponse.redirect(new URL("/authentication", request.url));
  //   }

  //   return NextResponse.next();
  // }

  // if (user && !user.email_confirmed_at) {
  //   const token = await createToken(user.id);
  //   url.pathname = `/authentication/verification/${token}`;
  //   return NextResponse.redirect(url);
  // }

  return supabaseResponse;
}
