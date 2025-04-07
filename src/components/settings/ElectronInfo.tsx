
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface AppInfo {
  appName: string;
  version: string;
  platform: string;
}

const ElectronInfo = () => {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // Check if running in Electron
    setIsElectron(window.isElectron);

    // Get app info if running in Electron
    if (window.isElectron && window.electron) {
      window.electron.getAppInfo().then((info: AppInfo) => {
        setAppInfo(info);
      });
    }
  }, []);

  if (!isElectron) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Desktop Application</CardTitle>
          <CardDescription>This application is currently running in a web browser.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>The BlockAudit Logistics software can also be used as a desktop application.</p>
          <p className="mt-2">To run it as a desktop app, use the Electron setup script:</p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md mt-2 text-sm overflow-x-auto">
            node electron/setup.js
          </pre>
          <div className="mt-4">
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Download Desktop Version
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desktop Application</CardTitle>
        <CardDescription>You are running the desktop version of BlockAudit Logistics</CardDescription>
      </CardHeader>
      <CardContent>
        {appInfo ? (
          <div className="space-y-2">
            <p><strong>Application:</strong> {appInfo.appName}</p>
            <p><strong>Version:</strong> {appInfo.version}</p>
            <p><strong>Platform:</strong> {appInfo.platform}</p>
          </div>
        ) : (
          <p>Loading application information...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ElectronInfo;
