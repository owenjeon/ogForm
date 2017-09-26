import 'classlist';

window.Selector = class {
	constructor(eleStr){
		this._eles = document.querySelectorAll(eleStr);
		this._list = new Set();
		this.setValidator();
	}
	setValidator(){
		this._eles.forEach(el => {
			if(!el.ogInput){ //validator 가 등록된 input
				el.ogInput = true;
				const i = this.getInputType(el);
				i && this._list.add(i);
			}
		});
	}

	getInputType(el){
		if(el.tagName === 'textarea' || /(text|email|number|tel)/.test(el.type)) return (new textValidator(el));
		const childInput = el.querySelector('input');
		if(childInput && (childInput.type === "checkbox")) return (new checkValidator(el));
	}
};

class Validator{
	toggleClass(flag, trueCls, falseCls){
		[flag, !flag].forEach((b, i) => {
			this._el.classList[b ? 'add' : 'remove'](i ? falseCls : trueCls);
		})
	}

	constructor(el){
		this._el = el;
		this._state = {isTouched : false, isPristine : true, isValid : false};
		this.stateReady = false;
	}
	get state(){
		return this._state;
	}

	setState(obj){
		this.stateReady = true;
		for (let v in obj){
			this._state[v] = obj[v];
		}
		setTimeout(()=>{
			if(this.stateReady){
				this.render();
				this.stateReady = false;
			}
		},0);
	}

	render(){
		this.toggleClass(this._state.isValid, 'og-valid', 'og-invalid');
		this._render();
	}
	_render(){
		throw 'must be override';
	}
}

class textValidator extends Validator{

	constructor(el){
		super(el);
		this._pattern = this._el.getAttribute('pattern') ? new RegExp(this._el.getAttribute('pattern')) : null;
		this.onChecking();
	}

	validateMaxLen(val){
		if(this._el.maxLength === -1) return true;
		return this._el.maxLength >= val.length;
	}

	validateMinLen(val){
		if(this._el.minLength === -1) return true;
		return this._el.minLength <= val.length;
	}

	validatePattern(val){
		if(this._pattern === null) return true;
		return this._pattern.test(val);
	}

	validateRequire(val){
		if(!this._el.required) return true;
		return val !== "";
	}
	_render(){
		this.toggleClass(this.state.isTouched, 'og-touched', 'og-untouched');
		this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
	}
	onChecking(){
		const checkValidate = val => {
			const valid = this.validateMaxLen(val) && this.validateMinLen(val) && this.validatePattern(val) && this.validateRequire(val);
			valid !== this.state.isValid && this.setState({isValid: valid});
		};
		this._el.addEventListener('input', e => {
			this.state.isPristine && this.setState({isPristine: false});
			const val = e.target.value;
			checkValidate(val);
		});

		this._el.addEventListener('focus', e => {
			this.setState({isTouched: true});
		});
		this._el.addEventListener('blur', e => {
			this.setState({isTouched: false});
		});
	}
}

class checkValidator extends Validator{
	constructor(el){
		super(el);
		this._inputs = el.querySelectorAll('input');
		this.onChecking();
	}

	validateMaxCheck(cnt){
		const max = this._el.getAttribute('maxCheck');
		if(max === null) return true;
		return max >= cnt;
	}

	validateMinCheck(cnt){
		const min = this._el.getAttribute('minCheck');
		if(min === null) return true;
		return min <= cnt;
	}

	onChecking(){
		this._inputs.forEach(ipt => {
			ipt.addEventListener('click', () => {
				this.state.isPristine && this.setState({isPristine: false});
				const cnt = [...this._inputs].filter(v=>v.checked).length;
				const valid = this.validateMaxCheck(cnt) && this.validateMinCheck(cnt);
				valid !== this.state.isValid && this.setState({isValid: valid})
			});
		});
	}
	_render(){
		this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
	}
}