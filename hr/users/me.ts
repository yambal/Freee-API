import { AxiosError } from "axios";
import * as functions from "firebase-functions";
import {hrRequest} from "../hrRequst";
import { FreeeApiError, HrUser } from "../hrTypes"

export const hrGetMe = (token: string): Promise<HrUser> => {
  return new Promise((resolve: (user: HrUser) => void, reject:(error: FreeeApiError) => void) => {
    return hrRequest(token).get("/users/me")
    .then((response) => {
      functions.logger.debug("response", response.data)
      const me: HrUser = response.data
      resolve(me)
    })
    .catch((error: AxiosError) => {
      functions.logger.error("error 33@Me", error)
      const apiError: FreeeApiError = {
        errorMessage: error.message,
        message: error.response?.data.message
      }
      reject(apiError)
    })
  })

}
