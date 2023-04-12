const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  body: {
    id: generateRandomId(),
    tag: "main",
    className: "w-full border h-32",
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
