var _defaultFormat = /(\d{1,4})/g;
var _defaultInputFormat = /(?:^|\s)(\d{4})$/;
var _cardFormats = [
    {
        type: 'maestro',
        pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [12, 13, 14, 15, 16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'dinersclub',
        pattern: /^(36|38|30[0-5])/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [14],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'laser',
        pattern: /^(6706|6771|6709)/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'jcb',
        pattern: /^35/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'unionpay',
        pattern: /^62/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16, 17, 18, 19],
        cvcLength: [3],
        luhn: false
    }, {
        type: 'discover',
        pattern: /^(6011|65|64[4-9]|622)/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        pattern: /^5[1-5]/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'mastercard',
        pattern: /^2/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [16],
        cvcLength: [3],
        luhn: true
    }, {
        type: 'amex',
        pattern: /^3[47]/,
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
        length: [15],
        cvcLength: [3, 4],
        luhn: true
    }, {
        type: 'visa',
        pattern: /^4/,
        format: _defaultFormat,
        inputFormat: _defaultInputFormat,
        length: [13, 14, 15, 16],
        cvcLength: [3],
        luhn: true
    }
];
var Cards = (function () {
    function Cards() {
    }
    Object.defineProperty(Cards, "defaultFormat", {
        get: function () {
            return _defaultFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cards, "defaultInputFormat", {
        get: function () {
            return _defaultInputFormat;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cards, "cardFormats", {
        get: function () {
            return _cardFormats;
        },
        enumerable: true,
        configurable: true
    });
    Cards.fromNumber = function (number) {
        number = (number + '').replace(/\D/g, '');
        for (var i = 0; i < this.cardFormats.length; i++) {
            var card = this.cardFormats[i];
            if (card.pattern.test(number)) {
                return card;
            }
        }
    };
    Cards.fromType = function (type) {
        for (var i = 0; i < this.cardFormats.length; i++) {
            var card = this.cardFormats[i];
            if (card.type == type) {
                return card;
            }
        }
    };
    Cards.parseExpiryAsString = function (value) {
        value = value || '';
        value = value.replace(/\s/g, '');
        var _ref = value.split('/', 2);
        var month = _ref[0];
        var year = _ref[1];
        if (year && year.length === 2 && /^\d+$/.test(year)) {
            var prefix = (new Date())
                .getFullYear()
                .toString()
                .slice(0, 2);
            year = prefix + year;
        }
        return {
            month: month,
            year: year
        };
    };
    Cards.parseExpiry = function (value) {
        return {
            month: parseInt(value.month, 10),
            year: parseInt(value.year, 10)
        };
    };
    return Cards;
}());
export { Cards };
//# sourceMappingURL=cards.js.map