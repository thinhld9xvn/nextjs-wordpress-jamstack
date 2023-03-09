import React from 'preact/compat'
export default function RequiredFieldMsg({ msg }) {
    return(
        <p><span className="form-error-valid">{msg}</span></p>
    );
}