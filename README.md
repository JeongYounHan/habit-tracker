# React

## 개요

1. mvc 패턴 중에서 View 부분을 담당하고 있음

2. 라이브러리이기 때문에 제공하는게 많지 않음(?). 거의 UI부분 제공하고 있다고 봐야함(라우팅, state 관리 등은 전부 따로 있음)

3. 컴포넌트로 이루어진 ui 라이브러리

4. 단방향: **데이터가 변경이 되면 → UI가 업데이트 된다**

5. **re-render(개발 편의)**: 데이터가 변경 될 때마다 어플리케이션 전체를 다시 렌더링 함, 이것이 바로 리액트의 핵심이다 이것이지

6. **virtual dom tree(성능)**: 메모리에 보관

   - 상위 컴포넌트에서 변화가 생겼다고 그 밑 컴포넌트가 전부 다시 재 render 되는 것이 아님, virtual dom tree 와의 비교 후 변경 
- 따라서 render 함수가 많이 호출되어도 실제로 보여지는 데이터가 변동 되지 않으면 돔트리에 영향 주지 않음(이것땜에 각 컴포넌트에 console.log 심어놓으면 데이터 변할때마다 계속 출력돼)
  
   

### 툴 설명

npx : npm과는 다르게 라이브러리가 설치되는 것이 아니라, 실행되는 것



### create-react-app

yarn eject : 포장 패키지 안에 뭐있는지 다 꺼내서 확인 가능, 단 다시 포장 불가



### react-dom

리액트에서 작성된 컴포넌트들을 실제로 브라우저에 렌더링 할 때 사용



## 개념

### 클래스 vs 함수 컴포넌트

1. 클래스 컴포넌트: 리액트에서 제공하는 컴포넌트라는 클래스를 상속해서 만듦, **클래스가 만들어질때 멤버 변수는 딱 한번만 만들어짐, 렌더 함수만 반복 호출**

   - 상태가 많을 때 주로 사용
   - state가 변경되면 render 호출
   - lifecycle methods가 있음
   - this binding 이슈 있음

   ```react
   class LikeButton extends Component {
       state = {
           number: 0,
       }
       render() {
           return <button>
             {this.state.number}
           </button>
       }
   }
   ```

   

2. 함수 컴포넌트: 함수로 만듦, **컴포넌트 변경시 컴포넌트 전체가 반복 호출(state나 함수 선언 등 전부 다시 반복), 그럼에도 state 값들은 계속 유지가 되도록 짜여있음**

   - react hook이 있음, 기존에 클래스 컴포넌트에서 할수 있던것들 가능
   - 그럼 이게 왜 도입됐냐, 클래스는 객체 단위다 보니 어려움, 게다가 함수형 프로그래밍이 유행중이고 하니
   - React.createRef 사용시, 컴포넌트 변경 일어나면 다시 할당되는 문제가 생기므로 useRef 사용(한번만 만들어 메모리에 저장)
   - 내부에서 선언한 콜백함수 등도 마찬가지로 계속 재선언 되기 때문에 memo 사용해도 하위 컴포넌트 재렌더 되는 등의 사이드이팩트 발생 가능 -> 따라서 useCallback 사용

   ```react
   import React from "react";
   import { useEffect } from "react";
   import { useCallback } from "react";
   import { useRef } from "react";
   import { useState } from "react";
   
   const SimpleHabit = (props) => {
     const [count, setCount] = useState(0);
     const spanRef = useRef();
   
     const handleIncrement = useCallback(() => {
       setCount(count + 1);
     }, [count]);
   
     useEffect(() => {
       console.log("mounted or updated");
     }, [count]);
   
     return (
       <li className="habit">
         <span ref={spanRef} className="habit-name">
           Reading
         </span>
         <span className="habit-count">{count}</span>
         <button className="habit-button habit-increase" onClick={handleIncrement}>
           <i className="fas fa-plus-square"></i>
         </button>
       </li>
     );
   };
   
   export default SimpleHabit;
   ```

   

### JSX

: 자바스크립트 코드 위에서 html 로 작성 가능, vue의 template언어와 비슷한 느낌

1. `<React.Fragment>` = `<template>`

2. synthetic event: 리액트 자신만의 이벤트 처리 클래스로 dom 이벤트 한꺼풀 감싸고 있음



### setState

-  **setState는 비동기 API**
- setState 함수가 호출이 되면 이제 리액트는 **현재 컴포넌트가 가지고 있는 상태**와 (this.state), **업데이트 해야 하는 새로운 상태** (setState 함수의 인자로 전달된 새로운 오브젝트) 두가지를 비교해서 **업데이트가 필요한 경우** 해당 컴포넌트의 render 함수를 호출
- state 값을 직접 바꾸지 않고, 기존의 값 받아와서 setState 호출하는 방식 사용이 최선
- state 값 바꾸고 setState 하면? 그래도 좋지 않아
  - 비동기적이므로, 이전 업데이트 내용이 다음 업데이트로 덮어 쓰여질 수 있겠지?
  - 그리고 PureComponent에서 정상적으로 동작하지 않아

```react
<button onClick={() => {
    this.setState(state => ({
        count: state.count + 1,
    }))
}}>
    Click
</button>
```



### Purecomponent & memo

- Purecomponent : 클래스 컴포넌트의 state나 props가 변경되지 않으면 컴포넌트 re-render 하지 않도록 하기 위해 사용, **이때 비교하는 기준은 shallow**

  ```react
  // Purecomponent로 감싸고 새로운 obj 만드는 방식으로
  const habits = this.state.habits.map((item) => {
      if (item.id === habit.id) {
          return { ...habit, count: habit.count + 1 };
      }
      return item;
  });
  ```

  

- memo: 함수 컴포넌트에서 purecomponent 대체 기능

  ```react
  import React, { memo } from "react";
  
  const Habit = memo((props) => {
    const handleIncrement = () => {
      props.onIncrement(props.habit);
    };
    const handleDecrement = () => {
      props.onDecrement(props.habit);
    };
    const handleDelete = () => {
      props.onDelete(props.habit);
    };
    const { name, count } = props.habit;
  
    return (
      <li className="habit">
        <span className="habit-name">{name}</span>
        <span className="habit-count">{count}</span>
        <button className="habit-button" onClick={handleIncrement}>
          <i className="fas fa-plus-square habit-increase"></i>
        </button>
        <button className="habit-button habit-decrease" onClick={handleDecrement}>
          <i className="fas fa-minus-square"></i>
        </button>
        <button className="habit-button habit-delete" onClick={handleDelete}>
          <i className="fas fa-trash"></i>
        </button>
      </li>
    );
  });
  
  export default Habit;
  ```

  

### LifeCycle

https://reactjs.org/docs/state-and-lifecycle.html



### React Hook

1. 함수형

   ```react
   const [count, setCount] = useState(0);
   // count 라는 변수를 0으로 설정, count를 업데이트 할 수 있는 setCount 함수 선언
   ```

2. useEffect : componentDidMount와 componentDidUpdate 결합

   ```react
     useEffect(() => {
       console.log("mounted or updated");
     }, [count]); // count 변수 변화에만 작동, 빈배열이면 mounted 에서만 호출
   ```

   

### Netlify

build파일 만들어주고

netlify deploy 명령어 실행으로 간단하게 만들 수 있음

임시 배포 url: https://621735a61621a87008d5dd2d--hhhjy-habit-tracker.netlify.app

```
Site Created

Admin URL: https://app.netlify.com/sites/hhhjy-habit-tracker  
URL:       https://hhhjy-habit-tracker.netlify.app
Site ID:   7c0bcdc4-915d-415a-a86c-47286851d1c2


Adding local .netlify folder to .gitignore file...
Linked to hhhjy-habit-tracker in C:\Users\hjy\Documents\0.정리
\react-projects\habit-tracker\.netlify\state.json
Please provide a publish directory (e.g. "public" or "dist" or "."):
C:\Users\hjy\Documents\0.정리\react-projects\habit-tracker
? Publish directory C:\Users\hjy\Documents\0.정리\react-projects
\habit-tracker\build
Deploy path: C:\Users\hjy\Documents\0.정리\react-projects\habit-tracker\build
Deploying to draft URL...
✔ Finished hashing 8 files
✔ CDN requesting 6 files
✔ Finished uploading 6 assets
✔ Deploy is live!

Logs:              https://app.netlify.com/sites/hhhjy-habit-tracker/deploys/621735a61621a87008d5dd2d
Website Draft URL: https://621735a61621a87008d5dd2d--hhhjy-habit-tracker.netlify.app

If everything looks good on your draft URL, deploy it to your 
main site URL with the --prod flag.
netlify deploy --prod
```

