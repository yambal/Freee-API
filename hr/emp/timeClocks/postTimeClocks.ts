import {hrRequest} from "../../hrRequst"
import {FreeeApiError} from "../../hrTypes"
import {TimeClockType} from "../../hrTypes"
import {getDateString, getDateTimeString} from "../../../utility/dateUtility"
import * as functions from "firebase-functions";
import { AxiosError, AxiosResponse } from "axios";

export const postTimeClocks = (token: string, companyId: number, employeeId: number, type: TimeClockType, baseDate?: string): Promise<any> => {
  return new Promise((resolve, reject:(error: FreeeApiError) => void) => {
    const now = new Date()
    const date = baseDate || getDateString("Ja-jp", now)
    const dateTime = getDateTimeString(now)

    functions.logger.info("postTimeClocks", {
      type,
      date,
      dateTime
    })

    hrRequest(token)
    .post(`/employees/${employeeId}/time_clocks`, {
      "company_id": companyId,
      "type": type,
      "base_date": date,
      "datetime": dateTime
    })
    .then((data: AxiosResponse) => {
      functions.logger.info("postTimeClocks", data)
      resolve(data) // TODO: 不完全
    })
    .catch((error: AxiosError) => {
      functions.logger.error("error 28@postTimeClocks", error)
      reject({
        errorMessage: error.message,
        message: error.response?.data.message
      })
    })
  })

}