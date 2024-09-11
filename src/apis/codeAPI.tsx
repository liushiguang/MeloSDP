import { APIS } from "./baseAPI";
import { httpInstance } from "@/utils/http";

export function codeTest(formData:FormData): Promise<Result<string[]>> {
    return  httpInstance.request(
        {
            url:APIS.code_test,
            method:'POST',
            data:formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
}
