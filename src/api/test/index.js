import request from "@/utils/request";

export async function testTest (pageNum, pageSize) {
  return request('/api2/manage/exceptions/-', {
    method: 'GET',
    params: { pageNum, pageSize }
  });
}