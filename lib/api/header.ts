const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  header: {
    id: generateRandomId(),
    tag: "header",
    className: "h-32 w-full border-2 border-yellow-500",
    children: [],
  },
}

export const fetchHeader = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
