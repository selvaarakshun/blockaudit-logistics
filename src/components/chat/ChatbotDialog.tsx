
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, ChevronDown, ChevronUp, MessageSquare, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const mockResponses: Record<string, string> = {
  "hello": "Hello! I'm your blockchain assistant. How can I help you with Hyperledger Fabric, interoperability, or smart contracts today?",
  "fabric": "Hyperledger Fabric is an enterprise-grade permissioned blockchain framework. I can help you connect to networks, deploy chaincode, or execute transactions.",
  "interoperability": "Blockchain interoperability allows different networks to communicate. You can transfer assets between chains or verify documents across multiple blockchains.",
  "smart contract": "Smart contracts are self-executing contracts with terms directly written into code. I can help you deploy contracts to Ethereum, Hyperledger Fabric, or other networks.",
  "help": "I can assist with: connecting to blockchain networks, executing chaincode, deploying smart contracts, transferring assets between chains, or verifying documents.",
  "": "I'm here to help with all your blockchain needs. Just ask me about Hyperledger Fabric, smart contracts, interoperability, or any other blockchain-related questions!"
};

const ChatbotDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial bot message when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: crypto.randomUUID(),
          content: "Welcome to GuudzChain Assistant! I can help you with blockchain operations, Hyperledger Fabric, smart contracts, and cross-chain interoperability. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse = "I'm not sure how to respond to that. Could you try asking about Hyperledger Fabric, blockchain interoperability, or smart contracts?";
      
      // Check for keywords in user input
      const lowerCaseInput = inputValue.toLowerCase();
      for (const [keyword, response] of Object.entries(mockResponses)) {
        if (keyword && lowerCaseInput.includes(keyword)) {
          botResponse = response;
          break;
        }
      }
      
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  return (
    <>
      {/* Floating button to open chat */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button 
            size="lg" 
            className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
            onClick={toggleOpen}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      )}

      {/* Chat dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <Card className="border-2 border-blue-200 shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <span className="font-medium">Blockchain Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-white hover:bg-blue-500 rounded-full"
                    onClick={toggleMinimize}
                  >
                    {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-white hover:bg-blue-500 rounded-full"
                    onClick={toggleOpen}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Chat messages */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CardContent className="p-0">
                      <div className="h-80 overflow-y-auto p-3 bg-gray-50 dark:bg-gray-900">
                        <AnimatePresence>
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className={cn(
                                "mb-3 max-w-[85%] p-3 rounded-lg",
                                message.sender === 'user' 
                                  ? "ml-auto bg-blue-600 text-white rounded-br-none" 
                                  : "bg-white dark:bg-gray-800 shadow-sm rounded-bl-none"
                              )}
                            >
                              <p className="text-sm">{message.content}</p>
                              <div className={cn(
                                "text-xs mt-1",
                                message.sender === 'user' ? "text-blue-200" : "text-gray-400"
                              )}>
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </motion.div>
                          ))}
                          {isTyping && (
                            <motion.div
                              key="typing"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center gap-1 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm w-16"
                            >
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Input */}
                      <div className="p-3 bg-white dark:bg-gray-800 border-t">
                        <form 
                          className="flex gap-2" 
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                          }}
                        >
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask about blockchain..."
                            className="flex-1"
                          />
                          <Button 
                            type="submit"
                            size="icon" 
                            disabled={isTyping || !inputValue.trim()}
                            className={cn(
                              "bg-blue-600 hover:bg-blue-700 text-white",
                              isTyping && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                        <div className="flex gap-2 mt-2 overflow-x-auto py-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs py-1 h-7 whitespace-nowrap"
                            onClick={() => setInputValue("How to use Hyperledger Fabric?")}
                          >
                            Hyperledger Fabric
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs py-1 h-7 whitespace-nowrap"
                            onClick={() => setInputValue("Tell me about blockchain interoperability")}
                          >
                            Interoperability
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs py-1 h-7 whitespace-nowrap"
                            onClick={() => setInputValue("Deploy a smart contract")}
                          >
                            Smart Contracts
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotDialog;
