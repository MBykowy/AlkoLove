import { getAssetFromKV } from "@cloudflare/kv-asset-handler"; // Import the getAssetFromKV function from the "@cloudflare/kv-asset-handler" package
import { Client } from '@neondatabase/serverless'; // Import the Client class from the "@neondatabase/serverless" package

addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event)); // Respond to the fetch event with the result of the handleEvent function
});

async function fetchProductData(client: Client, nazwa: string) {
  await client.connect(); // Connect to the database

  const { rows: productRows } = await client.query('SELECT * FROM produkty WHERE nazwa = $1', [nazwa]); // Execute a query to fetch product data where the name matches the provided name

  for (let product of productRows) { // For each product, fetch the associated shop data
    const { rows: shopRows } = await client.query('SELECT * FROM sklepy WHERE id_sklep = $1', [product.id_sklep]); // Execute a query to fetch shop data where the shop ID matches the product's shop ID
    product.shop = shopRows[0]; // Add the shop data to the product object
  }

  await client.end(); // End the database connection
  return productRows; // Return the product data, now including the shop data
}

async function handleEvent(event: FetchEvent) {
  const url = new URL(event.request.url); // Create a new URL object from the request URL
  const pathname = url.pathname; // Get the pathname from the URL

  if (pathname.startsWith('/search')) { // If the pathname starts with "/search"
    const nazwa = url.searchParams.get('nazwa'); // Get the "nazwa" parameter from the URL's search parameters
    if (nazwa) { // If "nazwa" is not null or undefined
      const client = new Client(DATABASE_URL); // Create a new Client object
      const rows = await fetchProductData(client, nazwa); // Fetch the product data
      return new Response(JSON.stringify(rows), { status: 200 }); // Return a new Response object with the product data as a JSON string
    }
  }

  try {
    return await getAssetFromKV(event); // Try to get the asset from the KV store
  } catch (e) {
    return new Response(`"${pathname}" not found`, { status: 404, statusText: "not found" }); // If the asset is not found, return a 404 response
  }
}