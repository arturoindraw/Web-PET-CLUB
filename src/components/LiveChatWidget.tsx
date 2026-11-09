import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';
import { ChatMessage, CRMContact } from '../types';

interface LiveChatWidgetProps {
  onOpenBooking: () => void;
  onSaveChatToCRM: (chatLog: string, clientName?: string, phone?: string) => void;
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ onOpenBooking, onSaveChatToCRM }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadBadge, setUnreadBadge] = useState(true);
  const [inputText, setInputText] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: '¡Hola! 🐾 Bienvenido a Pet House Club Montería. Soy tu asistente virtual. ¿Cómo podemos consentir a tu mascota hoy?',
      timestamp: 'Ahora',
      quickReplies: [
        { label: '📅 Agendar una cita', action: 'book' },
        { label: '💰 Precios y Servicios', action: 'pricing' },
        { label: '🚐 Domicilio en Montería', action: 'delivery' },
        { label: '💬 Hablar con un humano', action: 'human' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadBadge(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleQuickReply = (action: string) => {
    let userText = '';
    let botResponseText = '';
    let nextReplies: { label: string; action: string }[] | undefined = undefined;

    if (action === 'book') {
      userText = 'Deseo agendar una cita o reserva';
      botResponseText = '¡Excelente decisión! Te abro el widget de reservas en tiempo real para que escojas fecha, hora y servicio.';
      setTimeout(() => {
        onOpenBooking();
      }, 900);
    } else if (action === 'pricing') {
      userText = 'Consultar precios y servicios';
      botResponseText = 'Nuestras tarifas base en La Castellana:\n• Guardería día completo: $38.000 COP\n• Peluquería raza/estilo: $55.000 COP\n• Baño y Spa Ozonoterapia: $42.000 COP\n• Domicilio ida y vuelta: $15.000 COP.\n¿Deseas reservar alguno?';
      nextReplies = [
        { label: '📅 Reservar ahora', action: 'book' },
        { label: '💬 Hablar con asesor humano', action: 'human' },
      ];
    } else if (action === 'delivery') {
      userText = 'Consultar cobertura de recogida a domicilio';
      botResponseText = 'Nuestra Pet Van climatizada cubre La Castellana, El Recreo, Monteverde, Pasatiempo, Los Álamos, Urbina y toda Montería. Desinfectamos los guacales tras cada viaje.';
      nextReplies = [
        { label: '📅 Agendar con domicilio', action: 'book' },
        { label: '💬 Preguntar por mi barrio', action: 'human' },
      ];
    } else if (action === 'human') {
      userText = 'Deseo hablar con un asesor humano';
      botResponseText = `¡Con gusto! Puedes chatear directamente con nuestro equipo de recepción por WhatsApp al ${CLUB_INFO.phone}. ¿Deseas que te transfiera ahora?`;
      nextReplies = [
        { label: '📲 Abrir WhatsApp Oficial', action: 'open_wa' },
        { label: '📅 Mejor reservo online', action: 'book' },
      ];
    } else if (action === 'open_wa') {
      window.open(CLUB_INFO.social.whatsapp, '_blank');
      return;
    }

    const newMsgs: ChatMessage[] = [
      ...messages,
      {
        id: `msg-${Date.now()}-user`,
        sender: 'user',
        text: userText,
        timestamp: 'Ahora',
      },
      {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: botResponseText,
        timestamp: 'Ahora',
        quickReplies: nextReplies,
      },
    ];

    setMessages(newMsgs);

    // Save to CRM conversation log
    const fullLog = newMsgs.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
    onSaveChatToCRM(fullLog, clientName || 'Visitante Web', clientPhone || 'Por WhatsApp');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText;
    setInputText('');

    let botResponse = '¡Gracias por tu mensaje! Para darte la mejor atención personalizada sobre tu mascota, te podemos comunicar directamente con nuestro equipo de recepción en La Castellana.';

    const lower = userText.toLowerCase();
    if (lower.includes('precio') || lower.includes('costo') || lower.includes('cuanto')) {
      botResponse = 'Nuestros baños inician en $42.000 COP, peluquería en $55.000 COP y guardería en $38.000 COP. ¿Quieres agendar una cita?';
    } else if (lower.includes('domicilio') || lower.includes('recogen') || lower.includes('van')) {
      botResponse = '¡Sí! Contamos con Pet Van con aire acondicionado y guacales individuales en toda Montería por $15.000 COP ida y vuelta.';
    } else if (lower.includes('horario') || lower.includes('hora')) {
      botResponse = 'Atendemos de Lunes a Sábado de 7:00 AM a 7:00 PM y Domingos de 8:00 AM a 4:00 PM en Calle 59 #9-40 La Castellana.';
    }

    const newMsgs: ChatMessage[] = [
      ...messages,
      {
        id: `msg-${Date.now()}-user`,
        sender: 'user',
        text: userText,
        timestamp: 'Ahora',
      },
      {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: botResponse,
        timestamp: 'Ahora',
        quickReplies: [
          { label: '📅 Agendar cita', action: 'book' },
          { label: '💬 Hablar por WhatsApp', action: 'open_wa' },
        ],
      },
    ];

    setMessages(newMsgs);

    const fullLog = newMsgs.map((m) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
    onSaveChatToCRM(fullLog, clientName || 'Visitante Web', clientPhone || 'Por WhatsApp');
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Abrir chat en vivo con Pet House Club"
            className="relative group p-4 rounded-full bg-[#151824] border-2 border-[#ff2a85] text-white shadow-[0_0_25px_rgba(255,42,133,0.7)] hover:scale-108 transition-all flex items-center justify-center cursor-pointer"
          >
            {/* Unread badge */}
            {unreadBadge && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00f0ff] text-gray-950 font-extrabold text-[11px] flex items-center justify-center shadow-[0_0_10px_rgba(0,240,255,0.8)] animate-pulse">
                1
              </span>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-xl">🐶</span>
              <MessageCircle className="w-6 h-6 text-[#ff2a85]" />
            </div>

            {/* Hover tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-gray-900 border border-gray-700 text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
              ¿Deseas consultar o reservar? ¡Chatea aquí!
            </div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] h-[550px] max-h-[85vh] rounded-3xl bg-[#121520] border-2 border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#171a2a] via-[#151928] to-[#1e1b2e] border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#00f0ff] p-0.5">
                <img
                  src="/assets/aistudio/PET_HOUSE_logo_aa6a9ad4.jpg"
                  alt="Pet House Club"
                  className="w-full h-full object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Pet House Bot</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
                </h4>
                <p className="text-[11px] text-gray-400">
                  En línea · Montería La Castellana
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0d0f17]">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-[#ff2a85] text-white rounded-br-none shadow-[0_0_12px_rgba(255,42,133,0.3)]'
                        : 'bg-[#181c2b] text-gray-200 border border-gray-700 rounded-bl-none shadow'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick replies for bot */}
                  {msg.quickReplies && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {msg.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleQuickReply(reply.action)}
                          className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-[#1a2033] border border-gray-700 hover:border-[#00f0ff] text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          {reply.label}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <span className="text-[10px] text-gray-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* CRM Connection Note */}
          <div className="px-4 py-1.5 bg-[#10131d] border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Historial archivado en CRM
            </span>
            <a
              href={CLUB_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00f0ff] hover:underline"
            >
              WhatsApp +57 305 4397799
            </a>
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#131624] border-t border-gray-800 flex items-center gap-2">
            <input
              type="text"
              placeholder="Escribe tu consulta aquí..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1a1e30] border border-gray-700 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff2a85]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#ff2a85] hover:bg-[#e01e77] text-white disabled:opacity-40 transition-all cursor-pointer shadow-[0_0_12px_rgba(255,42,133,0.4)]"
              aria-label="Enviar mensaje"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
