import { Holiday } from '@/types/holiday'
import fetcher from '@/utils/fetcher'

export type createHolidayParams = {
  holiday: Omit<Holiday, 'id'>
}

export const createHoliday = async ({
  holiday,
}: createHolidayParams): Promise<Holiday> => {
  return await fetcher(`/api/system/holiday`, {
    method: 'POST',
    body: holiday,
  }).then(({ data }) => data)
}
