"use client"

import { generateRandomId } from "@/lib/generateRandomId"
import { generateText } from "@/lib/openai"

export default function TestPage() {
  function processGeneratedText(text) {
    // You can add your custom logic to parse the generated text and create the JSON structure.
    // This is just a basic example that assumes the generated text has the desired format.

    const lines = text.trim().split("\n")

    // Function to parse a line and create an object
    function parseLine(line) {
      const [key, value] = line.split(": ")
      return { [key.trim()]: value.trim() }
    }

    const structure = {
      body: {
        id: generateRandomId(),
        tag: "main",
        className: "w-full h-screen",
        children: [],
      },
    }

    let currentObj = structure.body
    for (const line of lines) {
      if (line.startsWith("  ")) {
        // The line is indented, so it's a property of the current object
        Object.assign(currentObj, parseLine(line.trim()))
      } else {
        // The line is not indented, so it's a new object
        const obj = parseLine(line)
        structure.body.children.push(obj)
        currentObj = obj
      }
    }

    return structure
  }

  return (
    <>
      <h1>Welcome to tomy.</h1>
      <button
        onClick={async () => {
          const generatedText = await generateText(
            "Generate a JSON structure for a website to create a complete homepage for a dentist professional using Tailwind CSS. Use the following example structure as a reference and please take in consideration that i need complete code and also you can understand that each object are converted into html nodes and their children are nested nodes too, then you can use it to generate a very complete structure: \n\nbody: {\n  id: generateRandomId(),\n  tag: 'main',\n  className: 'w-full border h-32',\n  children: [\n    {\n      id: generateRandomId(),\n      tag: 'div',\n      className: 'container mx-auto',\n      children: [],\n    }\n  ],\n}\n"
          )
          console.log(generatedText)
        }}
      >
        Generate Text
      </button>
    </>
  )
}
