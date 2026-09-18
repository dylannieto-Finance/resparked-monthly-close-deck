/**
 * Converts a 0-indexed column index to Spreadsheet column letter (e.g. 0 -> A, 25 -> Z, 26 -> AA, 43 -> AR)
 */
export function getColumnLetter(colIndex: number): string {
  let letter = '';
  let temp = colIndex;

  while (temp >= 0) {
    letter = String.fromCharCode((temp % 26) + 65) + letter;
    temp = Math.floor(temp / 26) - 1;
  }

  return letter;
}
