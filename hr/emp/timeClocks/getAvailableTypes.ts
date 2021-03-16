import {hrRequest} from "../../hrRequst"
import {FreeeApiError, AvailableTypes} from "../../hrTypes"
import * as functions from "firebase-functions";
import { AxiosError } from "axios";

/**
 * 指定した従業員・日付の打刻可能種別と打刻基準日を返します。
 * 例: すでに出勤した状態だと、休憩開始、退勤が配列で返ります。
 * @param token 
 * @param employee_id 
 * @returns 
 */

export const getAvailableTypes = (token: string, companyId: number, employeeId: number): Promise<AvailableTypes> => {
  return new Promise((resolve: (availableTypes: AvailableTypes) => void, reject:(error: FreeeApiError) => void) => {
    hrRequest(token, {
      company_id: companyId
    }).get(`/employees/${employeeId}/time_clocks/available_types`)
    .then((response) => {
      functions.logger.info("availableTypes", response.data)
      resolve(response.data)
    })
    .catch((error: AxiosError) => {
      functions.logger.error("error 31", error)
      reject( {
        errorMessage: error.message,
        message: error.response?.data.message
      })
    })
  })
}