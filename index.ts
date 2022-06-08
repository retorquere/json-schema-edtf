// see https://rawgit.com/zaggino/z-schema/master/benchmark/results.html for a list of schema engines

import { parse } from 'edtf'

export function validate(date, options) {
  if (typeof date !== 'string') return false

  try {
    parse(date, options)
    return true
  } catch (err) {
    return false
  }
}

/**
 * Formats to be used in `{ type: 'string', format: 'edtf/level-1' }` type JSON schemas
 */
export type Format = 'edtf/level-0' | 'edtf/level-1' | 'edtf/level-2' | 'edtf/level-0+season-intervals' | 'edtf/level-1+season-intervals' | 'edtf/level-2+season-intervals'
export type Validator = (date: string) => boolean
export const formats: Record<Format, Validator> = {
  'edtf/level-0': (date: string) => validate(date, { level: 0 }),
  'edtf/level-1': (date: string) => validate(date, { level: 1 }),
  'edtf/level-2': (date: string) => validate(date, { level: 2 }),
  'edtf/level-0+season-intervals': (date: string) => validate(date, { level: 0, seasonIntervals: true }),
  'edtf/level-1+season-intervals': (date: string) => validate(date, { level: 1, seasonIntervals: true }),
  'edtf/level-2+season-intervals': (date: string) => validate(date, { level: 2, seasonIntervals: true }),
}
