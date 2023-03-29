export const apiResponse = {
  body: {
    id: "345",
    tag: "main",
    className: "w-full my-3",
    children: [
      {
        id: "3456",
        tag: "section",
        className: "w-full",
        children: [
          {
            id: "34567",
            tag: "div",
            className: "w-full max-w-6xl mx-auto flex flex-row",
            children: [
              {
                id: "345678",
                tag: "div",
                className: "w-full",
                children: [
                  {
                    id: "34567890",
                    tag: "div",
                    className:
                      "w-full",
                    componentName: "BlockSingle",
                    params: {
                      slug: "{post_slug}",
                    },
                    props: {
                      posts: "single",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
}

export const fetchSingle = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
