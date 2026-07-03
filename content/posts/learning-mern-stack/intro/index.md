+++
date = '2026-07-03T09:08:56+07:00'
draft = false
title = 'Tổng quan về serie MERN Stack Ký Sự'
categories = ['Web Development']
tags = ['web', 'mern', 'ptit']
image = 'cover.png'
series = ['MERN Stack Ký Sự']
series_order = 1
summary = 'Bài viết mở đầu serie "MERN Stack Ký Sự", giới thiệu mục đích và lộ trình tự học Lập trình Web của mình'
+++

## Giới thiệu chút

Chuyện là sang kỳ tới mình sẽ học môn **Lập trình Web**, và theo như truyền thống của mọi năm thì khả năng rất cao là mình sẽ được học môn này dưới sự dẫn dắt của một thầy giáo nào đó sẽ dạy mình về **MERN Stack**. 🐧

Vì thế, đây là serie mà mình viết trong quá trình mình tự học và mình gọi nó là **"MERN Stack Ký Sự"**. Mục đích mình viết serie này là để nhằm take note lại những kiến thức mà mình cần học cho dễ nhớ, tiện đọc lại.

Về nội dung của serie này thì mình chủ yếu học trên [F8](https://f8.edu.vn), focus vào 2 khoá chính là ReactJS và NodeJS + ExpressJS. [F8](https://f8.edu.vn) dạy rất chi tiết và 2 khoá học này cũng hoàn toàn miễn phí nên mình recommend các bạn có thể theo học trên này.

- Xây dựng Website với ReactJS: https://f8.edu.vn/learning/reactjs
- NodeJS & ExpressJS: https://f8.edu.vn/learning/nodejs

Ngoài ra, nếu bạn cũng là đồng môn **PTIT** hoặc cũng học Lập trình Web giống mình thì mong là serie này giúp ích được gì đó cho bạn. 😄

Trong serie này thì mình học chủ yếu trên F8 nên về cấu trúc cũng giống với F8. À ngoài ra thì nếu bạn chưa biết gì về HTML, CSS và JavaScript thì cũng có thể theo học trên F8 này nhé

- HTML CSS từ Zero tới Hero: https://f8.edu.vn/learning/html-css
- Lập Trình JavaScript Cơ Bản: https://f8.edu.vn/learning/javascript-co-ban

## Về MERN Stack

Thì theo như các bạn thấy ở ảnh cover, MERN Stack là một stack được cấu thành từ 4 thằng

- **M**ongoDB: Một hệ quản trị cơ sở dữ liệu mã nguồn mở, thuộc NoSQL. Nó lưu dữ liệu dưới dạng document JSON
- **E**xpressJS: Back-end framework chạy trên nền tảng NodeJS, giúp ta dựng các API, routing, xử lí các request/response của client
- **R**eactJS: Front-end do Facebook phát triển, sử dụng kiến trúc dựa trên [Component](https://www.tutorialspoint.com/software_architecture_design/component_based_architecture.htm) và [VirtualDOM](https://viblo.asia/p/hieu-sao-ve-virtual-dom-trong-reactjs-bWrZngDblxw)
- **N**odeJS: Môi trường thực thi cho phép chạy code JS ở phía Server, nó là môi trường để ExpressJS chạy được trên này

Vì khi đụng tới MERN thì ta sẽ dev dựa trên JavaScript, nên tất nhiên chúng ta cần phải biết một chút kiến thức về JavaScript như mấy cú pháp [ES6](https://viblo.asia/p/tim-hieu-mot-vai-cu-phap-co-trong-es6-trong-5-phut-Eb85oxDmK2G) (nâng cao) thì mới hiểu flow hoạt động và viết lại được.

## Lưu ý

> Trước khi bắt đầu đọc các bài viết tiếp theo, mình muốn lưu ý 3 điều quan trọng sau đây

**1. Create React App (CRA) hiện tại đã lỗi thời**
- Tại thời điểm mình viết bài này (Tháng 7/2026), CRA đã được đội ngũ ReactJS [thông báo chính thức là **ngừng phát triển** (sunset)](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) kể từ Tháng 02/2025.

- Dù ReactJS đã ra mắt phiên bản 19 và CRA vẫn hỗ trợ phiên bản này, nhưng nó sẽ **không còn nhận được bất kì cập nhật hay cải tiến nào nữa**.

**2. Khuyến nghị cho các dự án mới**

Nếu bạn đang làm một dự án mới tinh, tốt hơn hết là nên sử dụng các framework hiện đại được chính team React khuyến nghị:
* **[Next.js](https://nextjs.org/)**
* **[React Router](https://reactrouter.com/)**
* **[Expo](https://expo.dev/)** (Dành cho ứng dụng di động)

Hoặc, nếu bạn chỉ muốn dùng các công cụ build (build tools) thế hệ mới, hãy thử:
* **[Vite](https://vite.dev/)**
* **[Parcel](https://parceljs.org/)**
* **[Rsbuild](https://rsbuild.rs/)**

**3. Mình vẫn chọn học Create React App**
* **Tại PTIT:** Theo như một vài bạn học trước nói với mình thì vẫn được sử dụng CRA, thậm chí bắt buộc, một vài bạn lại nói được phép dùng Next.js

- Anyway, mình vẫn muốn tiếp cận theo hướng nền tảng với CRA trước. Sau khi quen với các concept của React thì mình sẽ chuyển qua Next.js (mong sẽ có bài viết chi tiết về Next.js sau :v)

## Đoạn kết

Do môn này đến lúc đi thi hay kiểm tra cũng chỉ yêu cầu **code** được phần **ReactJS và ExpressJS** và nêu **luồng hoạt động** là chính. Cho nên mình cần tập trung vào hai phần này nhiều hơn.

HTML, CSS mình không viết do không được hỏi tới khi thi/kiểm tra. 🤗

Bài viết được đúc kết từ quá trình mình tự học khóa React trên F8 và tài liệu môn học. Cảm ơn các tác giả đã cung cấp nền tảng kiến thức

Happy coding 💖