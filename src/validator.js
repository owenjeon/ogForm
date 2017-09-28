class Validator{
	toggleClass(flag, trueCls, falseCls){
		[flag, !flag].forEach((b, i) => {
			this._el.classList[b ? 'add' : 'remove'](i ? falseCls : trueCls);
		});
		return this;
	}

	constructor(el, container){
		this._el = el;
		this._state = {isTouched : false, isPristine : true, isValid : false};
		this.stateReady = false;

		this._listeners = new Set();
		this._evListeners = [];
		container && this.addListener(container);
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
				this._notify();
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
		this.toggleClass(this._state.isValid, 'og-valid', 'og-invalid');
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
}

export class ContainerValidator extends Validator{
	constructor({el, list}){
		super(el);
		this._list = list;
	}

	isValidateAll(){
		return [...this._list.values()].every((v) => v.state.isValid);
	}
	listen(){
		this.onChecking();
	}

	onChecking(){
		this.setState({isValid: this.isValidateAll()})
	}
	_render(){}
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
	_render(){
		this.toggleClass(this.state.isTouched, 'og-touched', 'og-untouched');
		this.toggleClass(this.state.isPristine, 'og-pristine', 'og-dirty');
	}

	onChecking(){
		this.addEvList(this._el, 'input', e => {
			this.state.isPristine && this.setState({isPristine: false});
			const val = e.target.value;
			const valid = this.validateMaxLen(val) && this.validateMinLen(val) && this.validatePattern(val) && this.validateRequire(val);
			valid !== this.state.isValid && this.setState({isValid: valid});
		})
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

	onChecking(){
		this._inputs.forEach(ipt => {
			this.addEvList(ipt, 'click', () => {
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

export class SelectValidator extends Validator{
	constructor(el, formEle){
		super(el, formEle);
		this.onChecking();
	}

	validateRequire(val){
		if(!this._el.required) return true;
		return val !== "";
	}

	onChecking(){
		this.addEvList(this._el, 'change', e => {
			this.state.isPristine && this.setState({isPristine: false});
			const val = e.target.value;
			const valid = this.validateRequire(val);
			valid !== this.state.isValid && this.setState({isValid: valid});
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

