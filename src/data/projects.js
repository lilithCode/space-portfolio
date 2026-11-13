const projects = [
  {
    title: "Iris",
    year: 2026,
    image: "/ProjectImages/iris.webp",
    summary:
      "A chatbot that talks like my friend. I cleaned 81,000 lines of WhatsApp chat into 12,613 dialogue samples and fine tuned Llama-3 8B on them with Unsloth. A router model rewrites each message, decides when to search the web, and remembers things about you.",
    stack: ["Next.js", "Llama-3 8B", "Unsloth", "Hugging Face ZeroGPU", "Exa"],
    live: "https://iris-chat-bot-lac.vercel.app",
    code: "https://github.com/lilithCode/Iris_ChatBot",
  },
  {
    title: "0Keys",
    year: 2026,
    image: "/ProjectImages/0keys.webp",
    summary:
      "An invisible keyboard. A camera watches your hands, and taps on a bare table become keystrokes in any app. Runs in the browser, or as a desktop app on Linux, Windows and macOS.",
    stack: ["Python", "MediaPipe", "Computer vision"],
    live: "https://lilithcode.github.io/0Keys/",
    code: "https://github.com/lilithCode/0Keys",
  },
  {
    title: "Jinx",
    year: 2026,
    image: "/ProjectImages/jinx.webp",
    summary:
      "A dare game for friends. Everyone secretly drops dares into a shared jar, then someone shakes it. Rooms with join codes, live scores, vetoes and host controls, in a cute light mode and a gothic dark mode.",
    stack: ["Next.js", "TypeScript", "Upstash Redis", "Motion"],
    live: "https://jinx-seven.vercel.app",
    code: "https://github.com/lilithCode/jinx",
  },
  {
    title: "Lilith's Canvas",
    year: 2026,
    image: "/ProjectImages/Lilith-canvas.webp",
    summary:
      "Draw on the canvas and Lilith guesses your sketch in real time, using a 345-class convolutional network trained on Google's QuickDraw data, running entirely in the browser.",
    stack: ["Next.js", "TensorFlow.js", "CNN", "Tailwind CSS"],
    live: "https://lilith-canvas.vercel.app/",
    code: "https://github.com/lilithCode/canva-predictor",
  },
  {
    title: "Amadeus RAG",
    year: 2026,
    image: "/ProjectImages/amadeus.webp",
    summary:
      "The cyberpunk theme of Iris: the same Llama-3 8B model fine tuned on my friend's chats, with retrieval-augmented generation(RAG) added and the model served from a Hugging Face Space. Comes with a music player and saved sessions.",
    stack: ["Next.js", "Llama-3 8B", "RAG", "Hugging Face Spaces", "Framer Motion"],
    live: "https://amadeus-rag.vercel.app",
    code: "https://github.com/lilithCode/Amadeus_RAG",
  },
  {
    title: "Echo",
    year: 2026,
    image: "/ProjectImages/echo.webp",
    summary:
      "A Slack bot for teams. It answers questions, searches the web with citations, summarizes channel history by timeframe, and writes project status reports from what the team discussed.",
    stack: ["Node.js", "Slack Bolt", "Cheerio", "LLMs"],
    demo: "https://youtu.be/Wu7u665-Njo",
    code: "https://github.com/lilithCode/Echo",
  },
  {
    title: "Trova Tstra",
    year: 2025,
    image: "/ProjectImages/TrovaTstra.webp",
    summary:
      "A Next.js website with GSAP scroll animations and smooth transitions, plus a contact form that sends email through Resend.",
    stack: ["Next.js", "GSAP", "Resend", "Tailwind CSS"],
    live: "https://trova-tstra-three.vercel.app/",
    code: "https://github.com/lilithCode/trova-tstra",
  },
  {
    title: "Space Models 3D",
    year: 2025,
    image: "/ProjectImages/SpaceModel.webp",
    summary:
      "An interactive Three.js scene with a starry sky, orbiting planets and a rocket that follows your cursor.",
    stack: ["Three.js", "React", "React Three Fiber"],
    live: "https://3d-model-spacetheme.vercel.app/",
    code: "https://github.com/lilithCode/3d-model-spacetheme",
  },
  {
    title: "BeatStream",
    year: 2025,
    image: "/ProjectImages/BeatStream.webp",
    summary:
      "A music player built with plain HTML, CSS and JavaScript. Songs load from a JSON file and are grouped into playlists by category.",
    stack: ["JavaScript", "HTML", "CSS"],
    live: "https://beatstream-music-player.vercel.app",
    code: "https://github.com/lilithCode/beatstream-music-player",
  },
];

export default projects;
