# 프로젝트 기획서

## 프로젝트 일정

> 총 기간 10월 24일 ~ 10월 31일

#### 10월 24일 ~ 10월 25일: 프로젝트 기획서 작성

#### 10월 25일 ~ 10월 29일: 1차 개발 및 리팩토링

-   [x] 10월 25일: 메인페이지와 Todo, Todos 마크업, alarm 기능(컴포넌트)
-   [x] 10월 26일: `Todo`의 생성, 수정, 삭제 개발
-   [ ] 10월 27일: `TodosList`의 생성, 수정, 삭제 개발
-   [ ] 10월 28일: `TodosList`의 검사 (삭제 가능여부, 수정 가능여부) 개발
-   [ ] 10월 29일: 리팩토링

#### 10월 30일 ~ 10월 31일: 코드 설명서? 앱 설명서 작성

-   10월 30일: 코드 매뉴얼 및 주석정리
-   10월 31일: 앱 사용 설명서 작성

## 기술 스택

| React.js                          | Vite                            | M.U.I                           |
| --------------------------------- | ------------------------------- | ------------------------------- |
| ![React](./assets/react-logo.svg) | ![Vite](./assets/vite-logo.svg) | ![M.U.I](./assets/mui-logo.svg) |

<!-- | 적응형 웹 디자인 Adapative Web Design                                          |
| ------------------------------------------------- |
| ![적응형 웹 디자인](./assets/adaptive-mobile.svg) | -->

## 개요

### 아이디어

-   쏠북 (북아이피스) 사무보조 아르바이트 시간중 시간 단위로 할 업무를 나누어 작성할 수 있는 어플리케이션
-   단순한 업무인 만큼 하루 가능한 업무량을 예측하여, 미리 시간 단위로 나누어 하루를 계획적으로 이용할 수 있다.
-   어제 하루동안 행한 업무를 간략하게 저장된 Todo를 확인하여, 필요시 확인 가능하다.

### 목표

-   하루 업무들을 정리한 Todo들을 저장하여, 기록을 볼 수도 있고, 하루를 효율적으로 나눌 수 있게 만들기
-   `Todo` `하루의 업무량을 나눈 하나의 단위`로 시간 당 업무량 이기도 하다.
-   `TodosList`
    1. 저장 버튼을 눌러 그날의 투두를 저장할 수 있다.
    1. 한 번 저장된 투두는 수정불가하고, 기록을 남겨둔다.

## 요구사항

### `Todo`

```js
todo = {
    time: number, // Todo 시작 시간
    todo: '100자 이하의 11pt 을지로체인 문자열', // Todo의 내용
    checked: boolean, // Todo의 완료 여부
};
```

1. [x] `Todo`를 체크박스로 완료여부
2. [x] 체크 후 수정 불가
3. [x] 최대 100자까지 입력 가능

### `TodosList`

```js
todosList = [... ,{
    id: The day, // Todo 작성 당일
    todos: [todo, todo, ...todos], // todo의 배열
}];
```

-   `TodosList`를 localStorage에 저장, 삭제하여 기록을 관리할 수 있다.
    1.  [x] `TodosList`를 JSON객체로 localStorage에 저장한다.
    1.  [x] `TodosList`를 10분마다 자동저장
        > `useEffect`,`setInterval`
    1.  [x] 저장된 `TodosList`는 당일에는 수정이 가능 `saveTodos`
        > 컴퓨터를 사용하는 당일 시스템 날짜로 저장
    1.  [x] 저장된 `TodosList`는 해당 날짜와 다르다면 수정이 불가 `isTodayTodos`
        > 임의로 날짜로 불러와 수정하거나 생성할 수 없음
    1.  [x] 오래된 `TodosList`는 삭제 가능 `deleteOldTodos`
    1.  [x] **30일이 지난 기록**부터 삭제가 가능 `isOldEnoughTodos`

### `Alaram`

-   알람을 통해 삭제불가하거나, 실행결과를 확인할 수 있다.
    1.  [x] `Todos`를 당일에 저장할시 '오늘의 Todos를 저장하였습니다. 내일부터는 수정불가합니다.' 라는 알람 `saveTodos | todoSaved`
    2.  [x] 오래된 `Todos`를 삭제시 삭제 완료 알람을 띄웁니다. `saveTodos | deleteTodos`
    3.  [x] 오늘이 지난지 얼마 안된 `Todos`를 삭제시 삭제 불가 경고 알람을 띄웁니다. `saveTodos | cantDeleteTodos`

### 다크모드

1. [x] 다크모드 버튼 클릭 시 라이트 / 다크 모드가 전환
    > Material UI ( M.U.I ) [Darkmode-toggling color mode](https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode)
2. [x] 시스템 테마에 의해 초기 결정
    > [Darkmode-system preference](https://mui.com/material-ui/customization/dark-mode/#system-preference)

## 참여 인원

| Piso :blush:                                                                        |
| ----------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/Pisodev77" width="72" height="72"/> |
