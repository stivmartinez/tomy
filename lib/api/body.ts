const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  body: {
    id: generateRandomId(),
    tag: 'main',
    className: 'w-full border h-32',
    children: [
      {
        id: generateRandomId(),
        tag: 'div',
        className: 'container flex flex-row mx-auto',
        children: [
          {
            id: generateRandomId(),
            tag: 'div',
            className: 'flex-1 bg-white h-full',
            children: [
              {
                id: generateRandomId(),
                tag: 'div',
                className: 'flex flex-col items-center justify-center text-center',
                children: [
                  {
                    id: generateRandomId(),
                    tag: 'div',
                    componentName: 'BlockImage',
                    className: 'h-20',
                    props: {
                      src: 'image-url',
                      alt: 'Dentist Professional'
                    }
                  },
                  {
                    id: generateRandomId(),
                    tag: 'h1',
                    className: 'text-4xl font-bold text-gray-800',
                    content: 'Dentist Professional',
                  },
                  {
                    id: generateRandomId(),
                    tag: 'p',
                    className: 'text-gray-700',
                    content: 'Welcome to our website. We provide the best dental care services and products.'
                  }
                ]
              },
              {
                id: generateRandomId(),
                tag: 'div',
                className: 'flex flex-row mt-2',
                children: [
                  {
                    id: generateRandomId(),
                    tag: 'div',
                    className: 'mr-2',
                    children: [
                      {
                        id: generateRandomId(),
                        tag: 'a',
                        className: 'bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded',
                        href: '/services',
                        content: 'Services'
                      }
                    ]
                  },
                  {
                    id: generateRandomId(),
                    tag: 'div',
                    className: 'ml-2',
                    children: [
                      {
                        id: generateRandomId(),
                        tag: 'a',
                        className: 'bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded',
                        href: '/contact',
                        content: 'Contact'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: generateRandomId(),
            tag: 'div',
            className: 'flex-1 bg-gray-200',
            children: [
              {
                id: generateRandomId(),
                tag: 'div',
                className: 'flex flex-col items-center justify-center text-center',
                children: [
                  {
                    id: generateRandomId(),
                    tag: 'div',
                    componentName: 'BlockImage',
                    props: {
                      src: 'image-url',
                      alt: 'Dental Care',
                      className: 'h-64 object-cover rounded-lg',
                    }
                  },
                  {
                    id: generateRandomId(),
                    tag: 'h1',
                    className: 'text-2xl font-bold text-gray-900',
                    content: 'Dental Care'
                  },
                  {
                    id: generateRandomId(),
                    tag: 'p',
                    className: 'text-gray-900',
                    content: 'We provide the best dental care services and products.'
                  }
                ]
              }
            ]
          }
        ],
      }
    ],
  }
}

export const fetchBody = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
