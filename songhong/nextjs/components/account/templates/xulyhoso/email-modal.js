import React from 'preact/compat'

export default function EmailModal({ heading = '', content = '', filename = '' }) {
  return (
    <>
        <h2 className="modalHsHeadingTitle">
            {heading}
        </h2>
        <div className="modalBodyHs__contents">
            <div id="content" 
                 dangerouslySetInnerHTML={{ __html : content }}>                
            </div>
            {filename ? (
              <div id="attachments">
                  <span className="fa fa-paperclip"></span>
                  <span>{filename}</span>
              </div>
            ) : null}
        </div>
    </>
  )
}
