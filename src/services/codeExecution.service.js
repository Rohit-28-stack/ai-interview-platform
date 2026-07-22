export const executeCode = async (language, code, stdin) => {
  // Temporary mock response
  return {
    stdout: "Hello World",
    stderr: null,
    compileOutput: null,
    executionTime: 0.21,
    memory: 16000,
    verdict: "Accepted",
  };
};