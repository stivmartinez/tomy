const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  footer: {
    id: generateRandomId(),
    tag: "footer",
    className: "h-32 w-full border-2 border-orange-500",
    children: [],
  },
}

export const fetchFooter = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
