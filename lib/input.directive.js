import { Cards } from './cards';
var AbstractInputDirective = (function () {
    // #endregion Properties
    function AbstractInputDirective(el) {
        this.el = el;
    }
    Object.defineProperty(AbstractInputDirective.prototype, "_element", {
        // #region Properties
        get: function () {
            return this.el.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractInputDirective.prototype, "_elementInput", {
        get: function () {
            return this.__getRealElement(this.el.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractInputDirective.prototype, "_elementValue", {
        get: function () {
            if ('value' in this._element) {
                return this._element.value;
            }
            else if (this._elementInput && 'value' in this._elementInput) {
                return this._elementInput.value;
            }
            else {
                return null;
            }
        },
        set: function (value) {
            if ('value' in this._element) {
                this._element.value = value;
            }
            else if (this._elementInput && 'value' in this._elementInput) {
                this._elementInput.value = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractInputDirective.prototype, "_elementCardType", {
        get: function () {
            var card;
            var attr = this._element.attributes.getNamedItem('payments-card-type');
            if (attr != null) {
                card = Cards.fromType(attr.value);
            }
            return card;
        },
        enumerable: true,
        configurable: true
    });
    AbstractInputDirective.prototype.ngAfterViewInit = function () {
        this.__setupElement();
        this._ngAfterViewInit();
    };
    // #endregion Abstract functions to implement
    // #region Protected utility functions
    AbstractInputDirective.prototype._hasTextSelected = function () {
        if (!this._elementInput) {
            return false;
        }
        if (this._elementInput.selectionStart !== null && this._elementInput.selectionStart !== this._elementInput.selectionEnd) {
            return true;
        }
        // Not sure what this originally did, and as it stands document.selection does not seem to exist
        // if (document.selection) {
        //     return true;
        // }
        return false;
    };
    AbstractInputDirective.prototype._isInvalidKey = function (e) {
        var digit = e.key;
        return !/^\d+$/.test(digit) && !e.metaKey && e.charCode !== 0 && !e.ctrlKey;
    };
    // #endregion Protected utility functions
    // #region Private functions
    AbstractInputDirective.prototype.__setupElement = function () {
        this._element.addEventListener('keypress', this._restrict.bind(this));
        this._element.addEventListener('keypress', this._format.bind(this));
        this._element.addEventListener('keydown', this._formatBack.bind(this));
        this._element.addEventListener('paste', this._reFormat.bind(this));
    };
    AbstractInputDirective.prototype.__getRealElement = function (elem) {
        // It's possible that this was attached to an element that contains an input field
        // If so, assume we only care about the first element
        // Note: This is mainly for ion-input when using ionic
        if (elem.nodeName.toLowerCase() !== 'input') {
            var children = elem.childNodes;
            elem = null;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.nodeName.toLowerCase() === 'input') {
                    elem = child;
                    break;
                }
            }
            if (elem == null) {
                console.warn("angular-payments-ts: Element had payments-directive added but no valid target inputs were found");
            }
        }
        return elem;
    };
    return AbstractInputDirective;
}());
export { AbstractInputDirective };
//# sourceMappingURL=input.directive.js.map