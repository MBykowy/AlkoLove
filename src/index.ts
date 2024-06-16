  import {
    getAssetFromKV
  } from "@cloudflare/kv-asset-handler";
  import {
    Client
  } from '@neondatabase/serverless';

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
        return new Response(JSON.stringify(rows), {
          status: 200
        });
      }




    } else if (pathname.startsWith('/porownaj/produkty')) {
      const client = new Client(DATABASE_URL);
      const rows = await fetchAllProducts(client);
      return new Response(JSON.stringify(rows), {
        status: 200
      });




    } else if (event.request.method === 'POST' && pathname === '/register') {
      const data = await event.request.json(); // parse the incoming JSON
      const client = new Client(DATABASE_URL);
      const result = await registerUser(client, data);
      console.log(result); // log the result before returning it
      return new Response(JSON.stringify(result), {
        status: 200
      });

    } else if (event.request.method === 'POST' && pathname === '/login') {
      const data = await event.request.json(); // parse the incoming JSON
      const client = new Client(DATABASE_URL);
      const result = await loginUser(client, data);
      console.log(result); // log the result before returning it
      return new Response(JSON.stringify(result), {
        status: 200
      });
    } else if (pathname.startsWith('/filtrowanie/produkty')) {
      const client = new Client(DATABASE_URL);
      const rows = await fetchAllProducts(client);
      return new Response(JSON.stringify(rows), {
        status: 200
      });
    } else if (pathname.startsWith('/sklepy/lokalizacje')) {
      const client = new Client(DATABASE_URL);
      const rows = await fetchAllShopLocalizations(client);
      return new Response(JSON.stringify(rows), {
        status: 200
      });
    } else if (event.request.method === 'POST' && pathname === '/profil/dane') {
      const client = new Client(DATABASE_URL);
      const userId = await event.request.json(); // parse the incoming JSON
      const userData = await fetchUserProfile(client, userId);
      return new Response(JSON.stringify({
        data: userData
      }), {
        status: 200
      });
    } else if (event.request.method === 'POST' && pathname === '/profil/zapisz') {
      const client = new Client(DATABASE_URL);
      const dane = await event.request.json(); // parse the incoming JSON
      await ZmienDane(client, dane);

      return new Response('success', {
        status: 200
      });
    } else if (event.request.method === 'POST' && pathname === '/produkty/zapisz') {
      const client = new Client(DATABASE_URL);
      const productData = await event.request.json(); // parse the incoming JSON
      await ZmienDaneProduktu(client, productData);

      return new Response('success', {
        status: 200
      });
    } else if (event.request.method === 'GET' && pathname === '/oceny/reviews') {
      const client = new Client(DATABASE_URL);
      await client.connect();
      const reviews = await fetchOcenySklepow(client);
      await client.end();

      return new Response(JSON.stringify(reviews), {
        status: 200
      });
    } else if (event.request.method === 'POST' && pathname === '/oceny/dodaj') {
      const client = new Client(DATABASE_URL);
      const productData = await event.request.json(); // parse the incoming JSON
      await OcenSklep(client, productData);

      return new Response('success', {
        status: 200
      });
    }



    try {
      return await getAssetFromKV(event);
    } catch (e) {
      return new Response(`"${pathname}" not found`, {
        status: 404,
        statusText: "not found"
      });
    }
  }


  //Wyszukiwarka
  async function fetchProductData(client: Client, nazwa: string) {
    await client.connect();
    const {
      rows: productRows
    } = await client.query(`
    SELECT * 
    FROM produkty 
    WHERE nazwa % $1 
    ORDER BY cena ASC, nazwa <-> $1 ASC
  `, [nazwa]);
    for (let product of productRows) {
      const {
        rows: shopRows
      } = await client.query('SELECT * FROM sklepy WHERE id_sklep = $1', [product.id_sklep]);
      const {
        rows: shopAddressRows
      } = await client.query('SELECT * FROM sklepy_adres WHERE id_sklep = $1', [product.id_sklep]);
      product.shop = shopRows[0];
      if (shopAddressRows[0]) {
        product.shop.adres = shopAddressRows[0].adres;
      }
    }
    await client.end();
    return productRows[0];
  }




  //porównywarka
  async function fetchAllProducts(client: Client) {
    await client.connect();
    const {
      rows: productRows
    } = await client.query('SELECT * FROM produkty ORDER BY nazwa ASC');
    for (let product of productRows) {
      const {
        rows: shopRows
      } = await client.query('SELECT * FROM sklepy WHERE id_sklep = $1', [product.id_sklep]);
      const {
        rows: shopAddressRows
      } = await client.query('SELECT * FROM sklepy_adres WHERE id_sklep = $1', [product.id_sklep]);
      product.shop = shopRows[0];
      if (shopAddressRows[0]) {
        product.shop.adres = shopAddressRows[0].adres;
      }
    }
    await client.end();
    return productRows;
  }


  //Rejestracja
  async function registerUser(client: Client, data: any) {
    await client.connect();
    const query = 'INSERT INTO uzytkownicy (admin, email, haslo, nazwa) VALUES ($1, $2, $3, $4)';
    const values = [false, data.email, data.haslo, data.nazwa]; // assuming admin is always false for new users
    console.log
    await client.query(query, values);
    await client.end();
    return {
      status: 'success'
    };
  }


  //Znalezienie wszystkich lokalizacji sklepów
  async function fetchAllShopLocalizations(client: Client) {
    await client.connect();
    const {
      rows: shopLocalizationRows
    } = await client.query('SELECT adres FROM sklepy_adres');
    console.log('Shop Localization Rows:', shopLocalizationRows); // Logging stringified rows
    await client.end();
    return shopLocalizationRows;
  }

  //Logowanie
  async function loginUser(client: Client, data: any) {
    await client.connect();
    const query = 'SELECT * FROM uzytkownicy WHERE email = $1 AND haslo = $2';
    const values = [data.email, data.password];
    const {
      rows
    } = await client.query(query, values);
    await client.end();

    if (rows.length > 0) {
      // Login was successful
      return {
        status: 'success',
        user: rows[0].nazwa
      };
    } else {
      // Invalid email or password
      return {
        status: 'error',
        message: 'Invalid email or password'
      };
    }
  }

  //profil
  async function fetchUserProfile(client: Client, userIdObj: {
    userId: string
  }) {
    const userId = userIdObj.userId;
    console.log('fetchUserProfile userId:', userId); // Log userId

    await client.connect();

    const userDataRes = await client.query('SELECT * FROM uzytkownicy WHERE nazwa = $1', [userId]);
    console.log('User data response:', userDataRes.rows); // Log returned data
    /*
      // Log the contents of the returned data
      if (userDataRes.rows.length > 0) {
        console.log('Returned data contents:', userDataRes.rows[0]);
      } else {
        console.log('No data returned');
      }
      */

    await client.end();

    if (userDataRes.rows.length > 0) {
      return {
        data: userDataRes.rows[0],
      };
    } else {
      throw new Error('User data not found');
    }
  }

  //zmiana danych profilu
  async function ZmienDane(client: Client, data1: any) {

    await client.connect();
    const query = 'UPDATE uzytkownicy SET admin = $1, email = $2, haslo = $3, nazwa = $4, zdjecie = $5 WHERE nazwa = $4';
    const values = [false, data1.email, data1.haslo, data1.nazwa, data1.zdjecie]; // assuming admin is always false for new users
    await client.query(query, values);
    await client.end();
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      body: JSON.stringify({
        status: 'success'
      })
    };
  }

  async function ZmienDaneProduktu(client: Client, productData: any) {
    // Connect to the database
    await client.connect();
    console.log('productDataS:', JSON.stringify(productData)); // Log the product data



    const values = [
      parseFloat(productData.cena),
      productData.gatunek,
      productData.nazwa,
      productData.obraz,
      productData.opis,
      parseInt(productData.pojemnosc),
      productData.producent,
      productData.typ,
      parseFloat(productData.zawartosc_alk),
      parseInt(productData.id_produktow)
    ];

    // Update the product data in the database
    const query = `UPDATE produkty SET cena = $1, gatunek = $2, nazwa = $3, obraz = $4, opis = $5, pojemnosc = $6, producent = $7, typ = $8, zawartosc_alk = $9 WHERE id_produktow = $10`;

    try {
      // Execute the query
      await client.query(query, values);
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error executing query', err.stack);
      } else {
        console.error('Error executing query', err);
      }
    } finally {
      // End the database connection
      await client.end();
    }
  }
  //oceny
  async function fetchOcenySklepow(client: Client) {
    const {
      rows
    } = await client.query(`
  SELECT  ocena_sklep, ocena_sklep.id_sklep, nazwa_u, uzytkownicy.zdjecie, sklepy.nazwa, sklepy.obraz, opis
  FROM ocena_sklep
  INNER JOIN uzytkownicy ON ocena_sklep.nazwa_u = uzytkownicy.nazwa
  INNER JOIN sklepy ON ocena_sklep.id_sklep = sklepy.id_sklep
  `);

    return rows;
  }


async function OcenSklep(client: Client, review: any) {
  // Connect to the database
  await client.connect();
  console.log('review:', JSON.stringify(review)); // Log the review data

  // Find the id_sklep from the sklepy table using fuzzy search
  console.log("review.shopName", review.shopName)
  const sklepResult = await client.query(`SELECT id_sklep FROM sklepy WHERE nazwa % $1`, [review.shopName]);
  const id_sklep = sklepResult.rows[0]?.id_sklep;
  console.log("nazwa sklepu", sklepResult.rows[0]?.id_sklep)

  // Find the nazwa from the uzytkownicy table using fuzzy search
  const userResult = await client.query(`SELECT nazwa FROM uzytkownicy WHERE nazwa % $1 ORDER BY nazwa <-> $1 ASC`, [review.userId]);
  const nazwa_u = userResult.rows[0]?.nazwa;
  console.log("nazwa usera", userResult.rows[0]?.nazwa)

  const values = [review.stars, id_sklep, nazwa_u, review.opis];

  // Insert the data into the ocena_sklep table
  const query = `INSERT INTO ocena_sklep (ocena_sklep, id_sklep, nazwa_u, opis) VALUES ($1, $2, $3, $4)`;

  try {
    // Execute the query
    await client.query(query, values);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error executing query', err.stack);
    } else {
      console.error('Error executing query', err);
    }
  } finally {
    // End the database connection
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      body: JSON.stringify({
        status: 'success'
      })
    };
    await client.end();
  }
}