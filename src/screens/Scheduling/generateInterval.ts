

import { eachDayOfInterval, format, parseISO } from "date-fns";
import { DayProps } from "../../components/Calendar";
import theme from "../../styles/theme";
import { getPlataformDate } from "../../utils/getPlataformDate";

export function generateInterval(start: DayProps, end: DayProps) {
  let interval = {}

  eachDayOfInterval({
    start: parseISO(start.dateString),
    end: parseISO(end.dateString)
  }).forEach(item => {
    const date = format(getPlataformDate(item), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color: start.dateString === date || end.dateString === date ?
          theme.colors.main : theme.colors.main_light,
        textColor: start.dateString === date || end.dateString === date ?
          theme.colors.main_light : theme.colors.main,
      }
    }
  });

  return interval;
}