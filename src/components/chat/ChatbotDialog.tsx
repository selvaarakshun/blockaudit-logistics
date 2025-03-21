
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, X, Send, ChevronDown, ChevronUp, MessageSquare, Mic, MicOff, Zap } from 'lucide-react';
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

// Define our WebkitSpeechRecognition type
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

// Define our global speech recognition constructor
interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

// Define window with our WebkitSpeechRecognition
interface CustomWindow extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
}

const mockResponses: Record<string, string> = {
  "hello": "Hello! I'm your blockchain assistant. How can I help you with Hyperledger Fabric, interoperability, or smart contracts today?",
  "fabric": "Hyperledger Fabric is an enterprise-grade permissioned blockchain framework. I can help you connect to networks, deploy chaincode, or execute transactions.",
  "interoperability": "Blockchain interoperability allows different networks to communicate. You can transfer assets between chains or verify documents across multiple blockchains.",
  "smart contract": "Smart contracts are self-executing contracts with terms directly written into code. I can help you deploy contracts to Ethereum, Hyperledger Fabric, or other networks.",
  "help": "I can assist with: connecting to blockchain networks, executing chaincode, deploying smart contracts, transferring assets between chains, or verifying documents.",
  "": "I'm here to help with all your blockchain needs. Just ask me about Hyperledger Fabric, smart contracts, interoperability, or any other blockchain-related questions!"
};

const CHAT_HISTORY_KEY = 'blockchain-assistant-chat-history';

const ChatbotDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
      if (savedMessages) {
        const parsedMessages: Message[] = JSON.parse(savedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
      } else if (messages.length === 0) {
        const initialMessage: Message = {
          id: crypto.randomUUID(),
          content: "Welcome to GuudzChain Assistant! I can help you with blockchain operations, Hyperledger Fabric, smart contracts, and cross-chain interoperability. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages([initialMessage]);
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify([initialMessage]));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
      if (messages.length === 0) {
        setMessages([{
          id: crypto.randomUUID(),
          content: "Welcome to GuudzChain Assistant! I can help you with blockchain operations, Hyperledger Fabric, smart contracts, and cross-chain interoperability. What would you like to know?",
          sender: 'bot',
          timestamp: new Date()
        }]);
      }
    }

    // Safely check and initialize speech recognition
    const customWindow = window as CustomWindow;
    if (customWindow.SpeechRecognition || customWindow.webkitSpeechRecognition) {
      const SpeechRecognitionConstructor = customWindow.SpeechRecognition || customWindow.webkitSpeechRecognition;
      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        
        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[0][0].transcript;
          setInputValue(transcript);
          setTimeout(() => handleSendMessage(), 500);
        };
        
        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            title: "Voice recognition error",
            description: "Could not recognize your voice. Please try again or type your message.",
          });
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    speechSynthesisRef.current = new SpeechSynthesisUtterance();
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (window.speechSynthesis && speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I'm not sure how to respond to that. Could you try asking about Hyperledger Fabric, blockchain interoperability, or smart contracts?";
      
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

      if (isVoiceEnabled && speechSynthesisRef.current) {
        speechSynthesisRef.current.text = botResponse;
        const voices = window.speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => voice.name.includes('Female') || voice.name.includes('Google UK English Female'));
        if (femaleVoice) {
          speechSynthesisRef.current.voice = femaleVoice;
        }
        window.speechSynthesis.speak(speechSynthesisRef.current);
      }
    }, 1000 + Math.random() * 1000);
  };

  const toggleVoice = () => {
    if (!isVoiceEnabled && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
    
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    setIsVoiceEnabled(!isVoiceEnabled);
    toast({
      title: isVoiceEnabled ? "Voice response disabled" : "Voice response enabled",
      description: isVoiceEnabled ? "Bot will no longer speak responses." : "Bot will now speak responses to you.",
    });
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech recognition not supported",
        description: "Your browser doesn't support speech recognition. Please type your message instead.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.abort();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current.start();
      toast({
        title: "Listening...",
        description: "Speak your message clearly.",
      });
    }
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

  const clearChat = () => {
    const welcomeMessage = {
      id: crypto.randomUUID(),
      content: "Welcome to GuudzChain Assistant! I can help you with blockchain operations, Hyperledger Fabric, smart contracts, and cross-chain interoperability. What would you like to know?",
      sender: 'bot' as const,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify([welcomeMessage]));
    toast({
      title: "Chat history cleared",
      description: "Your conversation has been reset.",
    });
  };

  return (
    <>
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
                    onClick={toggleVoice}
                    title={isVoiceEnabled ? "Disable voice responses" : "Enable voice responses"}
                  >
                    {isVoiceEnabled ? <Zap className="h-4 w-4" /> : <Zap className="h-4 w-4 opacity-50" />}
                  </Button>
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
                            disabled={isListening}
                          />
                          <Button
                            type="button"
                            size="icon"
                            disabled={isTyping}
                            className={cn(
                              "text-white",
                              isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                            )}
                            onClick={toggleListening}
                          >
                            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          </Button>
                          <Button 
                            type="submit"
                            size="icon" 
                            disabled={isTyping || !inputValue.trim() || isListening}
                            className={cn(
                              "bg-blue-600 hover:bg-blue-700 text-white",
                              (isTyping || !inputValue.trim() || isListening) && "opacity-50 cursor-not-allowed"
                            )}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </form>
                        <div className="flex justify-between mt-2">
                          <div className="flex gap-2 overflow-x-auto py-1">
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs text-gray-500 h-7"
                            onClick={clearChat}
                          >
                            Clear
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
