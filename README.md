# Real-Time Leaderboard System

## Description
A backend service built with **NestJS**, **MySQL**, and **Redis** to manage real-time leaderboards for games or activities. Users can register, submit scores, view global rankings,view player rank and generate reports


## Project URL

This project is implemented based on [Real-time Leaderboard project on roadmap.sh](https://roadmap.sh/projects/realtime-leaderboard-system)


## Features

- User Authentication (JWT-based)
- Score Submission per Game
- Leaderboard Updates via Redis
- Ranking Queries by Game/User
- Historical Score Tracking (MySQL)


## Technology

- **TypeScript**
- **Node.js**
- **NestJS**
- **TypeORM**
- **MySQL**
- **Redis**
- **Passport**
- **JWT**

## Installation

### 1. Clone the Repo

```bash
git clone https://github.com/dtduc-ptit/real-time-leaderboard.git
cd real-time-leaderboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create .env File

```bash
PORT=3000
JWT_SECRET=your-secret-key

DB_HOST=mysql
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your-pass
DB_NAME=your-db

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_URL=redis://redis:6379
```
### 4. Running with Docker

```bash
docker-compose up --build
```
It will start:

- NestJS API at http://localhost:3000

- MySQL DB at localhost:3307

- Redis at localhost:6379

## API Endpoints

| Method     | Endpoint            | Description                                |
| ---------- | ------------------- | ------------------------------------------ |
| **POST**   | `/auth/register`    | Đăng ký người dùng                         |
| **POST**   | `/auth/login`       | Đăng nhập, nhận access token               |
| **POST**   | `/scores`           | Nộp điểm cho 1 trò chơi cụ thể             |
| **GET**    | `/scores/rank/top?gameId=`  | Lấy top điểm số của game |
| **GET**    | `/scores/rank/me?gameId=`   | Lấy thứ hạng của chính người dùng          |
| **GET**    | `/scores/report?gameId=&date=&top=`    | Thống kê điểm của game theo ngày          |
| **POST**   | `/games`            | Thêm một trò chơi mới                      |
| **GET**    | `/games?name=`            | Lấy danh sách tên trò chơi              |
| **GET**    | `/games/:id`        | Lấy chi tiết trò chơi theo ID              |
| **PATCH**  | `/games/:id`        | Cập nhật thông tin trò chơi                |
| **DELETE** | `/games/:id`        | Xóa trò chơi                               |
| **GET**    | `/leaderboard/game` | Thống kê keys game được lưu trong redis       |
| **GET**    | `/leaderboard`      | Lấy bảng xếp hạng tổng hợp nhiều game      |