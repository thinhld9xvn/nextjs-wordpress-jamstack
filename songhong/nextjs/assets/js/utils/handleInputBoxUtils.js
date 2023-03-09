import { MAX_N_LENGTH } from "@constants/constants";
import { findRateByMonth } from "./tinhtienUtils";

export function handleNumberChanged(setValue, e) {
    const target = e.currentTarget;  
    const startEl = target.selectionStart;
    const endEl = target.selectionEnd;
    const keyCode = e.which || e.keyCode;
    if ( target.value.length > MAX_N_LENGTH - 1 && 
            ((keyCode >=48 && keyCode <=57) || (keyCode >= 96 && keyCode <= 105)) && 
                startEl === endEl || e.shiftKey ) {
        e.preventDefault();
         return false;
    }
    if ( keyCode === 86 || keyCode === 37 || keyCode === 39 ) { // ctrl+V, left arrow, right arrow
        return true;
    }
    if (keyCode === 8 || keyCode === 46 || (keyCode >=48 && keyCode <=57) || (keyCode >= 96 && keyCode <= 105) ) {        
        setTimeout(() => {          
            setValue( target.value ? parseInt(target.value) : 0 );
        }, 200);
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}
export function handleInputMonthChanged(data, elemDOM, ref, setValue, setInputValue, e) {
    const target = e.currentTarget;   
    const startEl = target.selectionStart;
    const endEl = target.selectionEnd;
    const keyCode = e.which || e.keyCode;
    //console.log(startEl, endEl);
    if ( target.value.length > 2 && 
            ((keyCode >=48 && keyCode <=57) || (keyCode >= 96 && keyCode <= 105)) && 
                startEl === endEl || e.shiftKey ) {
        e.preventDefault();
         return false;
    }
    if ( keyCode === 86 || keyCode === 37 || keyCode === 39 ) { // ctrl+V
        return true;
    }
    if (keyCode === 8 || keyCode === 46 || (keyCode >=48 && keyCode <=57) || (keyCode >= 96 && keyCode <= 105)) {        
        setTimeout(() => {
            const v = target.value ? parseInt(target.value) : 7;
            const rate = findRateByMonth(data, v);
            setInputValue(v);
            setValue(rate);
            elemDOM.value = v;
            ref.current.clearValue();
        }, 100);
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }
}