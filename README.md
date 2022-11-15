# Elice_Final_Project
Node.js에서 Express.js와 EJS 뷰 엔진 등을 이용한 CRUD 게시판 사이트

MongoDB 접속을 위하여
Root 경로에 .env File 생성 후
MONGO_URI={주소} 작성 필요

- 회원 전용 비밀 게시판 제작

- 기존 CRUD만 구현된 페이지를 BootStrap을 활용하여 HTML/CSS 디자인을 개선하고 Express-Session 라이브러리를 이용하여 회원가입 및 로그인 기능을 추가 함.
- 본인이 작성한 게시글만 수정, 삭제가 가능하도록 추가함.
- PUG로 구현된 템플릿을 EJS로 변환하여 대표적인 두 뷰 엔진의 장, 단점을 체험해보고자 하였음.
- bcrypt 라이브러리를 활용하여 비밀번호를 단방향 해쉬로 저장하였음.

- OAuth를 이용한 간편로그인 기능, 댓글 기능, 영상 첨부 및 재생 기능을 추가하면 커뮤니티 사이트를 간편하게 만들 수 있을 것으로 기대 됨.

![스크린샷 2022-11-15 03 09 32](https://user-images.githubusercontent.com/82963112/201737775-d8522069-bf35-4b58-842f-2a3440325ffc.png)
![스크린샷 2022-11-15 03 09 52](https://user-images.githubusercontent.com/82963112/201737783-31a00a8c-1485-4c25-b5c5-ab7843b8b409.png)
![스크린샷 2022-11-15 03 10 42](https://user-images.githubusercontent.com/82963112/201737788-a85cab1c-2521-483b-8570-ed296c610718.png)
![스크린샷 2022-11-15 03 10 53](https://user-images.githubusercontent.com/82963112/201737800-94569ef6-e49f-4619-b8cf-d9823a42fce5.png)
