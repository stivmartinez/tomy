const generateRandomId = () => Math.floor(Math.random() * 1000000).toString()

export const apiResponse = {
  header: {
    "id": "800699",
    "tag": "section",
    "type": "container",
    "className": [
      "w-full",
      "min-h-[24px]",
      "flex",
      "items-center",
      "bg-slate-100"
    ],
    "children": [
      {
        "type": "container",
        "tag": "div",
        "className": [
          "w-full",
          "flex",
          "flex-col",
          "min-h-[24px]",
          "bg-slate-900"
        ],
        "content": "",
        "icon": {},
        "id": "423100",
        "parentId": "800699",
        "children": [
          {
            "type": "container",
            "tag": "div",
            "className": [
              "min-h-[24px]",
              "mx-auto",
              "w-4/6",
              "flex-row",
              "gap-4",
              "flex",
              "p-4",
              "py-2",
              "bg-slate-900",
              "px-4"
            ],
            "content": "",
            "icon": {},
            "id": "457004",
            "parentId": "423100",
            "children": [
              {
                "type": "container",
                "tag": "div",
                "className": [
                  "min-h-[24px]",
                  "flex-row",
                  "gap-2",
                  "text-slate-100",
                  "text-sm",
                  "items-center",
                  "flex",
                  "w-fit"
                ],
                "content": "",
                "icon": {},
                "id": "864872",
                "parentId": "457004",
                "children": [
                  {
                    "type": "image",
                    "tag": "img",
                    "className": ["w-fit", "block", "h-8"],
                    "content": "",
                    "props": {
                      "src": "https://betuber.com/betuber.svg",
                      "alt": "Example image"
                    },
                    "icon": {},
                    "selfClosing": true,
                    "id": "964412",
                    "parentId": "864872",
                    "children": []
                  },
                  {
                    "type": "heading",
                    "tag": "h1",
                    "className": ["font-bold", "text-lg"],
                    "content": "betuber",
                    "icon": {},
                    "id": "237651",
                    "parentId": "864872",
                    "children": []
                  }
                ]
              },
              {
                "type": "container",
                "tag": "div",
                "className": [
                  "w-full",
                  "min-h-[24px]",
                  "justify-end",
                  "flex",
                  "flex-row",
                  "gap-2"
                ],
                "content": "",
                "icon": {},
                "id": "637969",
                "parentId": "457004",
                "children": [
                  {
                    "type": "button",
                    "tag": "button",
                    "className": [
                      "text-white",
                      "px-4",
                      "py-2",
                      "rounded",
                      "bg-slate-900",
                      "border-0"
                    ],
                    "content": "Home",
                    "icon": {},
                    "id": "524221",
                    "parentId": "637969",
                    "children": []
                  },
                  {
                    "type": "button",
                    "tag": "button",
                    "className": [
                      "text-white",
                      "px-4",
                      "py-2",
                      "rounded",
                      "bg-slate-900",
                      "border-0"
                    ],
                    "content": "Influencers",
                    "icon": {},
                    "id": "972649",
                    "parentId": "637969",
                    "children": []
                  },
                  {
                    "type": "button",
                    "tag": "button",
                    "className": [
                      "text-white",
                      "px-4",
                      "py-2",
                      "rounded",
                      "bg-slate-900",
                      "border-0"
                    ],
                    "content": "Videos",
                    "icon": {},
                    "id": "158321",
                    "parentId": "637969",
                    "children": []
                  },
                  {
                    "type": "button",
                    "tag": "button",
                    "className": [
                      "text-white",
                      "px-4",
                      "py-2",
                      "rounded",
                      "bg-slate-900",
                      "border-2"
                    ],
                    "content": "Sign",
                    "icon": {},
                    "id": "612255",
                    "parentId": "637969",
                    "children": []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
}

export const fetchHeader = (delay: number = 500): Promise<typeof apiResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(apiResponse);
    }, delay);
  });
};
