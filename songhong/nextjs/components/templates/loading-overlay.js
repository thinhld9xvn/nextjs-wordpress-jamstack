import React from 'preact/compat'

export default function LoadingOvery({ show = false }) {
  return (
    <div className={`overlayLoading ${show ? 'show' : ''}`}>
        <div className="overlay__inner">
            <div className="overlay__content"><span className="spinner"></span></div>
        </div>
    </div>
  )
}
