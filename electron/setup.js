
/**
 * This script allows us to run the electron app without modifying package.json
 * Run it with: node electron/setup.js
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check if electron is installed
try {
  require('electron');
} catch (e) {
  console.error('Electron is not installed. Please install it with "npm install electron --save-dev"');
  process.exit(1);
}

function runDev() {
  console.log('Starting Vite development server...');
  
  const viteProcess = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: true
  });
  
  viteProcess.on('error', (error) => {
    console.error('Failed to start Vite server:', error);
    process.exit(1);
  });
  
  // Wait a moment for Vite to start
  setTimeout(() => {
    console.log('Starting Electron app...');
    const electronProcess = spawn('npx', ['electron', 'electron/main.js'], {
      env: {
        ...process.env,
        ELECTRON_START_URL: 'http://localhost:8080',
        NODE_ENV: 'development'
      },
      stdio: 'inherit',
      shell: true
    });
    
    electronProcess.on('error', (error) => {
      console.error('Failed to start Electron:', error);
      viteProcess.kill();
      process.exit(1);
    });
    
    electronProcess.on('close', () => {
      viteProcess.kill();
      process.exit(0);
    });
  }, 2000);
}

function buildApp() {
  console.log('Building the app with Vite...');
  
  const buildProcess = spawn('npx', ['vite', 'build'], {
    stdio: 'inherit',
    shell: true
  });
  
  buildProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Build failed');
      process.exit(1);
    }
    
    console.log('Building Electron app...');
    const electronBuildProcess = spawn('npx', ['electron-builder', '--config', 'electron-builder.json'], {
      stdio: 'inherit',
      shell: true
    });
    
    electronBuildProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Electron build failed');
        process.exit(1);
      }
      
      console.log('Electron app built successfully!');
      process.exit(0);
    });
  });
}

console.log('BlockAudit Logistics Electron App Setup');
console.log('1. Run development mode');
console.log('2. Build production app');

rl.question('Choose an option (1 or 2): ', (answer) => {
  if (answer === '1') {
    runDev();
  } else if (answer === '2') {
    buildApp();
  } else {
    console.log('Invalid option. Exiting.');
    process.exit(1);
  }
});
