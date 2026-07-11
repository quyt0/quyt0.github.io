+++
date = '2026-07-11T06:00:46+07:00'
draft = false
title = '[ReactJS] Cú pháp JavaScript ES6+'
series = ['MERN Stack Ký Sự']
categories = ['Web Development']
tag = ['web', 'react', 'js', 'reactjs', 'es6+', 'javascript', 'mern']
series_order = 3
image = 'cover.png'
+++

ES6+ (tức ECMAScript 6 trở lên) là thuật ngữ chỉ các phiên bản JavaScript hiện đại, bắt đầu từ phiên bản ES6 (hay còn gọi là ECMAScript 2015) đến tất cả các bản cập nhật mới nhất hàng năm (ECMAScript 2016/2017/2018) - giờ có 2025 luôn rồi :v

Từ sau phiên bản ES5 (ra mắt 2009) cho tới năm 2015, chúng ta có một bản cập nhật lớn vào năm 2015 mang tên ES6, mang đến hàng loạt cải tiến giúp thay đổi hoàn toàn cách chúng ta viết code JavaScript

**Tại sao lại phải học ES6+**

- Cú pháp ngắn gọn, sạch sẽ hơn
- Tối ưu hiệu năng tốt hơn, dễ bảo trì
- Các thư viện và framework như ReactJS hay Next.js đều được xây dựng hoàn toàn dựa trên cú pháp ES6+

Bởi lẽ React là một thư viện JavaScript, nên mọi dòng code của nó đều là JavaScript. Nhưng cú pháp của ES6+ khá là khó để đoán nếu chưa được học qua. Thêm nữa là các tài liệu chính thức, code tham khảo của React đều không giới thiệu phần ES6+ này mà mặc định ta đã biết rồi

Vì thế chúng ta cần hiểu chắc kiến thức của ES6+ nếu không thì khỏi code ReactJS 🥲

## Từ khoá `let` và `const`

Theo mình tìm hiểu, trước khi có `let` và `const`, JavaScript thuần tuý dùng từ khoá `var` để khai báo biến cho tất cả các kiểu dữ liệu

Biến khai báo bằng `var` có tính chất **hoisting**, có **global scope** trừ khi khai báo trong 1 hàm (function scope). Nhưng `var` có một vài vấn đề

- Không có scope block: Có nguy cơ ghi đè hoặc truy cập ngoài ý muốn biến từ phần code bên ngoài hàm

- Cơ chế hoisting tức là ta có thể gọi / sử dụng biến trước cả khi dòng code khai báo được thực thi --> khó debug trong một vài trường hợp

- Có thể khai báo lại, tức là tiềm ẩn nguy cơ khai báo trùng một tên biến đã khai báo trước đó --> phá hỏng logic, khó debug

Vì thế `let` và `const` đã được ra đời. Cả hai đều có tính chất **block scope**, tức là chỉ tồn tại trong khối `{}` nơi mà biến được khai báo. `let` thì cho phép gán lại biến sau khi khai báo nhưng `const` thì không.

```js
const num = 42;
num = 99; // TypeError: gán lại const

const arr = [1, 2, 3];
arr = [4, 5, 6]; // TypeError: gán lại const
arr.push(4);     // OK, arr giờ là [1, 2, 3, 4]
```

*(Nguồn: [HoleTex](https://holetex.com/blog/javascript-es6))*

Mặc định kể từ ES6 ta sẽ dùng `const`, chỉ dùng `let` khi muốn gán lại giá trị cho biến (hoặc gặp lỗi TypeError) và không dùng `var` nữa.

## Arrow function

ReactJS là component-based, mỗi component thường là một function component nên ta gặp rất nhiều cú pháp khai báo hàm theo kiểu "arrow function". Cụ thể là như này

### Expression function truyền thống

```js
const sum = function(a, b) {
    return a + b;
};
```

### Chuyển sang arrow function

Để biến nó thành **arrow function**, ta sẽ bỏ từ khoá `function` đi, thêm dấu `=>` (arrow) vào trước dấu `{` và thành

```js
const sum = (a, b) => {
    return a + b;
};
```

Những gì viết trực tiếp sau dấu `=>` đều được hiểu là `return` cái đó, trừ trường hợp cặp dấu `{}` thì được hiểu là function body. Do là `return a + b;` chỉ có duy nhất một dòng nên ta có thể viết trực tiếp là

```js
const sum = (a, b) => a + b;
```

> Vậy nếu muốn return một `object` `{a: a, b: b}` thì ta cần gói object này vào trong cặp dấu `()`
>
> ```js
> const sum = (a, b) => ({a: a, b: b});
> ```

### Đối với hàm có một tham số

Ta có thể bỏ luôn dấu `()` chứa tham số, ví dụ

```js
const square = (x) => x * x;
```

thành

```js
const square = x => x * x; // bỏ dấu () tham số
```

### Không có context, không làm function constructor

Từ khóa `this` đề cập đến context (ngữ cảnh) thực thi hiện tại, tức là đối tượng (object) mà hàm đang thuộc về hoặc đang tương tác. Và arrow function thì không có context nên không có `this`, xem ví dụ này

```js
const post = {
    name: '[ReactJS] Cú pháp JavaScript ES6+',
    getName: () => this.name
};

console.log(post.getName()); // undefined do không có context (this)
```

Và cũng không thể sử dụng arrow function làm function constructor, ví dụ

```js
const Post = (name) => {
    this.name = name;
}

es6Post = new Post('[ReactJS] Cú pháp ES6+ trong JavaScript');
console.log(es6Post);

// --> TypeError: Post is not a constructor
```

... còn tiếp

## Tham khảo

- https://holetex.com/blog/javascript-es6