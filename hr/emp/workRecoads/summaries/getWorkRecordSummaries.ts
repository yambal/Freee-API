import {hrRequest} from "../../../hrRequst"
import {getYear, getMonth} from "../../../../utility/dateUtility"
import { AxiosError, AxiosResponse } from "axios"
import * as functions from "firebase-functions";
import {FreeeApiError, WorkRecordSummaries} from "../../../hrTypes"

export const getWorkRecordSummaries = (token: string, company_id: number, employee_id: number): Promise<WorkRecordSummaries> => {
  return new Promise((resolve: (workRecordSummaries: WorkRecordSummaries) => void, reject: (error: FreeeApiError) => void ) => {

    const now = new Date()
    const YeatMonthPath = `${getYear(now)}/${getMonth(now)}`

    hrRequest(token, {
      company_id,
      work_records: true
    })
    .get(`/employees/${employee_id}/work_record_summaries/${YeatMonthPath}`)
    .then((response: AxiosResponse) => {
      resolve(response.data)
    })
    .catch((error: AxiosError)=> {
      functions.logger.error("error 25@workRecordSummaries", error) 
      reject({
        errorMessage: error.message,
        message: error.response?.data.message
      })
    })
  })
}