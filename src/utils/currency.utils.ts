/**
 *
 * @param units
 * @param nano
 * @example Пример использования:
 * const amount = combinePrice('0', 126300000); // Результат: 0.1263
 */
export function combinePrice(units: string, nano: number): number {
  const unitsNum = parseInt(units, 10);
  const sign = Math.sign(unitsNum) || 1; // Учитываем знак (если units = 0, берём знак nano)
  const nanoAdjusted = sign * Math.abs(nano) / 1e9; // Делим на 1 миллиард (10^9)
  return unitsNum + nanoAdjusted;
}
