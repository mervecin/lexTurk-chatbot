import React, { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Merhaba, nasıl yardımcı olabilirim?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Bu bir örnek yanıttır. Gerçek cevap burada görünecek.", sender: "bot" }
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="bg-white shadow px-6 py-4 text-xl font-semibold border-b">
        Hukuki Danışman Chatbotu
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 max-w-md rounded-2xl ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="p-4 border-t bg-white flex items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
          placeholder="Sorunuzu yazın..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default Chat;
