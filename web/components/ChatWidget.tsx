"use client";

import { useState, useRef, useEffect } from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
}

/* ─── Mock bot responses ────────────────────────────────────────────────── */
const MOCK_RESPONSES = [
  "Great question! Charles specialises in Data Analysis, ML Applications, LLM Bots, and Augmented Analytics. Which area interests you most?",
  "Pricing depends on scope, but most projects start from $300. Charles always provides a fixed-price quote upfront — no surprises.",
  "You can book a free 30-minute discovery call at /book, or send a project brief via /contact.",
  "Charles typically kicks off new projects within 48 hours of scoping. Timeline varies by complexity.",
  "Yes, Charles signs NDAs and you own 100% of the code and data on delivery.",
];

const GREETING: Message = {
  id: 0,
  role: "bot",
  text: "Hi! I'm Charles's AI assistant. I can help you understand his services, pricing, and how to get started. What are you working on?",
};

let responseIndex = 0;
function nextMockResponse(): string {
  const reply = MOCK_RESPONSES[responseIndex % MOCK_RESPONSES.length];
  responseIndex += 1;
  return reply;
}

/* ─── SVG icons ─────────────────────────────────────────────────────────── */
function ChatBubbleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(1);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /* Auto-scroll to bottom whenever messages change */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Auto-focus input when panel opens */
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { id: nextId, role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setNextId((n) => n + 1);

    /* Mock bot reply after 800 ms */
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId + 1, role: "bot", text: nextMockResponse() },
      ]);
      setNextId((n) => n + 2);
    }, 800);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  return (
    <>
      {/* ── Keyframe injection ─────────────────────────────────────────── */}
      <style>{`
        @keyframes chat-ping {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .chat-ping {
          animation: chat-ping 2.5s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .chat-ping { animation: none; }
        }
      `}</style>

      {/* ── Floating toggle button ──────────────────────────────────────── */}
      {!isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 100,
          }}
        >
          {/* Pulse ring */}
          <span
            className="chat-ping"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "var(--color-accent)",
              display: "block",
            }}
            aria-hidden="true"
          />

          {/* Green availability dot */}
          <span
            style={{
              position: "absolute",
              top: "2px",
              right: "2px",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "var(--color-accent)",
              border: "2px solid #fff",
              zIndex: 1,
            }}
            aria-hidden="true"
          />

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open chat"
            style={{
              position: "relative",
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "var(--color-hero)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(24,61,48,0.35)",
              zIndex: 1,
            }}
          >
            <ChatBubbleIcon />
          </button>
        </div>
      )}

      {/* ── Chat panel ─────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Chat with Charles AI"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "clamp(calc(100vw - 32px), 360px, 360px)",
            height: "clamp(60vh, 520px, 520px)",
            borderRadius: "16px",
            boxShadow:
              "0 24px 64px rgba(17,24,39,0.22), 0 4px 16px rgba(17,24,39,0.12)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 100,
            backgroundColor: "var(--color-bg-primary)",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "var(--color-hero)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Bot avatar */}
              <div
                aria-hidden="true"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "0.02em",
                  flexShrink: 0,
                }}
              >
                AI
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#fff",
                    lineHeight: 1.2,
                  }}
                >
                  Charles AI
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.65)",
                    fontFamily: "var(--font-body)",
                    lineHeight: 1.2,
                  }}
                >
                  Usually replies instantly
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.75)",
                fontSize: "20px",
                lineHeight: 1,
                padding: "4px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>

          {/* Messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              backgroundColor: "#fff",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "9px 13px",
                    borderRadius:
                      msg.role === "user"
                        ? "14px 14px 2px 14px"
                        : "14px 14px 14px 2px",
                    backgroundColor:
                      msg.role === "user" ? "var(--color-hero)" : "#fff",
                    color:
                      msg.role === "user" ? "#fff" : "var(--color-text-primary)",
                    border:
                      msg.role === "bot"
                        ? "1px solid var(--color-border)"
                        : "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "13.5px",
                    lineHeight: 1.55,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              padding: "12px",
              display: "flex",
              gap: "8px",
              backgroundColor: "#fff",
              flexShrink: 0,
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              aria-label="Chat message"
              style={{
                flex: 1,
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                padding: "8px 12px",
                fontSize: "13.5px",
                fontFamily: "var(--font-body)",
                color: "var(--color-text-primary)",
                backgroundColor: "#fff",
                outline: "none",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--color-accent)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--color-border)";
              }}
            />
            <button
              onClick={handleSend}
              aria-label="Send message"
              disabled={!input.trim()}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "8px",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                backgroundColor: input.trim()
                  ? "var(--color-hero)"
                  : "var(--color-border)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background-color 0.15s ease",
              }}
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
