import React from 'preact/compat'

function getFileName(file) {
    if ( !file || !file.name ) return '';
    return file.name.toString().split('/').pop().replace('-150x150', '');
}
function getObjValueById(values, id, activeId, defvalue) {
    return id === activeId ? values[activeId] : 
                            (values[id] ? values[id] : defvalue);
}
function UploadModalTemplateItem({ data, activeUploadItemId, activeUploadPercentage, activeUploadErrors }) {
    const {id, file, src, percentage, identify, size} = data;
    const {capacity, unit} = size;
    const name = getFileName(file);
    const identId = `${identify}-${id}`;
    const percentValue = getObjValueById(activeUploadPercentage, identId, activeUploadItemId, 0);
    const errorValue = getObjValueById(activeUploadErrors, identId, activeUploadItemId, '');
    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="items-uploads__imgs images-changed">
                <div className="box-changes__images mb-10s">
                    {errorValue ? (
                        <>
                            <span className="error__box">
                                <img src="/static/images/error-icon.png" alt="error" />                        
                            </span>
                            <span className="mytooltip">
                                <span className="tooltiptext">{errorValue}</span>
                            </span>
                        </>
                    ) : null}
                    <img className="img-ups" src={src} alt={name} />
                </div>
                <div className="bottom-uploads__imgs">
                    <p className="names-uploads__imgs">{name}</p>
                </div>
                <div className="progress__bar">
                    <div className="progress__value" 
                         style={{ width : `${percentValue}%` }} 
                         role="progress__bar"></div>
                </div>
                <div className="bottom-uploads__imgs bottom__progressing">
                    <span className="names-uploads__imgs percentage">{percentValue}%</span>
                    <span className="names-uploads__imgs file-size"><strong>{capacity}</strong> {unit}</span>
                </div>
            </div>
        </div>
    );
}
export function UploadModalTemplate({ label, data, activeUploadItemId, activeUploadPercentage, activeUploadErrors }) {
    const arrUploadItems = data.map(item => <UploadModalTemplateItem key = {item}
                                                                     data = {item}
                                                                     activeUploadItemId = {activeUploadItemId}
                                                                     activeUploadPercentage = {activeUploadPercentage}
                                                                     activeUploadErrors = {activeUploadErrors} />);
    return (
        <div className="groups-uploads__imgs mb-35s had-images__changes">
            <p className="title-uploads__imgs mb-10s">
                {label}
            </p>
            <div className="list-uploads__imgs">
                <div className="row">
                    {arrUploadItems}
                </div>
            </div>
        </div>
    )
}
