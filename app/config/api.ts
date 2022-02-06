import useSWR from 'swr';
import * as SecureStore from 'expo-secure-store';

import { API_ENDPOINT } from '../../env.json';

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';
export async function callAPI(url: string, method: Method, body: any) {
  const token = (await SecureStore.getItemAsync('token')) ?? '';
  const res = await fetch(`${API_ENDPOINT}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` ?? '',
    },
    body: JSON.stringify(body),
  });
  return res;
}

export function useGetRequest(url: string) {
  return useSWR(url, (u: string) =>
    callAPI(u, 'GET', undefined).then((res) => res.json()),
  );
}
