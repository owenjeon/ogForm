import 'classlist';
import {ContainerValidator,TextValidator,CheckboxValidator, SelectValidator} from './validator';

window.Selector = class {
	constructor(eleStr){
		this._list = new Set();
		this._container = undefined;
		this._init(eleStr);
	}

	_init({form, inputClass}){
		this._eles = document.querySelectorAll(inputClass);
		this.formEle = form && (new ContainerValidator({el:form, list: this._list}));
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
		if(el.tagName === 'TEXTAREA' || /(text|email|number|tel)/.test(el.type)) return (new TextValidator(el, this.formEle));
		if(el.tagName === 'SELECT') return (new SelectValidator(el, this.formEle));
		const childInput = el.querySelector('INPUT');
		if(childInput && (childInput.type === "checkbox")) return (new CheckboxValidator(el, this.formEle));
	}

	isValidateAll(){
		return [...this._list.values()].every((v) => v.state.isValid);
	}
};

class Validator{
	toggleClass(flag, trueCls, falseCls){
		[flag, !flag].forEach((b, i) => {
			this._el.classList[b ? 'add' : 'remove'](i ? falseCls : trueCls);
		})
	}

	constructor(el, container){
		this._el = el;
		this._state = {isTouched : false, isPristine : true, isValid : false};
		this.stateReady = false;

		this._listeners = new Set();
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

	render(){
		this.toggleClass(this._state.isValid, 'og-valid', 'og-invalid');
		this._render();
	}
	_render(){
		throw 'must be override';
	}

	addListener(s){
		this._listeners.add(s);
	}
	removeListener(){
		this._listeners.remove(s);
	}
	_notify(){
		this._listeners.forEach(v => {
			v.listen();
		})
	}
}