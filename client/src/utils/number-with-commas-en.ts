// separate 3 by 3 digits of number with comma in english
export function numberWithCommasEn(number: number | string | undefined) {
  if (!number) return "0";
  return Number(Number(number).toFixed(2)).toLocaleString();
}
