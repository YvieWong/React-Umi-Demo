import allRoute from '../../config/routes'

/**
 * 
 * @param {String} path 需要解析的页面路径
 * @returns 返回与之匹配的整个路径对象
 */
function getTotalRouter (path, routes) {
  let temRoutes;
  if (!routes) {
    temRoutes = allRoute
  } else {
    temRoutes = routes
  }
  const data = temRoutes.find(item => {
    if (item.path === path) {
      return item
    } else if (item.children && item.children.length > 0) {
      let result = getTotalRouter(path, item.children)
      if (result) return result
    }
  })
  return data ? data : null
}

export { getTotalRouter }