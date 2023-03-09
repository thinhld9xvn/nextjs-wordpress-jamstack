import React from 'preact/compat'
import GroupUploadItem from './group-upload-item';
export default function GroupUploads({ label, dragdroplabel, changelabel, values, setValues, handleChanged, handleRemove, validate, handleValidate, translationStrings }) {    
    //const isValidate = handleValidate(values); 
  return (
    <div className={`groups-uploads__imgs mb-35s had-images__changes}`}>
        <p className="title-uploads__imgs mb-10s">
            {label} <img src="/static/images/check-up-img.svg" alt="" />
        </p>
        <div className="list-uploads__imgs">
            <div className="row">
                {values.map(item => <GroupUploadItem key = {item} 
                                                     data = {item}
                                                     props = {{dragdroplabel, changelabel, values, setValues, handleChanged, handleRemove, translationStrings}} />)}
            </div>
        </div>
        {/*validate && !isValidate ? (
          <RequiredFieldMsg msg = {getTranslation(translationStrings, "chooseatleasttwohosoimages_label")} />
        ) : null*/}
    </div>
  )
}
