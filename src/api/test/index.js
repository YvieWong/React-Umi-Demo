import request from "@/utils/request";

export async function testTest (pageNum, pageSize) {
  return request('/api2/manage/exceptions1/-', {
    method: 'GET',
    params: { pageNum, pageSize }
  });
}

export async function testTable (params, options) {
  return request('/api/rule', {
    method: 'GET',
    // params: { current, pageSize },
    params: { ...params },
    ...(options || {}),
  });
}