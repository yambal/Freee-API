import {hrRequest} from "../../hrRequst"
import {getDateString} from "../../../utility/dateUtility"
import { AxiosError, AxiosResponse } from "axios"
import * as functions from "firebase-functions";
import {FreeeApiError} from "../../hrTypes"

/**
 * 指定した従業員・日付の勤怠情報を返します。
 * @param token 
 * @param company_id 
 * @param employee_id 
 * @returns 
 */
export const getWorkRecoads = (token: string, company_id: number, employee_id: number): Promise<any> => {
  const date = getDateString("Ja-jp", new Date())
  return new Promise((resolve, reject: (error: FreeeApiError) => void) => {
    hrRequest(token, {
      company_id
    })
    .get(`/employees/${employee_id}/work_records/${date}`, {})
    .then((response: AxiosResponse) => {
      resolve(response.data) // TODO: 不完全
    })
    .catch((error: AxiosError) =>{
      functions.logger.error("error 25@getWorkRecoads", error)
      reject({
        errorMessage: error.message,
        message: error.response?.data.message
      })
    })
  })
}