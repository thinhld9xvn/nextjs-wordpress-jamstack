import { formatMoney } from '@js_dir/utils/tinhtienUtils';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import { connect } from 'react-redux';

function BangHeSoTemplate({ data, translationStrings }) {
  return (
    <div className="tables-coefficient__bills">
        <h2 className="titles-md__alls titles-transform__alls color-blues fs-24s mb-40s">{getTranslation(translationStrings, "bangheso_label")}</h2>
        <table>
            <tbody>
                <tr>
                    <td>
                        {getTranslation(translationStrings, "sothangdadongphibaohiem_label")}
                    </td>
                    <td>
                        {getTranslation(translationStrings, "sodungdetinhmucthanhtoan_label")}
                    </td>
                    <td>
                        {getTranslation(translationStrings, "tylechitra_label")}
                    </td>
                </tr>
                {data.map(row => (
                    <tr key = {row}>
                        <td>
                            {row.label}
                        </td>
                        <td>
                            {formatMoney(row.content, 1, '.', ',')}
                        </td>
                        <td>
                            {row.rate_payment}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
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
export default connect(mapStateToProps, mapDispatchToProps)(BangHeSoTemplate);
