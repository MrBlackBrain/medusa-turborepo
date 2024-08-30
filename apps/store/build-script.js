const { spawn } = require("child_process")
const axios = require("axios")

let medusaProcess // Declare the Medusa process outside for access in cleanup functions

// Start the Medusa server process
function startMedusa() {
  medusaProcess = spawn("yarn", ["start:only"], {
    cwd: "../medusa", // Start Medusa from the parent directory
    stdio: "inherit",
  })

  medusaProcess.on("error", (err) => {
    console.error("Failed to start Medusa server:", err)
    cleanupAndExit(1)
  })

  medusaProcess.on("close", (code) => {
    console.log(`Medusa server exited with code ${code}`)
    cleanupAndExit(0)
  })
}

// Function to check the Medusa server status
function checkServerStatus() {
  axios
    .get("http://localhost:9000/store/products")
    .then(() => {
      console.log("Medusa server is ready")
      startStoreBuild() // Start the store build immediately when the server is ready
    })
    .catch(() => {
      console.log("Waiting for Medusa server to be ready...")
      setTimeout(checkServerStatus, 1000)
    })
}

// Function to start the store app build
function startStoreBuild() {
  console.log("Starting store build process...")
  const storeBuildProcess = spawn("yarn", ["build:only"], {
    stdio: "inherit",
  })

  storeBuildProcess.on("close", (code) => {
    console.log(`Store build process exited with code ${code}`)
    cleanupAndExit(code)
  })
}

// Function to clean up and exit the script
function cleanupAndExit(exitCode) {
  if (medusaProcess && !medusaProcess.killed) {
    console.log("Killing Medusa process...")
    medusaProcess.kill()
  }
  process.exit(exitCode)
}

// Ensure the Medusa process is terminated when the script exits
process.on("exit", cleanupAndExit)
process.on("SIGINT", cleanupAndExit) // Handle Ctrl+C
process.on("SIGTERM", cleanupAndExit) // Handle termination signals
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err)
  cleanupAndExit(1)
})

// Start the Medusa process and check the server status
startMedusa()
checkServerStatus()
