# raspi_api

## description
DB에서 값을 읽고 반환하는 간단한 서버입니다.
express 서버 컨테이너 2개와 nginx 컨테이너 1개로 이루어져있습니다. docker-compose로 실행합니다.

## 구성도
라즈베리파이 4B를 기준으로 구성도는 다음과 같습니다. 
![](/images/최종구성도.png)

## 의존성 모듈
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "dotenv": "^10.0.0",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "morgan": "~1.9.1",
    "mysql2": "^2.3.0",
    "nodemon": "^2.0.13"
    
## 실행환경
- ubuntu 20.04 LTS 기준
- docker, docker-compose가 깔려있어야합니다.
- DB는 mariadb를 기준으로 생성했습니다. 아마 mysql도 잘 작동할겁니다.

## 실행방법

실행에 앞서 데이터베이스 연결에 사용할 `.env`파일을 아래와 같이 작성해줘야합니다.
```
HOST='[호스트]'
USER='[유저이름]'
PASSWORD='[비밀번호]'
DATABASE='[데이터베이스 이름]'
DB_PORT=[사용하는 포트]
LIMIT=[생성할 최대 연결 갯수]
```

그 다음 `start.sh`를 실행하면 됩니다.

3000번 포트를 사용하도록 만들어져있습니다. 이는 `docker-compose.yaml`을 수정해 바꿔줄 수 있습니다.

table 이름은 [raspi_monitor 프로젝트](https://github.com/dev2820/raspi_monitor)의 table을 기준으로 만들어져있습니다. 다른 테이블명을 사용하려면 그에 맞게 routes 폴더의 파일을 새로 만들고 `app.js`를 수정해줘야합니다.

## API
GET /[라우터]?limit=[컬럼 수]&fields=[필드명,...]

ex) GET /summary?limit=5&fields=date,cpu_thermal
summary_status 테이블에서 최근 5개 column의 date,cpu_thermal 필드값을 읽어옵니다.

결과 예시
```js
[
    {
        "date": "2021-10-16T17:24:30.000Z",
        "cpu_thermal": 36.024
    },
    {
        "date": "2021-10-16T17:24:27.000Z",
        "cpu_thermal": 36.511
    },
    {
        "date": "2021-10-16T17:24:24.000Z",
        "cpu_thermal": 36.998
    },
    {
        "date": "2021-10-16T17:24:21.000Z",
        "cpu_thermal": 35.537
    },
    {
        "date": "2021-10-16T17:24:18.000Z",
        "cpu_thermal": 36.024
    }
]
```
ex) GET /summary?limit=10&fields=*
모든 필드의 값을 가져올 땐 `*`을 입력하면 됩니다.
