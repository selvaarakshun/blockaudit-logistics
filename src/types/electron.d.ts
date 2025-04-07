
// Type definitions for Electron integration

interface ElectronAPI {
  getAppInfo: () => Promise<any>;
  on: (channel: string, callback: (...args: any[]) => void) => void;
}

interface Window {
  electron?: ElectronAPI;
  isElectron?: boolean;
}
