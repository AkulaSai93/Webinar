/* The picks that build the sentence, and the roadmap each dream unlocks. */

export type Dream = {
  v: string;
  to: string;
  steps: [string, string][];
};

export const YEARS = ["Year 1", "Year 2"];
export const BRANCHES = ["BTech", "BSc", "BCA", "MCA", "MSc"];

export const PHASES = ["Start here", "Next", "Then", "After that", "Finally"];

export const DREAMS: Dream[] = [
  {
    v: "crack a role at a top tech company",
    to: "a role at a top tech company",
    steps: [
      ["Get your fundamentals right", "How computers, operating systems and networks actually work. Every interview builds on this."],
      ["Master one language", "Pick Python, Java or C++ and use it daily until writing code feels natural."],
      ["DSA, pattern by pattern", ""],
      ["Projects that prove depth", ""],
      ["Interview-ready, round by round", ""],
    ],
  },
  {
    v: "launch my own startup",
    to: "your own startup",
    steps: [
      ["Learn to build, fast", "One language plus web or app basics, enough to turn an idea into a working prototype."],
      ["Find a problem worth solving", "Talk to real users before you write a line of code. Most startups skip this and pay for it."],
      ["Ship an AI-powered first version", ""],
      ["Win your first 100 users", ""],
      ["Pitch it like a founder", ""],
    ],
  },
  {
    v: "become an AI engineer",
    to: "becoming an AI engineer",
    steps: [
      ["Python and the maths behind AI", "Fluent Python, plus the linear algebra and probability every model runs on."],
      ["Engineer first, AI second", "DSA and core CS. Companies hire AI engineers who can actually engineer."],
      ["Machine learning foundations", ""],
      ["Build with LLMs and agents", ""],
      ["Ship AI projects people use", ""],
    ],
  },
  {
    v: "work on products millions use",
    to: "working on products millions use",
    steps: [
      ["Strong CS foundations", "Fundamentals, one language and DSA. The base every product engineer stands on."],
      ["See how real apps are built", "Frontend, backend and databases, by building a full app end to end yourself."],
      ["Think in systems", ""],
      ["Build for scale", ""],
      ["Get into product teams", ""],
    ],
  },
  {
    v: "contribute to world-class open source",
    to: "contributing to world-class open source",
    steps: [
      ["Get fluent with Git and GitHub", "Branches, pull requests and code reviews, the way real engineering teams work."],
      ["Learn to read big codebases", "Start with docs and small fixes in projects you already use every day."],
      ["Land your first merged PR", ""],
      ["Become a regular contributor", ""],
      ["Aim for global OSS programs", ""],
    ],
  },
  {
    v: "win big at national hackathons",
    to: "winning national hackathons",
    steps: [
      ["Build end to end, quickly", "Go from idea to working demo in a weekend: frontend, backend and an API or two."],
      ["Find your team, practise small", "Join college and online mini-hackathons to learn speed, roles and teamwork."],
      ["Add AI to every build", ""],
      ["Demo and pitch like a winner", ""],
      ["Take on national-level hackathons", ""],
    ],
  },
];
