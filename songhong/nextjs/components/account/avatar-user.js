import { DEFAULT_USER_AVATAR } from '@constants/constants';
import { getUserAvatar } from '@js_dir/utils/hosoUtils';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import { connect } from 'react-redux';

function AvatarUser({ data, translationStrings, handleChooseAvatar }) {
    const {fullname = '', avatar_user = ''} = data || {};
    const shortAbbr = fullname.substr(0, 1);
    const avatar = getUserAvatar(avatar_user);
  return (
    <div className="groups-avatar__accounts">
        <div className="avatar-customers mb-15s">
            <p className="titles-names__avatars">{shortAbbr}</p>
            <img id="output" className="img-ups" src={avatar} /> 
            <div className="btn-change__avatars">
                <input type="file" className="input-avatars" accept=".jpg,jpeg,.png" onChange={handleChooseAvatar} />
                <img src={`/static/images/icons-upload-avatar.png`} />
            </div>
        </div>
        <h2 className="titles-bold__alls fs-17s mb-10s">{fullname}</h2>
        <div className="avatar-changes__outs">
            <p>{getTranslation(translationStrings, "thaydoi_label")} <img src="/static/images/change-out-pen-avatar.svg" /></p>
            <input type="file" className="input-avatars" accept=".jpg,jpeg,.png"  onChange={handleChooseAvatar} />
        </div>
    </div>
  )
}
function mapStateToProps(state) {   
    return { 
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AvatarUser);
