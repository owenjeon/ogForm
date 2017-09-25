import 'classlist';

window.Selector = class {
	constructor(eleStr){
		this._eles = document.querySelectorAll(eleStr);
		this._list = [];
		this.setValidator();
	}
	setValidator(){
		this._eles.forEach(el => {
			if(!el.ogInput){ //validator 가 등록된 input
				el.ogInput = true;
				this._list.push(new textValidator(el));
			}
		});
	}
};

class Validator{
	toggleClass(cls, flag){
		this._el.classList[flag ? 'add' : 'remove'](cls);
		return this;
	}

	constructor(el){
		this._el = el;
		this._pattern = this._el.getAttribute('pattern') ? new RegExp(this._el.getAttribute('pattern')) : null;
		this._state = {
			isTouched : false,
			isPristine : true,
			isValid : false
		};
		this.stateReady = false;
	}

	setState(obj){
		this.stateReady = true;
		for (let v in obj){
			this._state[v] = obj[v];
		}
		this.render();
		setTimeout(()=>{
			if(this.stateReady){
				this.render();
				this.stateReady = false;
			}
		},0);
	}

	render(){
		this.toggleClass('og-touched', this._state.isTouched)
			.toggleClass('og-untouched', !this._state.isTouched)
			.toggleClass('og-dirty', !this._state.isPristine)
			.toggleClass('og-pristine', this._state.isPristine)
			.toggleClass('og-valid', this._state.isValid)
			.toggleClass('og-invalid', !this._state.isValid)
	}
}

class textValidator extends Validator{

	constructor(el){
		super(el);
		this.onChecking();
	}

	validateMaxLen(val){
		if(this._el.maxLength === undefined) return true;
		return this._el.maxLength >= val.length;
	}

	validateMinLen(val){
		if(this._el.minLength === undefined) return true;
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
	onChecking(){
		const checkValidate = val => {
			const p = this.validateMaxLen(val) && this.validateMinLen(val) && this.validatePattern(val) && this.validateRequire(val);
			p !== this._state.isValid && this.setState({isValid: p});
		};
		this._el.addEventListener('input', e => {
			this._state.isPristine && this.setState({isPristine: false});
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