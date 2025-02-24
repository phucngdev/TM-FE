export const formatJoinDate = (dateString) => {
  const date = new Date(dateString);
  return `Joined at ${date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;
};

// 📝 Ví dụ sử dụng
// console.log(formatJoinDate("2025-02-05T07:32:24.770Z"));
// Kết quả: "Joined at 5 Feb, 2025"

export const formatDate = (date) => {
  const parsedDate = new Date(date);
  return new Intl.DateTimeFormat("sv-SE").format(parsedDate); // YYYY-MM-DD
};

// console.log(formatDate(new Date())); // "2025-01-11"
