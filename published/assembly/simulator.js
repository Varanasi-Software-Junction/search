document.addEventListener("DOMContentLoaded", () => {
  const codeInput = document.getElementById("codeInput");
  const runBtn = document.getElementById("runBtn");
  const stepBtn = document.getElementById("stepBtn");
  const clearInputBtn = document.getElementById("clearInputBtn");
  const clearOutputBtn = document.getElementById("clearOutputBtn");
  const output = document.getElementById("output");
  const registersDiv = document.getElementById("registers");

  // Simulated Registers
  const registers = { AX: 0, BX: 0, CX: 0, DX: 0 };

  // Function to update registers display
  function updateRegisters() {
    registersDiv.innerHTML = "";
    for (const [reg, value] of Object.entries(registers)) {
      const regDiv = document.createElement("div");
      regDiv.className = "register";
      regDiv.textContent = `${reg}: ${value}`;
      registersDiv.appendChild(regDiv);
    }
  }

  // Function to parse and execute a line of assembly code
  function executeInstruction(line) {
    const [instruction, ...args] = line.split(/[\s,]+/); // Split on spaces or commas
    switch (instruction.toUpperCase()) {
      case "MOV":
        registers[args[0]] = parseInt(args[1]);
        break;
      case "ADD":
        registers[args[0]] += parseInt(args[1]);
        break;
      case "SUB":
        registers[args[0]] -= parseInt(args[1]);
        break;
      case "INC":
        registers[args[0]] += 1;
        break;
      case "DEC":
        registers[args[0]] -= 1;
        break;
      default:
        output.textContent += `Unknown instruction: ${line}\n`;
    }
  }

  // Highlight a specific line in the textarea
  function highlightLine(lineNumber) {
    const lines = codeInput.value.split("\n");
    const highlightedLines = lines.map((line, index) =>
      index === lineNumber ? `> ${line}` : line.replace(/^> /, "")
    );
    codeInput.value = highlightedLines.join("\n");
  }

  // Run the entire program
  runBtn.addEventListener("click", () => {
    const codeLines = codeInput.value.split("\n").map(line => line.trim());
    output.textContent = "Running program...\n";
    codeLines.forEach((line, index) => {
      executeInstruction(line);
      output.textContent += `Executed Line ${index + 1}: ${line}\n`;
    });
    updateRegisters();
  });

  // Step through the program
  let currentLine = 0;
  let codeLines = [];
  stepBtn.addEventListener("click", () => {
    if (currentLine === 0) {
      codeLines = codeInput.value.split("\n").map(line => line.trim());
      output.textContent = "Stepping through program...\n";
    }
    if (currentLine < codeLines.length) {
      const line = codeLines[currentLine];
      executeInstruction(line);
      output.textContent += `Executed Line ${currentLine + 1}: ${line}\n`;
      highlightLine(currentLine);
      currentLine++;
    } else {
      output.textContent += "Program completed.\n";
      currentLine = 0;
    }
    updateRegisters();
  });

  // Clear the program, output, and registers
  clearInputBtn.addEventListener("click", () => {
    codeInput.value = "";
    // output.textContent = "Program output will appear here...";
    currentLine = 0;
    for (const reg in registers) {
      registers[reg] = 0;
    }
    updateRegisters();
  });

  clearOutputBtn.addEventListener("click", () => {
    // codeInput.value = "";
    output.textContent = "Program output will appear here...";
    currentLine = 0;
    for (const reg in registers) {
      registers[reg] = 0;
    }
    updateRegisters();
  });
  


  updateRegisters(); // Initialize registers display
});
