+++
date = '2025-12-28T12:35:20+07:00'
draft = false
title = 'Tìm hiểu về XSS - Phần 1. Các header thường thấy trong website'
image = 'cover.png'
+++
> Tìm hiểu về SOP, CORS, CSRF: Mục đích, cách hoạt động, các header chính (Access-Control-Allow-Origin, v.v...)

## Tại sao lại có SOP và CORS

Vì XSS là tấn công xuyên trang web, vì thế người ta đã đặt ra những chính sách (policy). Những chính sách đó là một tính năng bảo mật của trình duyệt nhằm hạn chế sự tương tác của trang web này đối với trang web kia.

Đơn giản hơn thì: Để phòng chống XSS, cần thiết phải đặt ra các chính sách. Chẳng hạn như là chỉ trang web `chinhphu.gov` mới được truy cập tài nguyên của `nganhang.com` thì `hacker.com` sẽ không tấn công XSS đối với `nganhang.com` được.

## SOP là gì?

SOP viết tắt của Same-origin policy (chính sách cùng một nguồn). Đúng như tên gọi, nó chỉ cho phép client lấy data từ server nếu như client cùng nguồn với server

Có ba tiêu chỉ để so sánh là: Tên miền (hoặc IP), giao thức, cổng. Request chỉ hợp lệ khi thoả mãn cả 3 tiêu chí. Ví dụ về list các pages vi phạm SOP của site `http://www.example.com`:

* `http://www.example.co.uk` (khác domain)
* `http://example.org` (khác domain)
* `https://example.com` (khác protocol)
* `http://example.com:8080` (khác port)

Vì SOP chỉ chấp nhận "cùng nguồn", nhưng có rất nhiều trường hợp bắt buộc 1 request phải gửi tới 1 server khác nguồn. Giả sử như muốn lấy số ca nhiễm Covid-19 trong API `covid.com` từ trang `baomoi.com` thì lại không được. Từ đó, CORS ra đời do SOP đã chặn quá nhiều :cry:

## CORS là gì?

CORS viết tắt cả Cross-Origin Resource Sharing (Chia sẻ tài nguyên xuyên trang)

Hiểu đơn giản, CORS giúp ta quy định ở phía server, để thông báo là: Tôi cho phép trang A, trang B lấy dữ liệu, còn các trang C, D, E thì không.

### Preflight requests

Nếu như cùng một nguồn, thì thoả mãn SOP và sẽ được chấp nhận ngay. Nhưng nếu gọi request khác nguồn thì lúc này, phía client sẽ gửi trước một "preflight request" để xem, liệu mình có quyền được truy cập dữ liệu hay không.

Khi đó, trình duyệt thực hiện một request `OPTIONS` để xem request có được cho phép hay không, server nhận được và có thể cho phép/từ chối/giới hạn về: 

* Method GET hay là POST thì mới được lấy tài nguyên
* Header phải thoả mãn điều gì để được lấy tài nguyên
* ... (tuỳ vào cách bên server cấu hình)

### Các header chính (thường gặp)

| CORS header                      | Response ở  | Mô tả                                                                                                                                                                                                          |
|----------------------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Access-Control-Allow-Origin      | Cả hai      | Chỉ ra origin, hay nguồn nào được phép gửi request, để * để cho phép mọi nguồn                                                                                                                                       |
| Access-Control-Allow-Headers     | Preflight | Cho phép các header nào được chấp thuận ở request thật, để * để cho phép mọi header                                                                                                                                  |
| Access-Control-Allow-Methods     | Preflight | HTTP method nào được chấp thuận, để * để cho phép mọi method                                                                                                                                                         |
| Access-Control-Allow-Credentials | Cả hai      | Chỉ ra trình duyệt có được chứa thông tin tài khoản trong request không, thông tin có thể là basic authentication, browser cookie, hoặc chứng chỉ TLS phía client. Nếu là `true` thì các header khác không được để * |
| Access-Control-Max-Age           | Preflight | Chỉ ra lượng thời gian (tính bằng giây) để trình duyệt cache phản hồi CORS                   |

## CSRF là gì?

### Tìm hiểu

CSRF viết tắt của Cross-Site Request Forgery (Request giả mạo xuyên trang).Về cơ bản, đây là kiểu tấn công mà trong đó, hacker dụ người dùng gửi yêu cầu thực hiện một hành động nào đó.

Ví dụ: Khi người dùng chuyển khoản 500k tới Alice, khi đó sẽ gọi một request: `https://nganhang.com/transfer?dest=Alice&amout=500k`

Giờ nếu hacker muốn chiếm 1 jack từ người dùng, chỉ cần dụ sao cho người dùng gửi request này: `https://nganhang.com/transfer?dest=Hacker&amount=5000000`. Còn để dụ người dùng, thì đó là kĩ thuật social engineering, chẳng hạn như shorten url, hoặc tạo một trang `hacker.com`, sau đó khi người dùng truy cập vào thì redirect về URL chuyển tiền kia

### Cách phòng chống

1. Có thể bằng cách sử dụng một `csrf-token`. Đây là mã bí mật giữa server và client. Client bắt buộc phải gửi mã này, còn server được thiết kế để nhận và xác minh mã trước khi thực hiện một hành động rủi ro cao (thay đổi pass, chuyển tiền, drop database, v.v...)
1. Dùng `SameSite=Strict` để cấm gửi kèm cookie với bất cứ request nào khác nguồn
1. Dùng thêm xác thực hai bước, chẳng hạn như đổi mật khẩu sẽ yêu cầu nhập lại mật khẩu, đăng xuất phải ấn nút Confirm, v.v...