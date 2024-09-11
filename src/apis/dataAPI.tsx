import { APIS } from "./baseAPI";
import { httpInstance } from "@/utils/http";

export function dataTest(formData: FormData): Promise<Result<DataTypes[]>> {
    return httpInstance.request({
        url: APIS.data_test, 
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}