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

type Validator = (date: string) => boolean
export const formats: Record<string, Validator> = {}
for (const _seasonIntervals of [false, true]) {
  for (const _level of [0, 1, 2]) {
    ((level, seasonIntervals) => {
      const fmt = `edtf/level-${level}${seasonIntervals ? '+season-intervals' : ''}`
      formats[fmt] = date => validate(date, { level, seasonIntervals })
    })(_level, _seasonIntervals)
  }
}
