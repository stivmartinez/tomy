const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  body: {
    id: generateRandomId(),
    tag: "main",
    className: "h-32 w-full border-2 border-red-500",
    children: [],
  },
}

export const fetchBody = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
