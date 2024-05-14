import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { Client } from '@neondatabase/serverless';

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

async function fetchProductData(client: Client, nazwa: string) {
  await client.connect();

  const { rows: productRows } = await client.query('SELECT * FROM produkty WHERE nazwa = $1', [nazwa]);

  for (let product of productRows) {
    const { rows: shopRows } = await client.query('SELECT * FROM sklepy WHERE id_sklep = $1', [product.id_sklep]);
    product.shop = shopRows[0];
  }

  await client.end();
  return productRows;
}

async function handleEvent(event: FetchEvent) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  if (pathname.startsWith('/search')) {
    const nazwa = url.searchParams.get('nazwa');
    if (nazwa) {
      const client = new Client(DATABASE_URL);
      const rows = await fetchProductData(client, nazwa);
      return new Response(JSON.stringify(rows), { status: 200 });
    }
  }

  try {
    return await getAssetFromKV(event);
  } catch (e) {
    return new Response(`"${pathname}" not found`, { status: 404, statusText: "not found" });
  }
}