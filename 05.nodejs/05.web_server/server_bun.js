import { serve } from "bun";

serve({
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Do you want a cup of tea !", { status: 200 });
    } else if (url.pathname === "/tea") {
      return new Response("A cup of tea is ready for you !", { status: 200 });
    } else {
      return new Response("404 Not Found", { status: 404 });
    }
  },
  port: 3000,
  hostname: "127.0.0.1",
});
