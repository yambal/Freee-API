import {hrRequest} from "../../hrRequst"
import {FreeeApiError, EmployeeTimeClock} from "../../hrTypes"
import * as functions from "firebase-functions";
import { AxiosError } from "axios";



/**
 * 指定した従業員・期間の打刻情報を返します。
 * デフォルトでは従業員の当月の打刻開始日から当日までの値が返ります。
 * @param token 
 * @param employee_id 
 * @returns 
 */

export const getTimeClocks = (token: string, company_id: number, employee_id: number): Promise<any> => {
  return new Promise((resolve: (timeClocks: EmployeeTimeClock[]) => void, reject:(error: FreeeApiError) => void) => {
    return hrRequest(token, {
      company_id
    }).get(`/employees/${employee_id}/time_clocks`)
    .then((response) => {
      resolve(response.data)
    })
    .catch((error: AxiosError) => {
      functions.logger.error("error 31", error)
      reject({
        errorMessage: error.message,
        message: error.response?.data.message
      })
    })
  })
}