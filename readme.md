### 객체간의 협력을 이용하여 Angular Form 기능 구현하기

#### 실행 함수

```typescript
const og = new OgForm({
    form: document.frm,
    inputs: [document.querySelector('input.og-control')]
});
```

#### Options

* `form?: HTMLElement` validation을 할 요소들이 들어있는 form 엘리먼트를 의미합니다. 없는 경우 전체 form요소에 대한 validatiaon은 하지 않습니다.
* `inputs: HTMLElement | NodeList | string| Array< HTMLElement | NodeList | string>` 필수옵션입니다.
    * `string`의 경우 내부적으로 `querySelectAll`을 하여 엘리먼트를 찾습니다.
* `checkWhenSubmit?: Boolean`form과 각 요소들에 대한 validation을, 값이 변경될때마다 할지, submit시에만 할 지 선택하는 옵션입니다. `false`일 경우 값이 변경될때마다 체크합니다. default는 `false`.


#### Validation하는 요소들.

* `form`: `form`옵션을 추가했을경우 체크합니다.
* `input[type=text|number|tel|email]`
* `input[checkbox]`: `checkbox`를 validation할 경우, inputs 옵션으로 해당 checkbox들을 포함하는 상위 엘리먼트를 선택해야 합니다.
* `textarea`
* `select`


#### method
* `addInput(inputs)` 점검할 요소를 추가합니다. argument의 타입은 실행 함수의 input 요소의 option과 동일 합니다.
* `removeInput(input: HTMLElement | Array<HTMLElement>)`: 점검할 요소를 삭제합니다.
