from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Simple health check endpoint
        if request.url.endswith("/health"):
            return Response("ok", status=200)

        return Response("Hello from Python API BRITO IDE PO CRL", status=200)


async def on_fetch(request, env, ctx):
    """Compatibility wrapper expected by Wrangler: exports `on_fetch`.

    Wrangler calls `on_fetch(request, env, ctx)`. Pass `ctx` and `env`
    to the `Default` WorkerEntrypoint constructor so it initializes
    correctly.
    """
    entry = Default(ctx, env)
    return await entry.fetch(request)
