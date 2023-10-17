export default function formatLocalDate(inputDate) {
    const date = new Date(inputDate);

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(date);
}

export function formatDateToCustomString(inputDate) {
    const date = new Date(inputDate);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    return date.toLocaleDateString(undefined, options);
}

export function dateRegexFormatter(inputDate) {
    const dateObject = new Date(inputDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}T`;
}

export const formatTime = (time) => {
    const timeObject = new Date(`2023-01-01 ${time}`);
    const formattedTime = timeObject.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const time24hr = timeObject.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
    });

    return {
        formatted: formattedTime,
        value: time24hr,
    };
};

export const generateTimeRange = (startHour, endHour, intervalMinutes) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
            const hour12 = hour >= 12 ? "PM" : "AM";
            const hour12Display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
            const time = `${hour12Display.toString().padStart(2, "0")}:${
                minutes === 0 ? "00" : minutes
            } ${hour12}`;
            times.push(time);
        }
    }
    return times;
};
