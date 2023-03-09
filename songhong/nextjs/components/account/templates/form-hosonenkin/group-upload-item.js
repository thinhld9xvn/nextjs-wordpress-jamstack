import React from 'preact/compat'

export default function GroupUploadItem({ data, props }) {
    const {id, file, src, getted, identify} = data;
    const {dragdroplabel, values, changelabel, setValues, handleChanged, handleRemove, translationStrings} = props;
    //console.log(item);
    const isChangedStage = getted || file;
    const srcset = src || "/static/images/plus-change__images.png";
    const srcname = src && (src.startsWith('http://') || 
                                src.startsWith('https://')) ? src.split('/').pop().replace('-150x150', '') : '';
    const name = srcname || file?.name;
    const msgs = {  uploadinvalidimage_label : translationStrings['uploadinvalidimage_label'],
                    uploadexceed5mb_label : translationStrings['uploadexceed5mb_label'] 
                };
    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className={`items-uploads__imgs ${isChangedStage ? 'images-changed' : ''}`}>
                <div className="box-changes__images mb-10s">
                    <img className="img-ups" src={`${srcset}`} alt="" />
                    <input type="file" 
                            data-id={id} 
                            className="input-avatars" 
                            accept=".jpg,.jpeg,.png" 
                            onChange={handleChanged.bind(this, id, identify, values, setValues, msgs)} />
                    <p className="clear-images__changes"
                        onClick={handleRemove.bind(this, id, identify, values, setValues)}>
                        <img src="/static/images/clear-images-changes.svg" alt="" />
                    </p>
                    <p className="fs-14s color-blues text-hover__changes">{dragdroplabel}</p>
                </div>
                <div className="bottom-uploads__imgs">
                    <p className="names-uploads__imgs">{name}</p>
                    <div className="btn-changes__bottoms">
                        <p>{changelabel}</p>
                        <input type="file" 
                                className="input-avatars" 
                                accept=".jpg,.jpeg,.png" 
                                onChange={handleChanged.bind(this, id, identify, values, setValues, msgs)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
