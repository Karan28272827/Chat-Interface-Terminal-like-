// "use client";
// import { useState, useEffect, useRef } from "react";
// import "./Terminal.css";
//
// export default function Terminal() {
//   const [input, setInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [isCommandExecuted, setIsCommandExecuted] = useState(false);
//   const canvasRef = useRef(null);
//
//   const handleCommand = () => {
//     setIsCommandExecuted(false); // Reset the execution state
//     setOutput(`> ${input}\nCommand executed successfully.`);
//     setInput("");
//     // Wait for a moment, then trigger the animation
//     setTimeout(() => setIsCommandExecuted(true), 100); // Animation starts after 100ms delay
//   };
//
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleCommand();
//   };
//
//   // Matrix animation logic
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//
//     // Make canvas full screen
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//
//     // Characters to display
//     const chars =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%&@#".split(
//         "",
//       );
//
//     // Calculate columns (adjust character size here if needed)
//     const fontSize = 14;
//     const columns = Math.floor(canvas.width / fontSize);
//
//     // Array for drops - one per column
//     const drops = [];
//
//     // Initialize drops
//     for (let i = 0; i < columns; i++) {
//       drops[i] = Math.random() * -100; // Random starting position above screen
//     }
//
//     // Animation function
//     const draw = () => {
//       // Add semi-transparent black rectangle to create fade effect
//       ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
//       ctx.fillRect(0, 0, canvas.width, canvas.height);
//
//       // Set text color and font
//       ctx.fillStyle = "rgba(0, 255, 128, 0.8)"; // Matrix green
//       ctx.font = `${fontSize}px "Fira Code", monospace`;
//
//       // Draw characters
//       for (let i = 0; i < drops.length; i++) {
//         // Random character
//         const char = chars[Math.floor(Math.random() * chars.length)];
//
//         // Draw character
//         ctx.fillText(char, i * fontSize, drops[i] * fontSize);
//
//         // Move drop down when it's on screen and randomize speed
//         if (drops[i] * fontSize > 0) {
//           drops[i] += 0.05 + Math.random() * 0.1;
//         } else {
//           drops[i] += 0.02; // Slower approach from top
//         }
//
//         // Reset drop when it reaches bottom
//         if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
//           drops[i] = 0;
//         }
//       }
//     };
//
//     // Handle resize
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//
//     window.addEventListener("resize", handleResize);
//
//     // Start animation
//     const interval = setInterval(draw, 33); // ~30fps
//
//     return () => {
//       clearInterval(interval);
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
//
//   return (
//     <div className="terminal-fullscreen">
//       <canvas
//         ref={canvasRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           zIndex: 1,
//         }}
//       />
//
//       <div className="terminal-box" style={{ position: "relative", zIndex: 2 }}>
//         <div className="terminal-welcome">
//           Welcome to <span className="glow">MyTerminal</span> 🚀
//         </div>
//         {output && (
//           <div
//             className={`terminal-output ${isCommandExecuted ? "command-executed" : ""}`}
//           >
//             {output}
//           </div>
//         )}
//         <div className="terminal-input-row">
//           <span className="terminal-prompt">$</span>
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             className="terminal-input"
//             placeholder="Type your command..."
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from "react";
import "./Terminal.css";

export default function Terminal() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isCommandExecuted, setIsCommandExecuted] = useState(false);
  const canvasRef = useRef(null);

  const handleCommand = () => {
    setIsCommandExecuted(false);
    setOutput(`> ${input}\nCommand executed successfully.`);
    setInput("");
    setTimeout(() => setIsCommandExecuted(true), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleCommand();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$%&@#".split(
        "",
      );
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 128, 0.8)";
      ctx.font = `${fontSize}px "Fira Code", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > 0) {
          drops[i] += 0.05 + Math.random() * 0.1;
        } else {
          drops[i] += 0.02;
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.99) {
          drops[i] = 0;
        }
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="terminal-fullscreen">
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />

      <div className="terminal-box" style={{ position: "relative", zIndex: 2 }}>
        <div className="terminal-welcome">
          Welcome to <span className="glow">MyTerminal</span> 🚀
        </div>

        {output && (
          <div
            className={`terminal-output ${isCommandExecuted ? "command-executed" : ""}`}
          >
            {output}
          </div>
        )}

        {isCommandExecuted && (
          <div
            className="ner-output"
            style={{
              marginTop: "1rem",
              background: "#fff",
              borderRadius: "8px",
              padding: "1rem",
              color: "#000",
            }}
            dangerouslySetInnerHTML={{
              __html: `
                <mark class="entity" style="background: #aa9cfc; padding: 0.3em 0.4em; border-radius: 0.3em; margin: 0 0.2em; display: inline-block;">
                  Jeff Gates
                  <span style="font-size: 0.8em; color: #000; font-weight: bold; margin-left: 0.5em;">PERSON</span>
                </mark>
                is going to acquire
                <mark class="entity" style="background: #9dfcdc; padding: 0.3em 0.4em; border-radius: 0.3em; margin: 0 0.2em; display: inline-block;">
                  Tesla
                  <span style="font-size: 0.8em; color: #000; font-weight: bold; margin-left: 0.5em;">ORG</span>
                </mark>
                for
                <mark class="entity" style="background: #fef7c3; padding: 0.3em 0.4em; border-radius: 0.3em; margin: 0 0.2em; display: inline-block;">
                  $0.01 billion
                  <span style="font-size: 0.8em; color: #000; font-weight: bold; margin-left: 0.5em;">MONEY</span>
                </mark>
              `,
            }}
          />
        )}

        <div className="terminal-input-row">
          <span className="terminal-prompt">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="terminal-input"
            placeholder="Type your command..."
          />
        </div>
      </div>
    </div>
  );
}
