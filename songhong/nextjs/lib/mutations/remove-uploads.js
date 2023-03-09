import { fetchAPI } from "@lib/api";

export async function removeAttachmentUpload({ userId, galleryKey, identify, hosoMetaData }) {
    const hosoMeta = `""${JSON.stringify(hosoMetaData)}""`;
    return await fetchAPI(
        `mutation removeUpload {
            removeUploadHosoUser(input: {
                userId: ${userId}, 
                galleryKey: "${galleryKey}", 
                identify: "${identify}",
                hosoMetaData: "${hosoMeta}"}) {
                    data
            }
        }`
    );
}