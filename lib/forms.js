var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var AbstractCreditCardFormComponent = (function () {
    function AbstractCreditCardFormComponent(formBuilder) {
        var _this = this;
        this.name = new EventEmitter();
        this.number = new EventEmitter();
        this.cvc = new EventEmitter();
        this.expiry = new EventEmitter();
        this.status = new EventEmitter();
        this.form = new EventEmitter();
        this.creditCardForm = formBuilder.group({
            name: [''],
            number: [''],
            cvc: [''],
            expiry: [''],
        });
        this.creditCardForm.get('name').valueChanges.subscribe(function (data) {
            _this.name.emit(data);
        });
        this.creditCardForm.get('number').valueChanges.subscribe(function (data) {
            _this.number.emit(data);
        });
        this.creditCardForm.get('cvc').valueChanges.subscribe(function (data) {
            _this.cvc.emit(data);
        });
        this.creditCardForm.get('expiry').valueChanges.subscribe(function (data) {
            _this.expiry.emit(data);
        });
        this.creditCardForm.statusChanges.subscribe(function (data) {
            _this.status.emit(data);
        });
        setTimeout(function () {
            _this.form.emit(_this.creditCardForm);
        });
    }
    AbstractCreditCardFormComponent.metaData = {
        outputs: [
            'name',
            'number',
            'cvc',
            'expiry',
            'status',
            'form'
        ]
    };
    /** @nocollapse */
    AbstractCreditCardFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] },] },
    ]; };
    AbstractCreditCardFormComponent.propDecorators = {
        'name': [{ type: Output, args: ['name',] },],
        'number': [{ type: Output, args: ['number',] },],
        'cvc': [{ type: Output, args: ['cvc',] },],
        'expiry': [{ type: Output, args: ['expiry',] },],
        'status': [{ type: Output, args: ['status',] },],
        'form': [{ type: Output, args: ['form',] },],
    };
    return AbstractCreditCardFormComponent;
}());
export { AbstractCreditCardFormComponent };
var CreditCardFormComponent = (function (_super) {
    __extends(CreditCardFormComponent, _super);
    function CreditCardFormComponent(formBuilder) {
        return _super.call(this, formBuilder) || this;
    }
    CreditCardFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'payments-credit-card-form',
                    templateUrl: 'credit-card-form.component.html',
                    outputs: AbstractCreditCardFormComponent.metaData.outputs
                },] },
    ];
    /** @nocollapse */
    CreditCardFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, decorators: [{ type: Inject, args: [FormBuilder,] },] },
    ]; };
    return CreditCardFormComponent;
}(AbstractCreditCardFormComponent));
export { CreditCardFormComponent };
//# sourceMappingURL=forms.js.map