// separate 3 by 3 digits of number with comma in english
export function numberWithCommasEn(number: number | string) {
  return Number(Number(number).toFixed(2)).toLocaleString();
}
