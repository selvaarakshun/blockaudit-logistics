
# BlockAudit Logistics Desktop Application

This folder contains the Electron configuration to run BlockAudit Logistics as a desktop application without modifying the package.json file.

## Running the Desktop Application

To run the application in development mode:

```
# First install required dependencies (only need to do this once)
npm install --save-dev electron electron-builder

# Then run the setup script
node electron/setup.js
```

When prompted, select option 1 for development mode or option 2 to build the application.

## Building for Distribution

To build the desktop application for distribution:

1. Run `node electron/setup.js`
2. Select option 2 (Build production app)
3. The built application will be available in the `electron-dist` folder

## Available Platforms

The application can be built for:
- Windows (.exe installer)
- macOS (.dmg)
- Linux (AppImage and .deb)

## Project Structure

- `electron/main.js` - Main Electron process
- `electron/preload.js` - Preload script that securely exposes Electron APIs
- `electron/setup.js` - Setup script to run and build the application
- `electron-builder.json` - Configuration for building the app
