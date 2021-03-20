# 리액트는?
1. 페이스북에서 만들고 관리하는 UI기능만 제공하는 라이브러이 입니다. 따라서 전역 상태관리나 라우팅 또는 빌드 시스템등을 각 개발자가 직접 구축해야 하는 친구 입니다.
즉, 자유도가 높다는 장점이 있지만 개발환경을 직접 구축해야하는 다소 번거로운 점이 있습니다.
> 프론트엔드 **라이브러리**나 **프레임워크**를 상요하는 이유는 뭘까요?
1) _가장 큰 이유는 UI를 자동으로 업데이트를 해 준다는 점입니다._

2. 가상돔을 이용하여 UI를 빠르게 업데이트 한다는 장점이 있어요!
> **Virtual Dom?**
가상돔은 이전 UI상태를 메모리에 유지해서 변경된 부분만 실제 돔에 반영해주는 기술입니다.
가상돔 덕분에 불필요한 UI 업데이트가 줄어서 성능을 높여 줍니다.
Critical Rendering Path를 참고 해 보아요 :)

## React Project를 만들어 보아요!
1. react를 한 번 가져와 볼까요! [링크](https://ko.reactjs.org/docs/cdn-links.html)
2. 다음과 같이 코드를 작성해 보시면 react, react-dom만을 사용해서 화면에 표시해 볼 수 있습니다. 자! 왜 UI 라이브러리 인지 느낌이 오시나요? 그런데 뭔가.. 불편하죠? 그렇다면 다음으로 [바벨](https://babeljs.io/)과 함께! 사용해보아요.
```
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
    <script defer crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
    <script defer src="./app.js"></script>
    <title>react development environment</title>
</head>
<body>
    <h1>야!! 나두</h1>
    <div id="root"></div>
</body>
</html>
```

```javascript
//app.js
function ToggleButton(){
    const [toggle, setToggle] = React.useState(false);
    const checkedText = toggle ? "안녕💝" : "잘가🔱";
    return React.createElement(
        'button',
        {
            onClick:()=>{
                setToggle(prev => !prev)
            },
            style:{
                background:'purple',
                color:'white',
                cursor:'pointer'
            }
        },
        checkedText
    )
}

ReactDOM.render(React.createElement(ToggleButton), document.querySelector("#root"));

```

![](https://images.velog.io/images/jgi0105/post/cece04eb-1e9a-4d14-90f6-f9686f02e4ce/image.png)

> 🌟 바벨 babel
![](https://images.velog.io/images/jgi0105/post/5d6ddb5a-904e-4cda-88a1-bd4893cfcb7f/image.png) 모던 자바스크립트를 지원하지 않는 브라우저환경에 최신 문법을 사용할 수 있도록 자바스크립트를 컴파일 해주는 컴파일러!! 🤩
그렇다면? **리액트**에서는 [JSX문법](https://ko.reactjs.org/docs/introducing-jsx.html)을 사용하기 위해 바벨을 사용합니다.

## 𝐁abel과 함께 리액트 사용해보기!
위에서 작성한 app.js 코드를 다음과 같이 수정해 볼게요!
```javascript
function ToggleButton(){
    const [toggle, setToggle] = React.useState(false);
    const checkedText = toggle ? "안녕💝" : "잘가🔱";
    
    return (
        <button onClick={()=> setToggle(!toggle)}>
            {checkedText}
        </button>
    )
}

ReactDOM.render(React.createElement(ToggleButton), document.querySelector("#root"));

```
**오잉🧐?? **
아! JSX문법은 javascript 표준이 아니란다??  그래서 바벨!!😻
![](https://images.velog.io/images/jgi0105/post/41d79238-2242-48b9-becf-10ba9297b732/image.png)
#### 설치해 보아요!
1. 일단 app.js파일을 src/app.js로 옮겨 주세요!
![](https://images.velog.io/images/jgi0105/post/7b221350-ddb7-479b-aadf-5d1745095bbc/image.png)
2. [npm](https://www.npmjs.com/) 을 통해서 다음을 터미널에서 실행시켜 주세요!
```shell
npm i -y
npm i @babel/core @babel/cli @babel/preset-react
#실행
npx babel -w src --out-dir . --presets @babel/preset-react
```
3. 컴파일이 정상적으로 되었어요! 아.. 그런데 이것도 뭔가 귀찮아요! 그렇다면 [Webpack](https://webpack.js.org/)!!
![](https://images.velog.io/images/jgi0105/post/e2bbd809-4a2a-47e8-b6bd-36af3f1e4437/image.png)

> npx?
./node_modules/.bin/ 폴더에 들어있는 바이너리 파일들을 실행 시켜주는 명령어에요!

## Webpack과 함께 리액트 사용해보기!
1. 웹팩을 사용하는 가장 큰 이유!
	- 모듈 시스템(ESM, CommonJs)을 사용하고 싶어서 입니다.
    ```html
    <script type="module" src="app.js"></script>
    ```

2. 설치하기 & 실행해보기
```shell
npm i -D webpack webpack-cli react react-dom
npx webpack
```




> **webpack?**
모듈 번들러라고 하죠! 다양한 확장자 파일들을 하나의 파일로 만들어 주는 역할을 하죠 그것 말고도 다양한 기능을 제공하는데 그것은 어디? [공식문서](https://webpack.js.org/concepts/)를 한 번 참고해 보아요!
1) 자바스크립트 압축
2) 캐싱
3) 환경 변수 주입
4) 사용되지 않는 코드 제거
etc..







