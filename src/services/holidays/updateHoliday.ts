import { Holiday } from '@/types/holiday'
import fetcher from '@/utils/fetcher'

export type updateHolidayParams = {
  holiday: Holiday
}

const updateHoliday = async ({
  holiday,
}: updateHolidayParams): Promise<Holiday> => {
  return await fetcher(`/api/system/holiday/${holiday.id}`, {
    method: 'PUT',
    body: holiday,
  }).then(({ data }) => data)
}

export default updateHoliday
