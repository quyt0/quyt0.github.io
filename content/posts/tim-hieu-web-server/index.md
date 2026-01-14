+++
date = '2026-01-13T17:53:55+07:00'
draft = false
title = 'Tìm hiểu về Web Server: Vai trò, cách thức, phân loại'
categories = ['Web Development']
image = 'cover.jpg'
tags = ['web', 'server']
+++

## Web Server là gì

Server (máy chủ) có thể được hiểu theo cả hai nghĩa là phần cứng (hardware) và phần mềm (software). Nếu hiểu theo nghĩa nào thì server là thuật ngữ để chỉ một software hoặc một hardware mà xử lí các yêu cầu (request) từ các phần mềm hoặc các thiết bị khác (client).

Hoặc cũng có thể hiểu server là một software hoặc hardware cung cấp các dịch vụ mà client cần. Server nói chung thường được thiết kế để chạy liên tục, có nguồn điện dự phòng, được cấp IP tĩnh. Mặc dù ta có thể sử dụng các máy tính cá nhân để làm server nhưng không nên. Thay vào đó ta sử dụng server để đảm bảo hơn cho dữ liệu.

**Web Server** cũng tương tự như Server, cũng được hiểu theo nghĩa là hardware và software.

- Đối với hardware: Web Server lúc này là một máy tính, máy tính này chạy các web server software và lưu trữ các file nội dung của một website (chẳng hạn như các file HTML, CSS, JavaScript hoặc các file ảnh, ...).
- Đối với software: Web Server lúc này là một phần mềm, phần mềm này được thiết kế để xử lí các task như: tiếp nhận request, response lại cho client, hoặc phân quyền đối với các file, chặn IP, v.v... Ngoài ra, Web Server lúc này tối thiểu cần phải có chức năng của HTTP để có thể đọc hiểu được URLs từ client và hiểu protocol HTTP để trả về đúng cho trình duyệt web (browsers) hiểu và hiện thị ra cho người dùng.

Nhìn chung, Web Server là một server cho các website, được hiểu theo hai nghĩa là hardware và software, được dùng để xử lí các request từ phía client hoặc cung cấp các dịch vụ mà client cần ở một website. Về phía hardware, Web Server sẽ đảm nhận lưu trữ các file cần thiết cũng như chạy server software, còn về phía software, Web Server sẽ xử lí các task thường thấy trong website.

## Vai trò, cách thức hoạt động của Web Server

### Vai trò

Khi hai máy tính muốn giao tiếp được với nhau, ta có thể kết nối với nhau chung một mạng, đây là kiểu kết nối P2P. Khi nhiều máy tính muốn giao tiếp với nhau, ta cũng có thể kết nối chúng vào chung một mạng thông qua switch.

Vấn đề là khi số lượng máy tính tăng càng nhiều thì không thể sử dụng phương pháp này nữa, bởi số switch sẽ cần phải tăng dần lên theo số lượng máy tính. Thêm nữa, các tài nguyên chia sẻ thông qua phương pháp này rất rời rạc, không có máy tính nào trong mạng đảm nhận một công việc cụ thể.

Vì thế nên Server được ra đời, nó sẽ là một máy tính chỉ để lưu trữ, xử lí, phân quyền, ... Web Server cũng tương tự, nó là một server có vai trò lưu trữ (hosting), xử lí (processing requests), phân quyền (authorization), v.v...

#### Lưu trữ tệp (Hosting files)

Một website cần nhiều tệp (file) để có thể hiển thị nội dung cho user. Một vài file có thể kể đến

- HTML, CSS, JavaScript
- Các file font chữ cho thiết kế (.ttf, .otf, ...)
- Các file ảnh, video của website/user
- Các file cấu hình (apache.conf, nginx.conf, web.config, ...) đảm bảo cho website hoạt động đúng cách

#### Giao tiếp thông qua HTTP (Communicating through HTTP)

Khi client gửi yêu cầu đến Server, khi này Server cần có nhiệm vụ nhận và gửi trả lại cho client.

Trên Web Server, HTTP đảm nhận việc xử lí và phản hồi lại thông tin cho client. Bất kì một request nào cũng phải được Web Server trả lời lại ít nhất với mã trạng thái (status code), và kèm theo Content nếu như server trả về kèm theo.

#### Đo lường hiệu suất

Web Server còn có thể đo lường được hiệu suất, một vài thông số kể đến như

- RPS (Requests per second): Số request mỗi giây
- Latency (Độ trễ): Thời gian Web Server xử lí request (miligiây). Độ trễ càng thấp càng tốt.
- Throughtput (Thông lượng): Lượng dữ liệu truyền trong một khoảng thời gian (bytes/giây). Throughtput càng cao thì càng tốt
- Concurrency (Tính đồng thời)

Các Web Server thường dựa vào phân tích log, ngoài ra một vài Web Server còn có các module riêng để đo hiệu suất. Bên cạnh đó Web Server còn có thể tối ưu thông qua cache hoặc logging để dễ theo dõi về sau này.

### Cách thức hoạt động

Khi browser (client) tải một trang web, trước hết nó sẽ lấy IP của tên miền thông qua cache hoặc thông qua DNS Server. Tiếp sau đó, client sẽ gửi requests cho Web Server, thường sẽ bao gồm

- Đường dẫn (path) như `/login, /producsts, /files/image.png, ...`
- Query string như `?tab=article, ?id=3`
- HTTP Method
- Host header, các header khác
- ...

Web Server khi nhận được yêu cầu sẽ: xử lí yêu cầu ấy, phân quyền, tổng hợp các thông tin mà phía client yêu cầu. Sau đó response lại, nếu trong trường hợp những thông tin mà client yêu cầu không có thì Web Server sẽ trả về lỗi 404. Ngoài ra còn một vài mã lỗi khác từ 400 - 499 (Client error responses) có thể kể đến như

- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- ...

## Các loại Web Server thường gặp

Có thể kể đến một vài Web Server thường gặp như

- Apache: Phổ biến nhất, hỗ trợ nhiều platform (Linux/Windows/MacOS). Nhưng nhược điểm là sử dụng multi-processing (tức là mỗi request phải tạo thêm 1 process để xử lí) nên tốn RAM
- Nginx: Dựa trên event-driven nên sẽ tối ưu hơn về hiệu năng. Nginx vẫn hỗ trợ đa nền tảng như Apache nhưng do cấu hình khó hơn nên chưa phổ biến bằng Apache. Thường dùng để làm reverse proxy
- Microsoft Internet Information Services (Microsoft IIS): Do Microsoft phát triển, hiện tại chỉ hỗ trợ Windows. Ưu điểm là thích hợp cho các website dựa trên .NET (như [ASP.NET](http://asp.net/)) do được tối ưu hơn.
- LiteSpeed: Cũng dựa trên event-driven giống với Nginx, nhưng hiệu năng chưa tối ưu bằng Nginx nên không thực sự phổ biến.

Apache và LiteSpeed có hỗ trợ `.htaccess`. Tuy nhiên, `.htaccess` sẽ chậm hơn đáng kể so với Nginx. Còn ở phía Nginx tuy cấu hình phức tạp hơn so với Apache và LiteSpeed nhưng bù lại hiệu suất rất tốt.

Còn Microsoft IIS sử dụng kiến trúc cấu hình XML trên file `web.config`, dùng chủ yếu cho Windows và các website dựa trên .NET

## Web Application là gì?

Ban đầu, khi Internet vẫn còn sơ khai, các trang web hầu hết là chứa nội dung tĩnh, một trang web đơn lẻ được gọi là Web Page, tập hợp nhiều Web Page sẽ gọi là Website.

Về sau này, website ngày càng phổ biến hơn nhiều. Các thông tin trên website cũng vì thế mà đa dạng hơn, dần dần các thông tin ấy cần phải trở nên "động" thay vì "tĩnh" như trước đây. Chẳng hạn như trước đây, số ca nhiễm dịch SARS năm 2003 cần phải được cập nhật thông qua nhiều bài viết, mỗi bài viết chứa dữ liệu tĩnh là số ca nhiễm. Giờ đây, thông tin được trở nên "động", chẳng hạn như số ca nhiễm dịch Covid-19 có thể được cập nhật theo giờ, thậm chí theo thời gian thực ở một trang web nào đó.

Bản thân web không thể tự làm được điều đó, cần phải có một ứng dụng hỗ trợ. Đó là **Web Application**, là một phần mềm chạy trực tiếp trên server. Web Application được dùng để thực hiện một công việc, một chức năng của ứng dụng. Người dùng có thể truy cập trực tiếp thông qua Internet, khác với các ứng dụng truyền thống, Web Application không cần tài xuống hay cài đặt trên máy. Vì thế mà khiến cho trang web có tính tương tác cao, nhiều chức năng hơn

## Vai trò, cách thức hoạt động của Web Application

### Vai trò

Như đã trình bày ở trên, Web Application được dùng để thực hiện một chức năng, một công việc nào đó. Cụ thể hơn có thể kể đến một vài vai trò

- Lưu trữ, xử lí logic nghiệp vụ: Logic nghiệp vụ là các quy tắc, quy trình và phép tính về cách dữ liệu được xử lý và các quyết định được đưa ra. Chẳng hạn như khi làm việc với hệ thống thuế, sẽ có rất nhiều quy tắc được đưa ra để xem user X có được miễn thuế hay không. Khi ta viết code để áp dụng những quy tắc này thì đó chính là *logic nghiệp vụ*
- Kết nối, quản lý dữ liệu trên database
- Cung cấp API cho website và ứng dụng khác

### Cách thức hoạt động

Nhìn chung, một request được gửi từ phía client tới server, request đó được Web Server nhận, sau đó Web Server sẽ forward sang cho Web Application để xử lí. Web Application sau khi xử lí xong sẽ trả về cho Web Server, Web Server lại trả về cho client.

Cụ thể hơn

1. Web Application sau khi nhận được request từ Web Server thì sẽ cần phải parse request đó ra và lấy data để xử lí. Do HTTP request chỉ là text thuần nên buộc Web Application phải parse thì mới có data để xử lí. Data sau khi parse có thể là các object với attribute hoặc method
2. Web Application lựa chọn hàm để xử lí bằng cách tra cứu trong bảng Route
3. Data được xử lí thông qua logic nghiệp vụ, trả về kết quả. Logic nghiệp vụ ở đây bao gồm cả việc xác thực dữ liệu (verify), xử lí (processing) hay tương tác với database
4. Web Application đóng gói kết quả (dưới dạng JSON, XML, ...) kèm theo metadata (Status, Header) và trả lại cho Web Server. Web Server trả lại kết quả cho client

## Các loại Web Application thường gặp

### Phân loại theo chức năng

Các Web Application thường có nhiều loại, mỗi loại có nhiều chức năng khác nhau. Có thể kể đến một vài loại như

- E-commerce: Web Application được tinh chỉnh, tối ưu để tập trung vào thương mại điện tử
- Portal: Cổng thông tin: Tổng hợp và cung cấp thông tin đa dạng từ nhiều nguồn cho người dùng, thường có đăng nhập, cá nhân hóa nội dung
- CMS (Content Management System): Cho phép tạo, quản lý và xuất bản nội dung dễ dàng, thường không cần lập trình nhiều, ví dụ WordPress, Joomla, Drupal

### Phân loại theo kiến trúc

- **Short-Lived Process (Quy trình ngắn hạn):**
  - Cơ chế: Có request đến -> Khởi tạo chương trình -> Chạy code -> Trả về -> Hủy luôn chương trình.
  - Thường dùng
    - CGI (Common Gateway Interface)
    - PHP (mô hình PHP-FPM cũ)
    - Serverless (AWS Lambda, Google Cloud Functions)
  - Ưu điểm: Các request được tách biệt nhau, khi một request bị lỗi crash memory thì chỉ chết process đó, không ảnh hưởng tới cái khác.
- **Long-Running Process (Quy trình dài hạn):**
  - Cơ chế: Khởi động chương trình 1 lần -> Nó cứ chạy mãi (lắng nghe ở 1 cổng) -> Có request đến thì nó xử lý -> Xử lý xong nó vẫn sống để chờ request tiếp theo.
  - Thường dùng **Java (Spring Boot), Node.js, Python (Django/FastAPI), Go**.
  - Ưu điểm: Tốc độ nhanh vì không mất công khởi động lại database connection hay nạp lại thư viện mỗi lần xử lí.
  - Nhược điểm: Khó quản lý bộ nhớ, khi process sập thì sẽ dẫn tới sập cả Web Application

## Mối quan hệ Web Server - Web Application, cách thức giao tiếp giữa các bên

### Mối quan hệ Web Server - Web Application

Web Server và Web Application đều cần thiết để một website có thể vận hành được. Web Server và Web Application có hai mục đích khác nhau

- Web Server: Tiếp nhận request từ client, xử lí các nội dung "tĩnh" (static). Bản thân Web Server không thể xử lí, tính toán các nội dung "động" nên phải forward các request ấy cho bên Web Application. Ngoài ra, khi Web Application trả về kết quả thì Web Server lúc này có nhiệm vụ trả về kết quả ấy cho client.
- Ngoài ra Web Server còn giải mã HTTPS, chặn các gói tin spam, điều phối cân bằng tải để cho Web Application làm nhiệm vụ của nó là tính toán và xử lí dữ liệu.
- Web Application: Tính toán, xử lí dựa trên logic nghiệp vụ để trả về kết quả.

### Cách thức giao tiếp giữa các bên

Các Web Server như Apache, Nginx, ... thường được viết bằng C/C++ và chỉ tập trung vào giao tiếp bằng giao thức HTTP (text thô). Nếu Web Application viết bằng Python sẽ chỉ hiểu các object của Python (dictionary, list, ...). Khi này để Web Server và Web Application nói chuyện với nhau sẽ cần phải viết code riêng, nếu đổi Web Server qua Apache lại phải code tiếp

Vì thế mà CGI đã ra đời, CGI viết tắt của Common Gateway Interface. Hiệu năng của CGI rất chậm nên vì thế FastCGI ra đời với mục đích thay thế. Ngoài ra, đối với Python còn có thể sử dụng WSGI, Java còn có thể sử dụng Servlet.