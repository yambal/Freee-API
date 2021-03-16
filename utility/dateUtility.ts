import * as functions from "firebase-functions";

type PartsObj = {
  day: string
  dayPeriod: string
  era: string
  fractionalSecond: string
  hour: string
  literal: string
  minute: string
  month: string
  relatedYear: string
  second: string
  timeZoneName: string
  weekday: string
  year: string
  yearName: string
}

const getParts = (date: Date, locale: string):Intl.DateTimeFormatPart[] => {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tokyo"
  })
  return  formatter.formatToParts(date)
}

const getPartsObj = (date: Date, locale: string): PartsObj => {
  const parts = getParts(date, locale)
  functions.logger.info("parts", parts)

  const tmp: any = {}
  parts.forEach((part) => {
    tmp[part.type] = part.value 
  })

  functions.logger.info("tmp", tmp)
  const ret: PartsObj = tmp
  return ret
}

/**
 * Date から 2021-03-16 のようなStringに整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getDateString = (locale: string, date: Date): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return `${partsObj.year}-${partsObj.month}-${partsObj.day}`
}

/**
 * YYYY-MM-DD HH:MM:SS : Date から 2021-03-16 22:37:27 のようなStringに整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getDateTimeString = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return `${partsObj.year}-${partsObj.month}-${partsObj.day} ${partsObj.hour}:${partsObj.minute}:${partsObj.second}`
}

/**
 * YYYY : Date から 2021 のような String に整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getYear = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return partsObj.year
}

/**
 * MM : Date から 03 のような String に整形して返す
 * @param locale
 * @param date 
 * @returns 
 */
export const getMonth = (date: Date, locale?: string): string => {
  const partsObj = getPartsObj(date, locale || "Ja-jp")
  return partsObj.month
}

