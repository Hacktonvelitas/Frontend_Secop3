import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useChat } from '@/hooks/use-chat';
import aiLogo from '@/images/logo_ai_siipro.png';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const suggestedQuestions = [
  '¿Cómo funciona el proceso de licitación?',
  '¿Qué documentos necesito primero?',
  '¿Qué es la Garantía de Seriedad?',
  '¿Por dónde empiezo con esta licitación?'
];

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '¡Hola! 👋 Soy tu asistente de licitaciones. Estoy aquí para guiarte en el proceso de preparación de ofertas. ¿En qué puedo ayudarte hoy?'
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { sendMessageAsync, isLoading, finalizeConversationAsync, isFinalizing } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    // Detectar si el usuario escribió "Finalizar"
    if (messageText.toLowerCase().trim() === 'finalizar') {
      await handleFinalize();
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const responseText = await sendMessageAsync(messageText);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, tuve problemas para conectar con el servidor. Por favor intenta de nuevo.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleFinalize = async () => {
    if (isFinalizing) return;

    setInput('');

    const finalizeMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: 'Finalizar'
    };

    setMessages(prev => [...prev, finalizeMessage]);

    try {
      const responseText = await finalizeConversationAsync('default_user');

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to finalize conversation:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, tuve problemas para finalizar la conversación. Por favor intenta de nuevo.'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-105 z-50",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <MessageCircle className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-6 right-6 w-96 h-[600px] bg-card rounded-2xl shadow-elevated border border-border flex flex-col overflow-hidden transition-all duration-300 z-50",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center overflow-hidden">
              <img src={aiLogo} alt="AI Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Asistente SIICOP</h3>
              <p className="text-xs text-muted-foreground">Tu guía de licitaciones</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap",
                  message.role === 'user'
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                )}
              >
                {message.content}
              </div>
            </div>
          ))}

          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="space-y-2 pt-2">
              <p className="text-xs text-muted-foreground font-medium">Preguntas sugeridas:</p>
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSend(question)}
                  className="block w-full text-left px-3 py-2 text-sm bg-muted/50 hover:bg-muted rounded-xl transition-colors text-foreground"
                >
                  {question}
                </button>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-bl-md rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
              className="input-field text-sm py-2.5"
              disabled={isLoading || isFinalizing}
            />
            
            <button
              onClick={() => handleSend()}
              disabled={isLoading || isFinalizing}
              className="p-2.5 bg-primary rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
              ) : (
                <Send className="w-5 h-5 text-primary-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
