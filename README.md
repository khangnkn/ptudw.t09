# Đồ án Phát triển ứng dụng web

## Thành viên:

- Nguyễn Khắc Nguyên Khang @nkhang
- Nguyễn Thị Ngân Khánh @ngankhanh98
- Nguyễn Công Hưng @nchconghung

## Giai đoạn 1: Front end

Phát triển giao diện các trang:

- [Trang chủ](localhost:3000/)
- Các trang dành cho `subcriber`
  - [Login](localhost:3000/subcriber/login)
  - [Đổi mật khẩu](http://localhost:3000/subscriber/change-password)
  - [Cập nhật thông tin](http://localhost:3000/subscriber/update-info)
- Các trang dành cho `writer`
  - [Bài viết mới](http://localhost:3000/writer/editor)
  - [Tất cả bài viết đã viết](http://localhost:3000/writer/articles)
- Các trang dành cho `editor`
  - [Trang bài viết nháp](http://localhost:3000/editor/drafts)
- Các trang dành cho `admin`
  - [Trang quản lý các categories](http://localhost:3000/admin/categories)
  - [Trang quản lý các tags](http://localhost:3000/admin/tags)
  - [Trang quản lý các bài viết](http://localhost:3000/admin/drafts)
  - [Trang quản lý người dùng](http://localhost:3000/admin/users)
- Một số bài viết mẫu
  - [5 tính năng hay nhất của MIUI 10 trên máy Xiaomi](http://localhost:3000/article/article-1)
  - [Thực tế điều khiển đèn, máy lạnh, quạt, robot hút bụi, chơi nhạc... bằng Google Assistant tiếng Việt](http://localhost:3000/article/article-2)
  - [YouTube đã "sát hại" Internet Explorer 6 ](http://localhost:3000/article/article-3)
  - [Trải nghiệm Google Assistant tiếng Việt: Thông minh, được việc, giọng êm nhưng đôi lúc đùa hơi nhạt](http://localhost:3000/article/article-4)

### Kiểm tra:

- Clone từ [GitHub](https://github.com/nkhang/ptudw.t09)

```bash
git clone https://github.com/nkhang/ptudw.t09.git
cd ptudw.t09
```

- Cài đặt các dependencies cần thiết:

```bash
npm install
```

- Start ứng dụng:

```bash
npm start
```

- Ứng dụng sẽ chạy ở port 3000. Chú ý: Tắt ứng dụng đang chạy port 3000 nếu `npm start` không thành công.
