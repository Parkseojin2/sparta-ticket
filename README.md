## 앱 구동시 필요한 정보

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
DB_SYNC=
JWT_SECRET_KEY=

## 요청 방식

# user

// register

{
"email":"bym401548@gmail.com",
"password":"1234",
"imageUrl":"imageUrl/123"

}

//login

{
"email":"bym401548@gmail.com",
"password":"1234"
}

# show

// 공연 등록(admin)
{
"name": "",
"description": "",
"category": "",
"location": "",
"price": 20000,
"imageUrl": "http://example.com/image.jpg",
"times": [
"2023-07-06T20:00:00Z",
"2023-07-07T20:00:00Z"
],
"seatsInfo": 100
}

// 카테고리
localhost:3000/shows/category/로맨스

// 이름
localhost:3000/shows/name/렌트2

// 상세보기
localhost:3000/shows/2

## ticket

// 예매

{
"showId":144
}
