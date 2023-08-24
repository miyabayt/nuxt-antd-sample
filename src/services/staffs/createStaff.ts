import { Staff } from '@/types/staff'
import fetcher from '@/utils/fetcher'

export type createStaffParams = {
  staff: Omit<Staff, 'id'>
}

export const createStaff = async ({
  staff,
}: createStaffParams): Promise<Staff> => {
  return await fetcher(`/api/system/staff`, {
    method: 'POST',
    body: staff,
  }).then(({ data }) => data)
}
