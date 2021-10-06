export function getUrlParams(url: string): any {
  const params: any = {}
  const query = url.split('?')[1]
  query.split('&').forEach((pair) => {
    const ary = pair.split('=')
    params[ary[0]] = ary[1]
  })
  return params
}
