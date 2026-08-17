export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // Contact form endpoint — we'll implement this later
      if (url.pathname === "/api/contact" && request.method === "POST") {
        return new Response("Contact endpoint not configured yet.", {
          status: 501
        });
      }
  
      // Serve the static website
      return env.ASSETS.fetch(request);
    }
  };