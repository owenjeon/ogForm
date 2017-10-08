'use strict';

const dataSet = (() => {
	const div = document.createElement('DIV');
	const camelToDash = ( myStr ) => myStr.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
	return ('dataset' in div) ?
		(el, k, v) => (v === undefined ? el.dataset[k] : (el.dataset[k] = v)) :
		(el, k, v) => (v === undefined ? el.getAttribute('data-'+camelToDash(k)) : el.setAttribute('data-'+camelToDash(k), v));
})();

const cloneObj = (obj) => {
	const o = {};
	for (let k in obj) if(obj.hasOwnProperty(k)) o[k] = obj[k];
	return o
};

export class Validator{
	static takeStates(obj){
		const o = {};
		for (let k in obj) o[k] = (typeof obj[k] === 'function') ? obj[k]() : obj[k];
		return o;
	}

	toggleClass(flag, trueCls, falseCls){
		[flag, !flag].forEach((b, i) => {
			this._el.classList[b ? 'add' : 'remove'](i ? falseCls : trueCls);
		});
		return this;
	}

	constructor(el, container){
		this._el = el;
		this._state = {isTouched : false, isPristine : true, isValid : undefined};
		this._prevState = cloneObj(this._state);
		this._tempState = {};
		this.stateReady = false;
		this._listeners = new Set();
		this._evListeners = [];
		this._helper = new HelpBox(this);
		container && this.addListener(container);
	}
	get state(){
		return this._state;
	}

	setState(obj){
		this.stateReady = true;
		for (let k in obj){
			if(k in this._state) this._tempState[k] = obj[k];
		}
		setTimeout(()=>{
			if(this.stateReady){
				this._state = Object.assign({}, this._state, Validator.takeStates(this._tempState));
				this.render();
				this._notify();
				this._prevState = cloneObj(this._state);
				this._tempState = {};
				this.stateReady = false;
			}
		},0);
	}

	addEvList(target, ev, listener){
		target.addEventListener(ev, listener);
		this._evListeners.push({target, ev, listener});
		return target;
	}

	removeEvList(){
		this._evListeners.forEach(({target, ev, listener}) => target.removeEventListener(ev, listener))
	}

	destroy(){
		this._el.classList.remove('og-valid', 'og-invalid', 'og-touched', 'og-untouched', 'og-pristine', 'og-dirty');
		this.removeEvList();
	}

	render(){
		if("isValid" in this._tempState && this._prevState.isValid !== this._state.isValid){
			this.toggleClass(this._state.isValid, 'og-valid', 'og-invalid');
			const text = this._state.isValid ? dataSet(this._el, 'ogValid') : dataSet(this._el, 'ogInvalid');
			this._helper[text ? 'appendText' : 'removeEle'](text);
		}
		this._render();
	}
	addListener(s){
		this._listeners.add(s);
	}
	removeListener(){
		this._listeners.remove(s);
	}
	_notify(){
		this._listeners.forEach(v => v.listen())
	}
	_render(){
		throw 'must be override';
	}
	validate(){
		throw 'must be override';
	}
}

class HelpBox {
	constructor(validator){
		this._el = validator._el;
		this.createHelpBox();
	}
	createHelpBox(){
		this._helpEl = document.createElement('div');
		this._helpEl.classList.add('helper');
	}
	appendText(text){
		this._helpEl.innerHTML = text;
		this._helpEl.parentNode || this._el.parentNode.appendChild(this._helpEl);
	}
	removeEle(){
		this._helpEl.parentNode && this._el.parentNode.removeChild(this._helpEl);
	}
}

export class ContainerValidator extends Validator{
	constructor({el, list}){
		super(el);
		this._el = el;
		this._list = list;
		this._init();
		this.onChecking();
	}

	_init(){
		this._el.noValidate = true;
	}
	isValidateAll(){
		return [...this._list.values()].every((v) => v.state.isValid);
	}

	validate(){
		this.setState({isValid: this.isValidateAll.bind(this)})
	}

	listen(){
		Validator.isValidaing && this.validate();
	}

	onChecking(){
		this._el.addEventListener('submit', e => {
			e.preventDefault();
			this.validateAll();
			this.validate();
		})
	}

	validateAll(){
		[...this._list.values()].forEach(o => o.validate());
	}
	_render(){
	}
}

export class TextValidator extends Validator{

	constructor(el, formEle){
		super(el, formEle);
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
	validate(){
		const val = this._el.value;
		const valid = this.validateMaxLen(val) && this.validateMinLen(val) && this.validatePattern(val) && this.validateRequire(val);
		this.setState({isValid: valid});
	}
	_render(){
		this.toggleClass(this.state.isTouched, 'og-touched', 'og-untouched');
		this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
	}
	onChecking(){
		this.addEvList(this._el, 'input', e => {
			this.state.isPristine && this.setState({isPristine: false});
			Validator.isValidaing && this.validate();
		});
		this.addEvList(this._el, 'blur', e => {
			!this.state.isTouched && this.setState({isTouched: true})
		});
	}
}

export class CheckboxValidator extends Validator{
	constructor(el, formEle){
		super(el, formEle);
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
	validate(){
		const cnt = [...this._inputs].filter(v=>v.checked).length;
		const valid = this.validateMaxCheck(cnt) && this.validateMinCheck(cnt);
		this.setState({isValid: valid})
	}
	onChecking(){
		this._inputs.forEach(ipt => {
			this.addEvList(ipt, 'click', () => {
				this.state.isPristine && this.setState({isPristine: false});
				Validator.isValidaing && this.validate();
			});
		});
	}
	_render(){
		this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
	}
}

export class SelectValidator extends Validator{
	constructor(el, formEle){
		super(el, formEle);
		this.onChecking();
	}

	validateRequire(val){
		if(!this._el.required) return true;
		return val !== "";
	}
	validate(){
		const val = this._el.value;
		const valid = this.validateRequire(val);
		this.setState({isValid: valid});
	}
	onChecking(){
		this.addEvList(this._el, 'change', e => {
			this.state.isPristine && this.setState({isPristine: false});
			Validator.isValidaing && this.validate();
		});
		this.addEvList(this._el, 'blur', e => {
			!this.state.isTouched && this.setState({isTouched: true});
		});
	}
	_render(){
		this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty')
			.toggleClass(this.state.isTouched, 'og-touched', 'og-untouched');
	}
}

