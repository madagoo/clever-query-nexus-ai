
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

interface ChatInterfaceProps {
  initialPrompt?: string;
  onAnalysisRequest?: (prompt: string) => void;
}

const ChatInterface = ({ initialPrompt, onAnalysisRequest }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si on a un prompt initial, on l'ajoute aux messages et on simule une réponse
    if (initialPrompt) {
      const initialMessages: Message[] = [
        {
          text: initialPrompt,
          isUser: true,
          timestamp: new Date()
        },
        {
          text: "Je vais analyser votre requête. Voici les résultats initiaux. Avez-vous des questions spécifiques sur ces données ?",
          isUser: false,
          timestamp: new Date(Date.now() + 1000)
        }
      ];
      
      setMessages(initialMessages);
      
      // Si on a une fonction de callback, on l'appelle avec le prompt initial
      if (onAnalysisRequest) {
        onAnalysisRequest(initialPrompt);
      }
    }
  }, [initialPrompt, onAnalysisRequest]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages([...messages, newUserMessage]);
    setInput("");

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        text: generateAIResponse(input),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      
      // Trigger analysis update if needed
      if (onAnalysisRequest) {
        onAnalysisRequest(input);
      }
    }, 1000);
  };

  const generateAIResponse = (query: string): string => {
    // Très simple simulation de réponse
    const responses = [
      "D'après mon analyse, les données montrent une tendance à la hausse dans ce domaine.",
      "Intéressant. Quand on regarde de plus près, on peut voir des variations saisonnières significatives.",
      "Les données ne montrent pas de corrélation évidente entre ces variables.",
      "J'ai mis à jour les visualisations avec ces nouveaux paramètres.",
      "Voulez-vous que j'approfondisse un aspect particulier de cette analyse ?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Discussion avec l'analyste IA</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p>{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Posez une question sur les données..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatInterface;
