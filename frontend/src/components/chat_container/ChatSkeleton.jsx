const ChatSkeleton = () => {
  // 6 placeholder giả
  const placeholders = Array(6).fill(null);
  // Các độ dài bubble giả (random cảm giác tin nhắn dài/ngắn khác nhau)
  const widths = ["w-32", "w-44", "w-52", "w-36", "w-40", "w-48"];

  return (
    <div className="flex flex-col gap-6 p-4">
      {placeholders.map((_, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 ${
            i % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Avatar */}
          {i % 2 === 0 && (
            <div className="w-9 h-9 rounded-full bg-base-300 animate-pulse" />
          )}

          {/* Message bubble */}
          <div
            className={`flex flex-col gap-2 ${
              i % 2 === 0 ? "items-start" : "items-end"
            }`}
          >
            {/* Thanh nhỏ giả tên/time */}
            <div className="h-3 w-20 rounded bg-gradient-to-r from-base-300 to-base-200 animate-pulse" />
            {/* Bubble chính */}
            <div
              className={`h-6 rounded-2xl bg-gradient-to-r from-base-300 to-base-200 animate-pulse ${widths[i]}`}
            />
          </div>

          {i % 2 !== 0 && (
            <div className="w-9 h-9 rounded-full bg-base-300 animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
