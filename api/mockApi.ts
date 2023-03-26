export const apiResponse = {
  header: {
    id: "123",
    tag: "header",
    className: "w-full",
    children: [
      {
        id: "1234",
        tag: "section",
        className: "w-full",
        children: [
          {
            id: "12345",
            tag: "div",
            className:
              "w-full max-w-6xl mx-auto flex flex-row justify-between py-6",
            children: [
              {
                id: "123456",
                tag: "div",
                className: "flex flex-col w-full justify-center",
                children: [
                  {
                    id: "1234567",
                    tag: "div",
                    componentName: "BlockLogo",
                    className: "w-32",
                    props: {
                      src: "/logo.svg",
                      alt: "logo",
                      className: "w-full h-auto",
                    },
                  },
                ],
              },
              {
                id: "1234567",
                tag: "div",
                className: "flex flex-row w-full justify-end gap-2",
                componentName: "BlockSocial",
                props: {
                  items: [
                    {
                      id: "1",
                      name: "Facebook",
                      icon: "Facebook",
                      type: "a",
                      className:
                        "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-blue-600 text-white",
                      props: {
                        href: "https://facebook.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    },
                    {
                      id: "2",
                      name: "Twitter",
                      icon: "Twitter",
                      type: "a",
                      className:
                        "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-blue-400 text-white",
                      props: {
                        href: "https://twitter.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    },
                    {
                      id: "3",
                      name: "Youtube",
                      icon: "Youtube",
                      type: "a",
                      className:
                        "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-red-600 text-white",
                      props: {
                        href: "https://youtube.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    },
                    {
                      id: "4",
                      name: "Instagram",
                      icon: "Instagram",
                      type: "a",
                      className:
                        "inline-flex items-center justify-center w-[28px] h-[28px] rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white",
                      props: {
                        href: "https://instagram.com",
                        target: "_blank",
                        rel: "noopener noreferrer",
                      },
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        id: "1234",
        tag: "nav",
        className: "w-full",
        children: [
          {
            id: "12345",
            tag: "div",
            className:
              "w-full max-w-6xl mx-auto flex flex-row justify-between h-12 bg-black rounded-xl",
          },
        ],
      },
    ],
  },
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
                      posts: "regularPosts",
                    },
                  }
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  footer: {
    id: "567",
    tag: "footer",
    className: "w-full",
    children: [
      {
        id: "12324",
        tag: "section",
        className: "w-full max-w-6xl mx-auto flex flex-row justify-between my-6",
        children: [
          {
            id: "121345",
            tag: "p",
            className: 'text-sm',
            content: "© Themesei 2021 - All rights reserved",
          },
        ],
      },
    ],
  },
}

export const fetchApiResponse = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
