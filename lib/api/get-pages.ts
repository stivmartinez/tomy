export async function getPages() {
  const endpoint = 'https://lutettmtneuuhkkjnwym.hasura.us-east-1.nhost.run/v1/graphql';
  const res = await fetch(endpoint, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      query: `
        query getPages {
          pages {
            id
            structure
          }
        }
      `,
    }),
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
