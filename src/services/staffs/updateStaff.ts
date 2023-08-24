import { Staff } from '@/types/staff'
import fetcher from '@/utils/fetcher'

export type updateStaffParams = {
  staff: Staff
}

export const updateStaff = async ({
  staff,
}: updateStaffParams): Promise<Staff> => {
  return await fetcher(`/api/system/staff/${staff.id}`, {
    method: 'PUT',
    body: staff,
  }).then(({ data }) => data)
}
