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
import { Directive, ElementRef, forwardRef } from "@angular/core";
import { NG_VALIDATORS } from "@angular/forms";
import { AbstractInputDirective } from "./input.directive";
var selector = '[payments-cvc]';
var AngularPaymentsCVCDirective = (function (_super) {
    __extends(AngularPaymentsCVCDirective, _super);
    function AngularPaymentsCVCDirective(el) {
        return _super.call(this, el) || this;
    }
    AngularPaymentsCVCDirective.prototype.validate = function () {
        var value = this._elementValue;
        var valid = true;
        var issue = {};
        issue[selector] = false;
        if (!value) {
            return null;
        }
        if (!/^\d+$/.test(value)) {
            return issue;
        }
        var card = this._elementCardType;
        if (card) {
            if (value.length !== card.cvcLength[card.cvcLength.length - 1]) {
                return issue;
            }
        }
        else {
            if (value.length !== 3 && value.length !== 4) {
                return issue;
            }
        }
        return null;
    };
    AngularPaymentsCVCDirective.prototype._ngAfterViewInit = function () {
    };
    AngularPaymentsCVCDirective.prototype._restrict = function (e) {
    };
    AngularPaymentsCVCDirective.prototype._format = function (e) {
        // Catch delete, tab, backspace, arrows, etc..
        if (e.which === 8 || e.which === 0) {
            return;
        }
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        if (this._hasTextSelected()) {
            return;
        }
        var value = this._elementValue + e.key;
        var card = this._elementCardType;
        var length = card != null ? card.cvcLength[card.cvcLength.length - 1] : 4;
        if (value.length <= length) {
            return;
        }
        else {
            e.preventDefault();
            return;
        }
    };
    AngularPaymentsCVCDirective.prototype._formatBack = function (e) {
    };
    AngularPaymentsCVCDirective.prototype._reFormat = function (e) {
    };
    AngularPaymentsCVCDirective.decorators = [
        { type: Directive, args: [{
                    selector: selector,
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AngularPaymentsCVCDirective; }), multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    AngularPaymentsCVCDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return AngularPaymentsCVCDirective;
}(AbstractInputDirective));
export { AngularPaymentsCVCDirective };
//# sourceMappingURL=cvc.directive.js.map