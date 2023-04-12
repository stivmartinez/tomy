const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  footer: {
    id: generateRandomId(),
    tag: "footer",
    className: "w-full",
    children: [
      {
        id: generateRandomId(),
        tag: "div",
        className: "container mx-auto py-3 items-center flex",
        children: [
          {
            id: generateRandomId(),
            tag: "p",
            className: "w-full text-sm",
            content: "© 2021 - 2022",
          }
        ],
      }
    ],
  },
}

export const fetchFooter = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
