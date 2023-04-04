export const apiResponse = {
  body: {
    id: "345",
    tag: "main",
    className: "w-full bg-white",
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
                className: "w-full px-3",
                children: [
                  {
                    id: "3456337890",
                    tag: "div",
                    className:
                      "grid gap-12 my-3 sm:grid-cols-1 lg:grid-cols-3",
                    componentName: "BlockPosts",
                    props: {
                      posts: "featured",
                      params: {
                        //post_type: "page",
                        per_page: 3,
                        page: 1,
                      },
                      variants: {
                        type: "card",
                        //image: false,
                        //category: false,
                        //caption: false
                        //description: false,
                        //inverse: true,
                        title: {
                          size: "md",
                        }
                      },
                    },
                  },
                  {
                    id: "34567890",
                    tag: "div",
                    className:
                      "grid gap-12 my-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1",
                    componentName: "BlockPosts",
                    props: {
                      posts: "recent",
                      params: {
                        per_page: 2,
                        page: 1,
                      },
                      imageHeight: "3xl",
                      variants: {
                        type: "list",
                        //overlay: true,
                      },
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

export const fetchBody = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
