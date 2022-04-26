import request from "@/utils/request";
// import { request } from "umi";

export async function testTest (robotId) {
  return request(`/api2/robot/query/${robotId}/status`, {
    method: 'GET',
    //   params: { pageNum, pageSize }
  });
}

export async function testTable (params) {
  return request('/api/rule', {
    method: 'GET',
    // params: { current, pageSize },
    params: { ...params }
  });
}