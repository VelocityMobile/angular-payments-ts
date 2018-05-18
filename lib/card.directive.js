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
import { Cards } from "./cards";
var selector = '[payments-card]';
var AngularPaymentsCardDirective = (function (_super) {
    __extends(AngularPaymentsCardDirective, _super);
    function AngularPaymentsCardDirective(el) {
        return _super.call(this, el) || this;
    }
    AngularPaymentsCardDirective.prototype.validate = function (c) {
        var value = this._elementValue;
        var valid = true;
        var issue = {};
        issue[selector] = false;
        this.__clearCardClass();
        // Empty number is valid (should be handled with a 'required' directive)
        if (!value) {
            return null;
        }
        value = (value + '').replace(/\s+|-/g, '');
        if (c.value != value) {
            c.setValue(value, {
                emitModelToViewChange: false
            });
        }
        if (!/^\d+$/.test(value)) {
            return issue;
        }
        var card = Cards.fromNumber(value);
        if (!card) {
            return issue;
        }
        this.__clearCardClass();
        this.__setCardClass(card);
        if (card.luhn && !this.__luhnCheck(value)) {
            return issue;
        }
        var lengthMatch = false;
        for (var i = 0; i < card.length.length; i++) {
            var length_1 = card.length[i];
            if (value.length === length_1) {
                lengthMatch = true;
            }
        }
        if (!lengthMatch) {
            return issue;
        }
        return null;
    };
    AngularPaymentsCardDirective.prototype._ngAfterViewInit = function () {
    };
    AngularPaymentsCardDirective.prototype._restrict = function (e) {
        // Catch delete, tab, backspace, arrows, etc..
        if (e.which === 8 || e.which === 0) {
            return;
        }
        var digit = e.key;
        if (!/^\d+$/.test(digit)) {
            e.preventDefault();
            return;
        }
        if (this._hasTextSelected()) {
            return;
        }
        var value = (this._elementValue + digit).replace(/\D/g, '');
        var card = Cards.fromNumber(value);
        var upperLength = 16;
        if (card) {
            upperLength = card.length[card.length.length - 1];
        }
        if (value.length > upperLength) {
            e.preventDefault();
        }
    };
    AngularPaymentsCardDirective.prototype._format = function (e) {
        // Catch delete, tab, backspace, arrows, etc..
        if (e.which === 8 || e.which === 0) {
            return;
        }
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        var value = this._elementValue;
        if (this.__checkSelectionValueLength(value)) {
            return;
        }
        var digit = e.key;
        var card = Cards.fromNumber(value + digit);
        var length = (value.replace(/\D/g, '') + digit).length;
        var re = Cards.defaultInputFormat;
        var upperLength = 16;
        if (card) {
            re = card.inputFormat;
            upperLength = card.length[card.length.length - 1];
        }
        if (length >= upperLength) {
            // Shouldn't we be stopping propogation here?
            return;
        }
        if (re.test(value)) {
            e.preventDefault();
            this._elementValue = value + ' ' + digit;
        }
        else if (re.test(value + digit)) {
            e.preventDefault();
            this._elementValue = value + digit + ' ';
        }
    };
    AngularPaymentsCardDirective.prototype._formatBack = function (e) {
        if (e.metaKey) {
            return;
        }
        if (e.which !== 8) {
            return;
        }
        var value = this._elementValue;
        if (this.__checkSelectionValueLength(value)) {
            return;
        }
        if (/\d\s$/.test(value) && !e.metaKey && e.keyCode >= 46) {
            e.preventDefault();
            this._elementValue = value.replace(/\d\s$/, '');
        }
        else if (/\s\d?$/.test(value)) {
            e.preventDefault();
            this._elementValue = value.replace(/\s\d?$/, '');
        }
    };
    AngularPaymentsCardDirective.prototype._reFormat = function (e) {
        // I'm not sure why the original code uses setTimeout, but I'm following suit
        setTimeout(function () {
            this._elementValue = this.__getFormattedCardNumber();
        }.bind(this));
    };
    AngularPaymentsCardDirective.prototype.__getFormattedCardNumber = function () {
        var value = this._elementValue;
        var card = Cards.fromNumber(value);
        if (!card) {
            return this._elementValue;
        }
        var upperLength = card.length[card.length.length - 1];
        value = value.replace(/\D/g, '');
        value = value.slice(0, +upperLength + 1 || 9e9);
        if (card.format.global) {
            var ref = value.match(card.format);
            return ref !== null ? ref.join(' ') : void 0;
        }
        else {
            var groups = card.format.exec(value);
            if (groups !== null) {
                groups.shift();
            }
            return groups !== null ? groups.join(' ') : void 0;
        }
    };
    AngularPaymentsCardDirective.prototype.__parseCardNumber = function () {
        var value = this._elementValue;
        return value !== null && value !== undefined ? value.replace(/\s/g, '') : value;
    };
    AngularPaymentsCardDirective.prototype.__checkSelectionValueLength = function (value) {
        // I'm not sure what this actually does x.x
        if (!this._elementInput) {
            return false;
        }
        return this._elementInput.selectionStart !== null && this._elementInput.selectionStart !== value.length;
    };
    AngularPaymentsCardDirective.prototype.__luhnCheck = function (value) {
        var odd = true;
        var sum = 0;
        var digits = (value + '').split('').reverse();
        for (var i = 0; i < digits.length; i++) {
            var digit = parseInt(digits[i], 10);
            if ((odd = !odd)) {
                digit *= 2;
            }
            if (digit > 9) {
                digit -= 9;
            }
            sum += digit;
        }
        return sum % 10 === 0;
    };
    AngularPaymentsCardDirective.prototype.__clearCardClass = function () {
        var cards = Cards.cardFormats;
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            this._element.classList.remove('payments-card-' + card.type);
        }
        this.__clearCardAttr();
    };
    AngularPaymentsCardDirective.prototype.__setCardClass = function (card) {
        this._element.classList.add('payments-card-' + card.type);
        this.__setCardAttr(card);
    };
    AngularPaymentsCardDirective.prototype.__clearCardAttr = function () {
        var elems = document.querySelectorAll('[payments-card-type]');
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            elem.removeAttribute('payments-card-type');
        }
    };
    AngularPaymentsCardDirective.prototype.__setCardAttr = function (card) {
        var attributes = ['card', 'cvc', 'expiry'];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var attributeName = attributes_1[_i];
            var elems = document.querySelectorAll('[payments-' + attributeName + ']');
            for (var i = 0; i < elems.length; i++) {
                var elem = elems[i];
                elem.setAttribute('payments-card-type', card.type);
            }
        }
    };
    AngularPaymentsCardDirective.decorators = [
        { type: Directive, args: [{
                    selector: selector,
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AngularPaymentsCardDirective; }), multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    AngularPaymentsCardDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return AngularPaymentsCardDirective;
}(AbstractInputDirective));
export { AngularPaymentsCardDirective };
//# sourceMappingURL=card.directive.js.map