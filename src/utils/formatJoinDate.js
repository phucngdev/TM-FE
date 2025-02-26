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

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);

  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
  const formattedTime = new Intl.DateTimeFormat("en-US", timeOptions).format(
    date
  );

  return `${formattedDate} - ${formattedTime}`;
};

// 💡 Ví dụ sử dụng:
// const now = new Date();
// console.log(formatDate(now)); // 👉 "Feb 21, 2025 - 8:49 AM"
