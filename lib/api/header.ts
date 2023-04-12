const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  header: {
    id: generateRandomId(),
    tag: "header",
    className: "w-full bg-black",
    children: [
      {
        id: generateRandomId(),
        tag: "div",
        className: "container mx-auto py-3 items-center flex",
        children: [
          {
            id: generateRandomId(),
            tag: "div",
            className: "w-full",
            componentName: "BlockImage",
            props: {
              src: "/logo.svg",
              alt: "Logo",
              className: "h-4",
            },
          }
        ],
      }
    ],
  },
}

export const fetchHeader = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
