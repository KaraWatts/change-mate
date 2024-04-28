import { Container, Col, Row, ListGroup, Card, Button, ListGroupItem } from "react-bootstrap";
import { useParams, Link, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import "add-to-calendar-button";
import { getEventDetails, setUserAttending } from "../utilities/EventUtilities";
import { getUserProfile } from "../utilities/UserProfileUtilities";
import { getEventIcon } from '../utilities/DefaultIconsUtilities';
import { getiCalEventDetails } from "../utilities/EventUtilities";
import gps from "../assets/gps.jpg";
import DetailedEventCard from "../components/DetailedEventCard";
import VolunteerApplication from "../components/VolunteerApplication";
// import StaticMap from "../components/EventDetailsStaticMap";

export default function EventDetails() {
  let { eventID } = useParams();
  const { user } = useOutletContext();
  const [iCalDetails, setiCalDetails] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [usersAttending, setUsersAttending] = useState([]);
  const [eventsAttending, setEventsAttending] = useState([]);
  // event latitude and long for passing to static map component
  const latitude = eventDetails.lat;
  const longitude = eventDetails.lon;

  //application modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Gets list of events user is attending; Used in isUserAttending function
  const handleUserEventsAttending = async () => {
    let userResponse = await getUserProfile(user);
    let events = userResponse.events_attending
    setEventsAttending(events)
  };

  //gets iCal-specific format of event Details for add-to-personal-calendar button
  const getiCalInfo = async () => {
    const response = await getiCalEventDetails(eventID);
    setiCalDetails(response);
    // console.log("EVENT DETAILS page--iCal details:", iCalDetails);

  };


  // get event details using event utilities and set the event details
  const getEvent = async () => {
    const eventDetails = await getEventDetails(eventID);
    setEventDetails(eventDetails);
    // console.log("EVENT DETAILS page--event details:", eventDetails);

    setUsersAttending(eventDetails.users_attending);
    //---this is being handled on DetailedEventCard, leaving commented out in case we need it on this page later
      // map through collaborators to get their display names
      // let collabArr = eventDetails.collaborators;
      // let collaborators = collabArr.map((collab) => collab.display_name);
      // setCollaborators(collaborators);
      // console.log(eventDetails.data);
  };

  //consolidated useEffects on page
  useEffect(() => {
    getEvent();
    handleUserEventsAttending();
    getiCalInfo();
  }, []);

  // onClick function for RSVP button to handle rsvp api call
  const handleRSVP = async () => {
    const rsvp = await setUserAttending(eventID);
  };

  // Checks the events that the user is attending for id match with the eventID for this page
  const isUserAttending = () => {
    // Checks if eventsAttending has data
    if(eventsAttending && eventsAttending.length > 0) {
      // Loops through the events
      for (const event of eventsAttending) {
        // Makes comparison between the page's eventID and the user's event.id
        if (eventID == event.id) {
          // If match user is RSVPed
          return true
        }
      }
    } else {
      return false
    }
  };

  // Renders button conditionally based on if user is RSVPed
  const renderRSVPButton = () => {
    // Sets attending to true or false based on function call
    const attending = isUserAttending()
    // If attending render disabled button that tells the user they've already RSVPed
    
    //converted from button into a-tags for dropdown item
     return (   
    attending ? (
      <a>Attending</a>
    ) : (
      <a onClick={handleRSVP}>Attend</a>
    ))
  
  };

  const cardCSS = {width: "90vw", maxWidth: "800px"}

  return (

    <Container>
      <Row>
        <Col>
          <br />
          {eventDetails && (
            <DetailedEventCard
              eventDetails={eventDetails}
              cardCSS={cardCSS}
            ></DetailedEventCard>
          )}
          <div class="dropdown-container">
            <button class="dropdown-button">Count me in!</button>
            <div class="dropdown-content">
              {/* TODO: add conditonal rendering for volunteer option if event is accepting volunteers */}
              {/* added volunteer application modal as a component */}
              <a onClick={handleShow}>Volunteer</a>
              <VolunteerApplication show={show} handleClose={handleClose}  />
              {renderRSVPButton()} 
            </div>
          </div>
        </Col>

        {/*LOCATION IMG &&&& DIRECTIONS BUTTON */}
        <Col>
          <br />
          <Card style={{ width: "90vw", maxWidth: "300px" }} sm={4}>
            <Card.Img src={gps}></Card.Img>
          </Card>
          <Link to="/eventdirections">
            <button
              className="button-gradient text-center"
              variant="info"
              style={{ width: "90vw", maxWidth: "300px" }}
            >
              Get Event Directions
            </button>
          </Link>
          <add-to-calendar-button
            style={{ height: "50px" }}
            size="5"
            label="Add to personal calendar"
            options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
            name={iCalDetails.title}
            location={
              eventDetails.event_type === "Virtual"
                ? eventDetails.virtual_event_link
                : `${eventDetails.event_venue} - ${eventDetails.event_venue_address}`
            }
            startDate={iCalDetails.startDate}
            endDate={iCalDetails.endDate}
            startTime={iCalDetails.startTime}
            endTime={iCalDetails.endTime}
            timeZone={iCalDetails.time_zone}
            description={iCalDetails.description}
          ></add-to-calendar-button>
        </Col>
        {/* added static map component */}
        {/* <Col>
        <StaticMap latitude={ latitude } longitude={ longitude } />
        </Col> */}
      </Row>
    </Container>
  );
}
