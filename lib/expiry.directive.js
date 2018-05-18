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
import { AbstractInputDirective } from "./input.directive";
import { NG_VALIDATORS } from "@angular/forms";
import { Cards } from "./cards";
var selector = '[payments-expiry]';
var AngularPaymentsExpiryDirective = (function (_super) {
    __extends(AngularPaymentsExpiryDirective, _super);
    function AngularPaymentsExpiryDirective(el) {
        return _super.call(this, el) || this;
    }
    AngularPaymentsExpiryDirective.prototype.validate = function (c) {
        var value = this._elementValue;
        var valid = true;
        var issue = {};
        issue[selector] = false;
        if (!value) {
            return null;
        }
        var expiryAsString = Cards.parseExpiryAsString(this._elementValue);
        var month = expiryAsString.month;
        var year = expiryAsString.year;
        if (!(month && year)) {
            return issue;
        }
        if (!/^\d+$/.test(month)) {
            return issue;
        }
        if (!/^\d+$/.test(year)) {
            return issue;
        }
        if (parseInt(month, 10) > 12) {
            return issue;
        }
        if (year.length === 2) {
            var prefix = (new Date())
                .getFullYear()
                .toString()
                .slice(0, 2);
            year = prefix + year;
        }
        var expiry = Cards.parseExpiry({
            month: month,
            year: year
        });
        var expiryDate = new Date(expiry.year, expiry.month);
        var currentTime = new Date();
        if (expiryDate <= currentTime) {
            return issue;
        }
        if (c.value != expiry) {
            if (typeof (c.value) === 'string') {
                c.setValue(expiry, {
                    emitModelToViewChange: false
                });
            }
            else if ('month' in c.value && 'year' in c.value) {
                if (c.value.month != expiry.month && c.value.year != expiry.year) {
                    c.setValue(expiry, {
                        emitModelToViewChange: false
                    });
                }
            }
        }
        return null;
    };
    AngularPaymentsExpiryDirective.prototype._ngAfterViewInit = function () {
        this._element.addEventListener('keypress', this._formatForwardSlash.bind(this));
    };
    AngularPaymentsExpiryDirective.prototype._restrict = function (e) {
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        if (this._hasTextSelected()) {
            return;
        }
        var digit = e.key;
        var value = this._elementValue.replace(/\D/g, '');
        if (value.length >= 6) {
            e.preventDefault();
            return;
        }
    };
    AngularPaymentsExpiryDirective.prototype._format = function (e) {
        if (this._isInvalidKey(e)) {
            e.preventDefault();
            return;
        }
        var digit = e.key;
        var value = this._elementValue;
        var newValue = value + digit;
        var newDigit = parseInt(newValue, 10);
        if (/^\d\d$/.test(newValue)) {
            e.preventDefault();
            if (newDigit > 12) {
                this._elementValue = "0" + value + " / " + digit;
            }
            else {
                this._elementValue = "" + newValue + " / ";
            }
        }
    };
    AngularPaymentsExpiryDirective.prototype._formatForwardSlash = function (e) {
        var key = e.key;
        if (key !== '/') {
            return;
        }
        var value = this._elementValue;
        if (/^\d{1,2}$/.test(value)) {
            if (value !== '0') {
                if (value.length === 1) {
                    value = "0" + value;
                }
                this._elementValue = value + " / ";
                return;
            }
        }
        e.preventDefault();
    };
    AngularPaymentsExpiryDirective.prototype._formatBack = function (e) {
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
        var slashCheck = /\d(\s|\/)+$/;
        if (slashCheck.test(value)) {
            e.preventDefault();
            this._elementValue = value.replace(slashCheck, '');
        }
    };
    AngularPaymentsExpiryDirective.prototype._reFormat = function (e) { };
    AngularPaymentsExpiryDirective.prototype.__checkSelectionValueLength = function (value) {
        // I'm not sure what this actually does x.x
        if (!this._elementInput) {
            return false;
        }
        return this._elementInput.selectionStart !== null && this._elementInput.selectionStart !== value.length;
    };
    AngularPaymentsExpiryDirective.decorators = [
        { type: Directive, args: [{
                    selector: selector,
                    providers: [
                        { provide: NG_VALIDATORS, useExisting: forwardRef(function () { return AngularPaymentsExpiryDirective; }), multi: true }
                    ]
                },] },
    ];
    /** @nocollapse */
    AngularPaymentsExpiryDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    return AngularPaymentsExpiryDirective;
}(AbstractInputDirective));
export { AngularPaymentsExpiryDirective };
//# sourceMappingURL=expiry.directive.js.map