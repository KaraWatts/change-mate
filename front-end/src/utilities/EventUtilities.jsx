import { api } from "../utilities";

export const getEventDetails = async (eventID) => {
    const response = await api.get(`events/${eventID}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsAllFilters = async (searchLocation, searchDateStart, searchDateEnd, searchEventType, searchType, searchTerm) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&end_date=${searchDateEnd}&type=${searchEventType}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsNoEventType = async (searchLocation, searchDateStart, searchDateEnd, searchType, searchTerm) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&end_date=${searchDateEnd}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsAllFiltersExactDate = async (searchLocation, searchDateStart, searchEventType, searchType, searchTerm) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&type=${searchEventType}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsNoLocation = async (searchDateStart, searchDateEnd, searchEventType, searchType, searchTerm) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&end_date=${searchDateEnd}&type=${searchEventType}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsNoSearchTermSearchType = async (searchLocation, searchDateStart, searchDateEnd, searchEventType) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&end_date=${searchDateEnd}&type=${searchEventType}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocExactDateSearchTermSearchType = async (searchLocation, searchDateStart, searchType, searchTerm) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocEventTypeSearchTermSearchType = async (searchLocation, searchEventType, searchType, searchTerm) => {
    const response = await api.get(`events/?location=${searchLocation}&type=${searchEventType}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsDateRangeSearchTermSearchType = async (searchDateStart, searchDateEnd, searchType, searchTerm) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&end_date=${searchDateEnd}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocDateRange = async (searchLocation, searchDateStart, searchDateEnd) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&end_date=${searchDateEnd}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocExactDateEventType = async (searchLocation, searchDateStart, searchEventType) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}&type=${searchEventType}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocSearchTermSearchType = async (searchLocation, searchType, searchTerm) => {
    const response = await api.get(`events/?location=${searchLocation}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsDateRangeEventType = async (searchDateStart, searchDateEnd, searchEventType) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&end_date=${searchDateEnd}&type=${searchEventType}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsExactDateSearchTermSearchType = async (searchDateStart, searchType, searchTerm) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsEventTypeSearchTermSearchType = async (searchEventType, searchType, searchTerm) => {
    const response = await api.get(`events/?type=${searchEventType}&${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocExactDate = async (searchLocation, searchDateStart) => {
    const response = await api.get(`events/?location=${searchLocation}&start_date=${searchDateStart}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocEventType = async (searchLocation, searchEventType) => {
    const response = await api.get(`events/?location=${searchLocation}&type=${searchEventType}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsDateRange = async (searchDateStart, searchDateEnd) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&end_date=${searchDateEnd}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsExactDateEventType = async (searchDateStart, searchEventType) => {
    const response = await api.get(`events/?start_date=${searchDateStart}&type=${searchEventType}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsSearchTermSearchType = async (searchType, searchTerm) => {
    const response = await api.get(`events/?${searchType}=${searchTerm}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsLocation = async (searchLocation) => {
    const response = await api.get(`events/?location=${searchLocation}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsExactDate = async (searchDateStart) => {
    const response = await api.get(`events/?start_date=${searchDateStart}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const getEventDetailsEventType = async (searchEventType) => {
    const response = await api.get(`events/?type=${searchEventType}`);
    let eventDetails = response.data;
    return eventDetails;
};

export const postEventDetails = async (title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink, location, eventCoordinates) => {
    let response = await api.post("events/", {
        "title" : title,
        "event_start" : eventStart,
        "event_end" : eventEnd,
        "time_zone" : timeZone,
        "event_type" : eventType,
        "event_venue" : eventVenue,
        "event_venue_address" : eventVenueAddress,
        "description" : description,
        "category" : category,
        "event_photo" : eventPhoto,  // Set up as a base64 for the backend 
		"virtual_event_link": virtualEventLink,
        "location": location,
        "Coordinates": eventCoordinates,
    });
    if (response.status === 201) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

export const setUserAttending = async (eventID, usersAttending) => {
    let response = await api.put(`events/${eventID}/`, {
        "users_attending" : usersAttending
    });
    if (response.status === 200) {
        return true;
    } else {
        console.log("error:", response.data);
    }
};

//wrapped in a try catch and additional console.logs for better error handling
export const updateEventDetails = async (eventID, title, eventStart, eventEnd, timeZone, eventType, eventVenue, eventVenueAddress, description, category, eventPhoto, virtualEventLink, location, eventCoordinates) => {
    try {
        let response = await api.put(`events/${eventID}/`, {
            "title": title,
            "event_start": eventStart,
            "event_end": eventEnd,
            "time_zone": timeZone,
            "event_type": eventType,
            "event_venue": eventVenue,
            "event_venue_address": eventVenueAddress,
            "description": description,
            "category": category,
            "event_photo": eventPhoto,
            "virtual_event_link": virtualEventLink || null,  //to satisfy backend requirements 
            "location": location,
            "Coordinates": eventCoordinates || "" //to satisfy backend requirements 
        });
        console.log(response.status);
        if (response.status === 200) {
            return true;
        } else {
            console.log("Error Status:", response.status);
            console.log("Error Data:", response.data);
            return false;
        }
    } catch (error) {
        console.error("Exception when updating event details:", error);
        return false;
    }
};


export const deleteEvent = async (eventID, event) => {
    const response = await api.delete(`events/${eventID}/`, {
        event
    });
    if (response.status === 204) {
        return true;
    }
}


export const getiCalEventDetails = async (eventID) => {
  const response = await api.get(`events/${eventID}/iCal/`);
  let eventDetails = response.data;
  return eventDetails;
};

// the goal is make this into an API call to call the backend view get_timezone
export const timeZoneAbbreviations = [
    "America/Adak",
    "America/Anchorage",
    "America/Chicago",
    "America/Denver",
    "America/Halifax",
    "America/Los_Angeles",
    "America/New_York",
    "America/Noronha",
    "America/St_Johns",
    "Asia/Bangkok",
    "Asia/Dhaka",
    "Asia/Dubai",
    "Asia/Istanbul",
    "Asia/Kabul",
    "Asia/Karachi",
    "Asia/Kathmandu",
    "Asia/Kolkata",
    "Asia/Tehran",
    "Atlantic/Azores",
    "Europe/Kiev",
    "Europe/Lisbon",
    "Europe/London",
    "Europe/Moscow",
    "Europe/Paris",
    "GMT",
    "Pacific/Honolulu",
    "Pacific/Niue",
  ];
  
  