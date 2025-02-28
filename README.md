# Dự án website quản lý công việc TM 🚀

> TM là một ứng dụng quản lý công việc giúp người dùng theo dõi tiến độ, phân công nhiệm vụ và tối ưu hóa quy trình làm việc..

## ✨ Tính năng

- ✅ Quản lý danh sách công việc theo trạng thái: To Do, In Progress, Review, Done.
- ✅ Quản lý thành viên, đội nhóm.
- ✅ Kéo thả (Drag & Drop) để thay đổi thứ tự ưu tiên công việc.
- ✅ Tìm kiếm, lọc và sắp xếp công việc.
- ✅ Phân quyền người dùng.
- ✅ Giao diện trực quan với Ant Design.

## 🔧 Công nghệ sử dụng

- 🔥 **Frontend**: ReactJS, Redux Toolkit, Ant Design, DnD Kit
- ⚡ **Backend**: Node.js, Express, MongoDB
- 🔗 **Authentication**: JWT
- 🛢 **Hosting**: Vercel (Frontend), Render (Backend)

### 1️⃣ **Requirements**

- Node.js >= 16
- Database
- Other necessary dependencies

### 2️⃣ **Clone the repository**

```sh
git clone https://github.com/phucngdev/TM-FE.git
git clone https://github.com/phucngdev/TM-BE.git
cd repository
```

### 3️⃣ **Install dependencies**

```sh
npm install
```

### 4️⃣ **Setup environment variables**

Create a `.env` file and configure:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
```

### 5️⃣ **Run the project**

#### 💻 **Backend**

```sh
npm start
```

#### 🌐 **Frontend**

```sh
cd client
npm run dev
```

## 📂 Project Structure Front-end

```
📦 project-name
 ┣ 📂 src
 ┃ ┣ 📂 apis
 ┃ ┣ 📂 assets
 ┃ ┣ 📂 components
 ┃ ┣ 📂 contexts
 ┃ ┣ 📂 data
 ┃ ┣ 📂 hooks
 ┃ ┣ 📂 layouts
 ┃ ┣ 📂 redux
 ┃ ┣ ┣ 📂 store
 ┃ ┣ ┣ 📂 useSlice
 ┃ ┣ 📂 resources
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 screens
 ┃ ┣ 📂 services
 ┃ ┗ 📜 App.css
 ┃ ┗ 📜 App.jsx
 ┃ ┗ 📜 index.css
 ┃ ┗ 📜 Main.jsx
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 📂 Project Structure Back-end

```
📦 project-name
 ┣ 📂 src
 ┃ ┣ 📂 apis
 ┃ ┣ ┣ 📂 v1
 ┃ ┣ ┣ ┣ 📂 controllers
 ┃ ┣ ┣ ┣ 📂 middlewares
 ┃ ┣ ┣ ┣ 📂 models
 ┃ ┣ ┣ ┣ 📂 repository
 ┃ ┣ ┣ ┣ 📂 routes
 ┃ ┣ ┣ ┣ 📂 services
 ┃ ┣ ┣ ┣ 📂 utils
 ┃ ┣ ┣ ┣ 📂 validation
 ┃ ┣ 📂 config
 ┃ ┣ 📂 test
 ┃ ┗ 📜 app.js
 ┃ ┗ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
```

## 📌 Danh sách API Endpoints

| Method | Endpoint            | Mô tả                                    | Request Body (JSON) |
| ------ | ------------------- | ---------------------------------------- | ------------------- |
| `GET`  | `/api/v1/tasks`     | Lấy danh sách tất cả công việc           | ❌ Không cần        |
| `GET`  | `/api/v1/tasks/:id` | Lấy thông tin chi tiết của một công việc | ❌ Không cần        |

---

## 📩 Contact

- 📧 Email: phucnguyen09022003@email.com
- 🔗 GitHub: [github.com/phucngdev](https://github.com/phucngdev)
