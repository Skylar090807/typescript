"use strict";
//Decorators
//Decorators를 이용하면 기존의 함수나 클래스를 한 단계 감싸서 꾸며줄 수 있는 wrapper function, wrapper class를 만들 수 있다.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Log(_, name, descriptor) {
    const newDescriptor = Object.assign(Object.assign({}, descriptor), { value: function (...args) {
            console.log(`Calling ${name} with arguments:`);
            console.dir(args);
            const result = descriptor.value.apply(this, args);
            console.log(`Result:`);
            console.dir(result);
            return result;
        } });
    return newDescriptor;
}
class Calculator {
    // Experimental support for decorators is a feature that is subject to change in a future release.
    // Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.
    add(x, y) {
        return x + y;
    }
}
__decorate([
    Log // Decorators 사용: @Log annotation을 이용하여 사용한다.
], Calculator.prototype, "add", null);
const calculator = new Calculator();
console.log(calculator.add(1, 2));
