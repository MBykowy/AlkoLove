import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import { Client } from '@neondatabase/serverless';

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event: FetchEvent) {
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  if (pathname.startsWith('/wyszukiwarka')) {
    const nazwa = url.searchParams.get('nazwa');
    if (nazwa) {
      const client = new Client(DATABASE_URL);
      const rows = await fetchProductData(client, nazwa);
      return new Response(JSON.stringify(rows), { status: 200 });
    }




  }else if (pathname.startsWith('/porownaj/produkty')) {
    const client = new Client(DATABASE_URL);
    const rows = await fetchAllProducts(client);
    return new Response(JSON.stringify(rows), { status: 200 });
  }






  try {
    return await getAssetFromKV(event);
  } catch (e) {
    return new Response(`"${pathname}" not found`, { status: 404, statusText: "not found" });
  }
}


//Wyszukiwarka
async function fetchProductData(client: Client, nazwa: string) {
  await client.connect();
  const { rows: productRows } = await client.query('SELECT * FROM produkty WHERE nazwa = $1 ORDER BY cena ASC', [nazwa]);
  for (let product of productRows) {
    const { rows: shopRows } = await client.query('SELECT * FROM sklepy WHERE id_sklep = $1', [product.id_sklep]);
    const { rows: shopAddressRows } = await client.query('SELECT * FROM sklepy_adres WHERE id_sklep = $1', [product.id_sklep]);
    product.shop = shopRows[0];
    if (shopAddressRows[0]) {
      product.shop.adres = shopAddressRows[0].adres;
    }
  }
  await client.end();
  return productRows[0]; // return the cheapest product
}





//porównywarka
async function fetchAllProducts(client: Client) {
  await client.connect();
  const { rows: productRows } = await client.query('SELECT * FROM produkty ORDER BY cena ASC');
  for (let product of productRows) {
    const { rows: shopRows } = await client.query('SELECT * FROM sklepy WHERE id_sklep = $1', [product.id_sklep]);
    const { rows: shopAddressRows } = await client.query('SELECT * FROM sklepy_adres WHERE id_sklep = $1', [product.id_sklep]);
    product.shop = shopRows[0];
    if (shopAddressRows[0]) {
      product.shop.adres = shopAddressRows[0].adres;
    }
  }
  await client.end();
  return productRows;
}