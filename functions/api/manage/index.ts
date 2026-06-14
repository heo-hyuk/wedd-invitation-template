/// <reference types="@cloudflare/workers-types" />

interface Env {
  KV: KVNamespace;
  ADMIN_KEY: string;
}

interface RsvpEntry {
  id: string;
  name: string;
  attendance: string;
  guests?: number;
  meal?: string;
  message?: string;
  created_at: string;
}

interface GuestbookEntry {
  id: string;
  name: string;
  password: string;
  message: string;
  created_at: string;
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const key = url.searchParams.get('key');
  const method = ctx.request.method;

  if (!key) return json({ error: 'key required' }, 401);
  if (!ctx.env.ADMIN_KEY || key !== ctx.env.ADMIN_KEY) return json({ error: 'unauthorized' }, 403);

  if (method === 'GET') {
    const [weddingJson, rsvpEntries, guestbookEntries] = await Promise.all([
      fetch(new URL('/wedding.json', ctx.request.url)).then(r => r.json<Record<string, unknown>>()).catch(() => ({})),
      ctx.env.KV.get<RsvpEntry[]>('r:wedding', 'json'),
      ctx.env.KV.get<GuestbookEntry[]>('g:wedding', 'json'),
    ]);

    const groom = (weddingJson.groom as { name?: string } | undefined)?.name ?? '';
    const bride = (weddingJson.bride as { name?: string } | undefined)?.name ?? '';
    const date = (weddingJson.date as string | undefined) ?? '';
    const venueName = (weddingJson.venue as { name?: string } | undefined)?.name ?? '';

    return json({
      groom,
      bride,
      date,
      venueName,
      rsvp: rsvpEntries ?? [],
      guestbook: (guestbookEntries ?? []).map(({ password: _, ...rest }) => rest),
    });
  }

  if (method === 'DELETE') {
    const body = await ctx.request.json<{ type: 'guestbook'; id: string }>();
    if (body.type === 'guestbook') {
      const entries = await ctx.env.KV.get<GuestbookEntry[]>('g:wedding', 'json') ?? [];
      const updated = entries.filter(e => e.id !== body.id);
      await ctx.env.KV.put('g:wedding', JSON.stringify(updated), { expirationTtl: 31_536_000 });
      return json({ ok: true });
    }
    return json({ error: 'unknown type' }, 400);
  }

  return json({ error: 'method not allowed' }, 405);
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
