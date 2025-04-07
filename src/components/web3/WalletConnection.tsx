
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, CircleDollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const WalletConnection = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState('0.00');
  const [showDialog, setShowDialog] = useState(false);
  
  // Simulate wallet connection
  const connectWallet = async () => {
    try {
      // This would be replaced with actual wallet connection logic
      if (window.ethereum) {
        const accounts = ['0x1234...5678'];
        setWalletAddress(accounts[0]);
        setWalletBalance('1,234.56');
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected.",
        });
      } else {
        setShowDialog(true);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
    setWalletBalance('0.00');
    
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };
  
  return (
    <>
      {isConnected ? (
        <Button 
          variant="outline" 
          className="wallet-connect-btn"
          onClick={disconnectWallet}
        >
          <CircleDollarSign className="size-4" />
          <span className="hidden md:inline">{walletBalance} USDC</span>
          <span className="text-xs opacity-60">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
        </Button>
      ) : (
        <Button 
          variant="outline" 
          className="wallet-connect-btn"
          onClick={connectWallet}
        >
          <Wallet className="size-4" />
          <span className="hidden md:inline">Connect Wallet</span>
        </Button>
      )}
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Web3 Wallet Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p>To use our payment features, you need a Web3 wallet like MetaMask or WalletConnect.</p>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 border border-border rounded-xl hover:border-primary/50 transition-all">
                <img src="https://metamask.io/images/metamask-fox.svg" alt="MetaMask" className="w-12 h-12 mb-2" />
                <span>MetaMask</span>
              </a>
              <a href="https://walletconnect.com/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center p-4 border border-border rounded-xl hover:border-primary/50 transition-all">
                <img src="https://walletconnect.com/walletconnect-logo.png" alt="WalletConnect" className="w-12 h-12 mb-2" />
                <span>WalletConnect</span>
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WalletConnection;
