
// date formatter for log outputs
function prefix0(val: string | number, count: number, char: string = '0') {
  const valStr = val.toString();
  const places = count - valStr.length;
  return Array.apply(null, { length: Math.max(valStr.length, count) }).map((_: undefined, i: number) => i < places ? char[0] : valStr[ i - places ]).join('');
}

function postfix0(val: string | number, count: number, char: string = '0') {
  const valStr = val.toString();
  return Array.apply(null, { length: Math.max(valStr.length, count) }).map((_: undefined, i: number) => i < valStr.length ? valStr[i] : char[0]).join('');
}

let lCounter = 0;
export function formatLogDate(dt: Date) {
  return `${ prefix0(++lCounter, 3)}. ${ dt.toLocaleTimeString('fr') }.${ postfix0(dt.getMilliseconds(), 3) }`;
}

export function setUpFocusWatcher() {
  document.addEventListener('focusin', e => {
    // tslint:disable-next-line no-console
    console.log(formatLogDate(new Date()), '-', 'focusin:', e.target);
  });

  document.addEventListener('focusout', e => {
    // tslint:disable-next-line no-console
    console.log(formatLogDate(new Date()), '-', 'focusout:', e.target);
  });
}
