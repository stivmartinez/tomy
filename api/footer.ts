export const apiResponse = {
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

export const fetchFooter = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
