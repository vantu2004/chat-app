export const formatTime = (time) => {
  if (!time) return "";
  try {
    const date = new Date(time);
    const now = new Date();

    // so sánh cùng ngày/tháng/năm
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      // chỉ hiển thị giờ:phút
      return date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // hiển thị ngày/tháng/năm (có thể kèm giờ nếu bạn muốn)
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } catch {
    return time;
  }
};
