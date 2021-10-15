export function getUrlParams(url: string): any {
  const params: any = {}
  const ary = url.split('?')
  if (ary.length >= 2) {
    ary[1].split('&').forEach((pair) => {
      const ary = pair.split('=')
      params[ary[0]] = ary[1]
    })
  }

  return params
}
