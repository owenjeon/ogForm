import 'classlist';
import {ContainerValidator,TextValidator,CheckboxValidator, SelectValidator, Validator} from './validator';

'use strict';

window.OgForm = class {
	constructor(eleStr){
		this._list = new Map();
		this.formEle = undefined;
		this._init(eleStr);
	}

	_init({form, inputs, checkWhenSubmit = false}){
		Validator.isValidaing = !checkWhenSubmit;
		this.formEle = form && (new ContainerValidator({el:form, list: this._list}));
		this.addInput(inputs);
	}

	setValidator(el){
		if(!el.ogInput){ //validator 가 등록된 input
			el.ogInput = true;
			const i = this.getInputType(el);
			i && this._list.set(el, i);
		}
	}
	unsetValidator(el){
		this._list.get(el).destroy();
		this._list.delete(el);
		el.ogInput = false;
	}

	getInputType(el){
		if(el.tagName === 'TEXTAREA' || /(text|email|number|tel)/.test(el.type)) return (new TextValidator(el, this.formEle));
		if(el.tagName === 'SELECT') return (new SelectValidator(el, this.formEle));
		const childInput = el.querySelector('INPUT');
		if(childInput && (childInput.type === "checkbox")) return (new CheckboxValidator(el, this.formEle));
	}

	addInput(inputs){
		let list = (inputs instanceof Array) ? inputs : [inputs];
		list.forEach(item => {
			if(item instanceof HTMLElement) return this.setValidator(item);
			(item instanceof NodeList ? item : document.querySelectorAll(item)).forEach(el => {
				this.setValidator(el);
			});
		});
	}

	removeInput(inputs){
		let list = (inputs instanceof Array) ? inputs : [inputs];
		list.forEach(el => {
			this.unsetValidator(el);
		});
	}
};