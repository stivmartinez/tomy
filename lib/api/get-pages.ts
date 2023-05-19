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
  const { data } = await res.json();
  return data.pages;
}
