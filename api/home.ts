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
                      "grid gap-12 my-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
                    componentName: "BlockPosts",
                    props: {
                      posts: "recent",
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

export const fetchHome = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
