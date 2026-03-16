"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

const GREETING: Message = {
  id: 0,
  role: "bot",
  text: "Hi! I'm Charles's AI assistant. I can help you understand his services, pricing, and how to get started. What are you working on?",
};

function ChatBubbleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start" }}>
      <div style={{ padding: "10px 14px", borderRadius: "14px 14px 14px 2px", backgroundColor: "#fff", border: "1px solid var(--color-border)", display: "flex", gap: "4px", alignItems: "center" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--color-text-secondary)", display: "inline-block", animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [nextId, setNextId] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isOpen]);

  async function handleSend() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsgId = nextId;
    setMessages((prev) => [...prev, { id: userMsgId, role: "user", text }]);
    setInput("");
    setNextId((n) => n + 1);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: sessionId || undefined }),
      });

      const data = await res.json();

      if (data.sessionId && !sessionId) setSessionId(data.sessionId);

      setMessages((prev) => [
        ...prev,
        { id: userMsgId + 1, role: "bot", text: data.reply ?? "Sorry, something went wrong. Please try again." },
      ]);
      setNextId((n) => n + 2);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: userMsgId + 1, role: "bot", text: "Connection error. Please try again in a moment." },
      ]);
      setNextId((n) => n + 2);
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <>
      <style>{`
        @keyframes chat-ping {
          0%   { transform: scale(1);    opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .chat-ping { animation: chat-ping 2.5s ease-out infinite; }

        @keyframes typing-dot {
          0%, 60%, 100% { opacity: 0.25; transform: translateY(0); }
          30%            { opacity: 1;    transform: translateY(-4px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .chat-ping { animation: none; }
          [style*="typing-dot"] { animation: none !important; }
        }
      `}</style>

      {/* Floating toggle button */}
      {!isOpen && (
        <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 100 }}>
          <span className="chat-ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "block" }} aria-hidden="true" />
          <span style={{ position: "absolute", top: "2px", right: "2px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "var(--color-accent)", border: "2px solid #fff", zIndex: 1 }} aria-hidden="true" />
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            style={{ position: "relative", width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "var(--color-hero)", color: "#fff", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(24,61,48,0.35)", zIndex: 1 }}
          >
            <ChatBubbleIcon />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with Charles AI"
          style={{ position: "fixed", bottom: "24px", right: "24px", width: "clamp(calc(100vw - 32px), 360px, 360px)", height: "clamp(60vh, 520px, 520px)", borderRadius: "16px", boxShadow: "0 24px 64px rgba(17,24,39,0.22), 0 4px 16px rgba(17,24,39,0.12)", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 100, backgroundColor: "var(--color-bg-primary)" }}
        >
          {/* Header */}
          <div style={{ backgroundColor: "var(--color-hero)", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div aria-hidden="true" style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em", flexShrink: 0 }}>AI</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", color: "#fff", lineHeight: 1.2 }}>Charles AI</div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-body)", lineHeight: 1.2 }}>
                  {isLoading ? "Typing…" : "Usually replies instantly"}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.75)", fontSize: "20px", lineHeight: 1, padding: "4px", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: "10px", backgroundColor: "#fff" }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "9px 13px", borderRadius: msg.role === "user" ? "14px 14px 2px 14px" : "14px 14px 14px 2px", backgroundColor: msg.role === "user" ? "var(--color-hero)" : "#fff", color: msg.role === "user" ? "#fff" : "var(--color-text-primary)", border: msg.role === "bot" ? "1px solid var(--color-border)" : "none", fontFamily: "var(--font-body)", fontSize: "13.5px", lineHeight: 1.55 }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid var(--color-border)", padding: "12px", display: "flex", gap: "8px", backgroundColor: "#fff", flexShrink: 0 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              aria-label="Chat message"
              disabled={isLoading}
              style={{ flex: 1, border: "1px solid var(--color-border)", borderRadius: "8px", padding: "8px 12px", fontSize: "13.5px", fontFamily: "var(--font-body)", color: "var(--color-text-primary)", backgroundColor: "#fff", outline: "none", opacity: isLoading ? 0.6 : 1 }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "var(--color-accent)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
            />
            <button
              onClick={handleSend}
              aria-label="Send message"
              disabled={!input.trim() || isLoading}
              style={{ width: "38px", height: "38px", borderRadius: "8px", border: "none", cursor: input.trim() && !isLoading ? "pointer" : "default", backgroundColor: input.trim() && !isLoading ? "var(--color-hero)" : "var(--color-border)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background-color 0.15s ease" }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
