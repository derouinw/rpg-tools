import {
    Directive,
    ElementRef,
    Renderer,
    forwardRef
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';

const DIV_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DivValueAccessor),
    multi: true
};

@Directive({
    selector: 'div[formControlName]',
    host: {
        '(input)': 'onChange($event.target)',
        '(blur)' : 'onTouched()'
    },
    providers: [DIV_VALUE_ACCESSOR]
})
export class DivValueAccessor implements ControlValueAccessor {
    onChange = (_) => {};
    onTouched = () => {};

    constructor(
        private _renderer: Renderer,
        private _elementRef: ElementRef
    ) {}

    public writeValue(value: any): void {
        var normalizedValue = (value == null || value === '') ?
                '' :
                value.replace(/^s|s$/g, ' ');
        this._renderer.setElementProperty(this._elementRef.nativeElement,
            'innerHTML', normalizedValue);
    }

    public registerOnChange(fn: (_: any) => void): void {
        this.onChange = (target: any) => {
            fn(target.innerText);
        };
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }
}
