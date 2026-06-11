import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
    relativeTime: {
        future: "за %s",
        past: "%s",
        s: "декілька сек тому",
        m: "1 хв тому",
        mm: "%d хв тому",
        h: "1 год тому",
        hh: "%d год тому",
        d: "1 дн тому",
        dd: "%d дн тому",
        M: "1 міс тому",
        MM: "%d міс тому",
        y: "1 р тому",
        yy: "%d р тому",
    },
});

export default dayjs;