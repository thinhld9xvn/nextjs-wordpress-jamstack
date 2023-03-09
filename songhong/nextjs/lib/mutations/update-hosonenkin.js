import {pick} from 'lodash';

export function parseFiles(images) {
  return images.map(img => img.file);
}
export function parseImagesData(images) {
  return [...images.map(img => {
            if ( img && img?.file ) {
              const image = pick(img, ['id', 'file', 'src', 'identify', 'percentage', 'size', 'uploading']);
              const fileSize = image.file.size;
              const fileSizeMB = parseFloat((fileSize / (1024 * 1024)).toFixed(1));
              const fileSizeKB = parseFloat((fileSize / 1024).toFixed(1));
              return {...image, size : {
                capacity : fileSizeMB > 0 ? fileSizeMB : fileSizeKB,
                unit : fileSizeMB > 0 ? 'MB' : 'KB'
              }};          
            }
            return null;
        }).filter(item => item !== null)];
}
export function parseImageRemoved(images) {
  return [...images.filter(image => image.removed)];
}
export function parseFilesMapFormData(fd, mapHandler, files, fromIndex = 0) {
  const variables = {}; 
  files.forEach((file, i) => {
    const j = fromIndex + i;
    variables[j] = [`variables.${mapHandler}.${j}`];
    fd.append(j, file);
  });  
  return variables;
  //fd.append("map", JSON.stringify(variables));
}
export function sum(arr) {
  return arr.reduce((a, b) => a + b);
}
export async function UpdateHoSoImage({ userid, file, identify, gallery_key, hosoMetaData }) {
    const hosoMeta = `""${JSON.stringify(hosoMetaData)}""`;
    const queryUpdateString = {
      query: `
        mutation updateAnhHsMutation($file : Upload!) {
          updateUser(
            input: {id: "${userid}",
                    hosoFile: $file,
                    hosoIdentity : "${identify}",
                    hosoGalleryId : "${gallery_key}"
                    hosoMetaData: "${hosoMeta}"}
          ) {
            clientMutationId
            user {
              hosoNenkinAnhNgoaiKieu
              hosoNenkinAnhNenkin
              hosoNenkinAnhHoChieu
              hosoNenkinAnhXacNhanNganHang
              hosoHoanThueAnhGenSen
              hosoHoanThueGiayChuyenTien
              hosoHoanThueGiayPhungDuong
              hosoHoanThueAnhHoChieu
              hosoHoanThueMyNumber
              hosoHoanThueSoTTTaiKhoan
              hosoHoanThueAnhNgoaiKieu
            }
          }
        }
      `,
      variables: {
        file : null
      },
    };
  const fd = new FormData();
  fd.append("operations", JSON.stringify(queryUpdateString));
  fd.append('map', `{ "0": ["variables.file"] }`);
  fd.append('0', file);
  const res = await fetch(process.env.WP_API_URL, {
      method: 'POST',
      body: fd
  });
  const json = await res.json();
  if (json.errors) { 
      return json.errors;
  }
  return json.data;
}
export async function UpdateHoSoNenkin(props) {
  const {id, ngoaikieuImages, nenkinImages, hoChieuImages, giayNganHangImages, hosoMetaData} = props;
  //console.log(ngoaikieuImages);
  const ngoaikieuFiles = [...parseFiles(ngoaikieuImages)];
  const nenkinFiles = [...parseFiles(nenkinImages)];
  const hoChieuFiles = [...parseFiles(hoChieuImages)];
  const giayNganHangFiles = [...parseFiles(giayNganHangImages)];
  const hosoMeta = `""${JSON.stringify(hosoMetaData)}""`;
  //console.log(ngoaikieuFiles, nenkinFiles, hoChieuFiles, giayNganHangFiles);
  const queryUpdateString = {
    query: `
      mutation updateHsAnhNgoaiKieuMutation($anhngoaikieuFiles : [Upload], 
                                            $nenkinFiles : [Upload],
                                            $hoChieuFiles : [Upload],
                                            $giayNganHangFiles : [Upload]
                                            ) {
        updateUser(
          input: {id: "${id}", 
                  hosoNenkinAnhNgoaiKieu: $anhngoaikieuFiles,
                  hosoNenkinAnhNenkin: $nenkinFiles,
                  hosoNenkinAnhHoChieu: $hoChieuFiles,
                  hosoNenkinAnhXacNhanNganHang: $giayNganHangFiles,
                  hosoMetaData: "${hosoMeta}"}
        ) {
          clientMutationId
          user {
            hosoNenkinAnhNgoaiKieu
            hosoNenkinAnhNenkin
            hosoNenkinAnhHoChieu
            hosoNenkinAnhXacNhanNganHang
          }
        }
      }
    `,
    variables: {
      anhngoaikieuFiles : ngoaikieuFiles.map(file => null),
      nenkinFiles : nenkinFiles.map(file => null),
      hoChieuFiles : hoChieuFiles.map(file => null),
      giayNganHangFiles : giayNganHangFiles.map(file => null)          
    },
  };
const fd = new FormData();
fd.append("operations", JSON.stringify(queryUpdateString));
const variables1 = parseFilesMapFormData(fd, 'anhngoaikieuFiles', ngoaikieuFiles, 0);
const variables2 = parseFilesMapFormData(fd, 'nenkinFiles', nenkinFiles, ngoaikieuFiles.length);
const variables3 = parseFilesMapFormData(fd, 'hoChieuFiles', hoChieuFiles, sum([nenkinFiles.length, ngoaikieuFiles.length]));
const variables4 = parseFilesMapFormData(fd, 'giayNganHangFiles', giayNganHangFiles, sum([nenkinFiles.length, ngoaikieuFiles.length, hoChieuFiles.length]));
fd.append("map", JSON.stringify(Object.assign(variables1, variables2, variables3, variables4)));
const res = await fetch(process.env.WP_API_URL, {
    method: 'POST',
    body: fd
});
const json = await res.json();
if (json.errors) { 
    return json.errors;
}
return json.data;
}