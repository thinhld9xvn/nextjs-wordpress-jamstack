import { parseFiles, parseFilesMapFormData, sum } from "./update-hosonenkin";

export async function UpdateHoSoHoanThue(props) {
    const {id, ngoaikieuImages, gensenImages, hoChieuImages, giayChuyenTienImages, 
            giayPhungDuongImages, myNumberImages, soTTTaiKhoanImages, hosoMetaData} = props;
    //console.log(ngoaikieuImages);
    const ngoaikieuFiles = [...parseFiles(ngoaikieuImages)];
    const gensenFiles = [...parseFiles(gensenImages)];
    const hoChieuFiles = [...parseFiles(hoChieuImages)];
    const giayChuyenTienFiles = [...parseFiles(giayChuyenTienImages)];
    const giayPhungDuongFiles = [...parseFiles(giayPhungDuongImages)];
    const myNumberFiles = [...parseFiles(myNumberImages)];
    const soTTTaiKhoanFiles = [...parseFiles(soTTTaiKhoanImages)];
    const hosoMeta = `""${JSON.stringify(hosoMetaData)}""`;
    //console.log(ngoaikieuFiles, nenkinFiles, hoChieuFiles, giayNganHangFiles);
    const queryUpdateString = {
      query: `
        mutation updateHsAnhNgoaiKieuMutation($anhngoaikieuFiles : [Upload], 
                                              $gensenFiles : [Upload],
                                              $hoChieuFiles : [Upload],
                                              $giayChuyenTienFiles : [Upload],
                                              $giayPhungDuongFiles : [Upload],
                                              $myNumberFiles : [Upload],
                                              $soTTTaiKhoanFiles : [Upload]
                                              ) {
          updateUser(
            input: {id: "${id}", 
                    hosoHoanThueAnhNgoaiKieu: $anhngoaikieuFiles,
                    hosoHoanThueAnhGensen: $gensenFiles,
                    hosoHoanThueAnhHoChieu: $hoChieuFiles,
                    hosoHoanThueGiayChuyenTien: $giayChuyenTienFiles,
                    hosoHoanThueGiayPhungDuong: $giayPhungDuongFiles,
                    hosoHoanThueMyNumber: $myNumberFiles,
                    hosoHoanThueSoTTTaiKhoan: $soTTTaiKhoanFiles,
                    hosoMetaData: "${hosoMeta}"}
          ) {
            clientMutationId
            user {
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
        anhngoaikieuFiles : ngoaikieuFiles.map(file => null),
        gensenFiles : gensenFiles.map(file => null),
        hoChieuFiles : hoChieuFiles.map(file => null),
        giayChuyenTienFiles : giayChuyenTienFiles.map(file => null),
        giayPhungDuongFiles : giayPhungDuongFiles.map(file => null),
        myNumberFiles : myNumberFiles.map(file => null),
        soTTTaiKhoanFiles : soTTTaiKhoanFiles.map(file => null),
      },
    };
  const fd = new FormData();
  let n = 0;
  fd.append("operations", JSON.stringify(queryUpdateString));
  const variables1 = parseFilesMapFormData(fd, 'anhngoaikieuFiles', ngoaikieuFiles, 0);
  const variables2 = parseFilesMapFormData(fd, 'gensenFiles', gensenFiles, ngoaikieuFiles.length);
  n = sum([gensenFiles.length, ngoaikieuFiles.length]);
  const variables3 = parseFilesMapFormData(fd, 'hoChieuFiles', hoChieuFiles, n);
  n = sum([n, hoChieuFiles.length]);
  const variables4 = parseFilesMapFormData(fd, 'giayChuyenTienFiles', giayChuyenTienFiles, n);
  n = sum([n, giayChuyenTienFiles.length]);
  const variables5= parseFilesMapFormData(fd, 'giayPhungDuongFiles', giayPhungDuongFiles, n);
  n = sum([n, giayPhungDuongFiles.length]);
  const variables6= parseFilesMapFormData(fd, 'myNumberFiles', myNumberFiles, n);
  n = sum([n, myNumberFiles.length]);
  const variables7= parseFilesMapFormData(fd, 'soTTTaiKhoanFiles', myNumberFiles, n);
  fd.append("map", JSON.stringify(Object.assign(variables1, variables2, variables3, variables4, variables5, variables6, variables7)));
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