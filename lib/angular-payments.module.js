import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularPaymentsCardDirective, AngularPaymentsExpiryDirective, AngularPaymentsCVCDirective } from './angular-payments.directive';
import { CreditCardFormComponent } from './forms';
var AngularPaymentsModule = (function () {
    function AngularPaymentsModule() {
    }
    AngularPaymentsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule, ReactiveFormsModule
                    ],
                    exports: [
                        AngularPaymentsCardDirective,
                        AngularPaymentsExpiryDirective,
                        AngularPaymentsCVCDirective,
                        CreditCardFormComponent
                    ],
                    declarations: [
                        AngularPaymentsCardDirective,
                        AngularPaymentsExpiryDirective,
                        AngularPaymentsCVCDirective,
                        CreditCardFormComponent
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    AngularPaymentsModule.ctorParameters = function () { return []; };
    return AngularPaymentsModule;
}());
export { AngularPaymentsModule };
//# sourceMappingURL=angular-payments.module.js.map