import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { getEventDetails } from "../utilities/EventUtilities";
import DetailedEventCard from "../components/DetailedEventCard";
import TodoList from "../components/ToDoList";
import DiscussionForum from "../components/DiscussionForum";
import { Button, Drawer, Box, IconButton } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';

function EventCollab() {
  const [eventDetails, setEventDetails] = useState({});
  const { eventID } = useParams();
  const collabPost = "collaborators";
  const [showMenu, setShowMenu] = useState(true);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  console.log(eventDetails)

  useEffect(() => {
    const handleResize = () => {
      // Hide the todo list if the screen width is less than or equal to a certain threshold
      if (window.innerWidth <= 1400) {
        setOpen(false)
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize handler initially
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // TODO - set trigger on useparams
  useEffect(() => {
    getEvent();
  }, []);

  const getEvent = async () => {
    const eventDetails = await getEventDetails(eventID);
    setEventDetails(eventDetails);
    console.log(eventDetails);
  };
  const showAddToDo = false;


  return (
    <Container fluid className="event-collab-container">
      <Row className="gx-5">
        {/* conditionally format column widths based on showMenu state */}
        <Col sm={12} md={12} lg={4} xl={showMenu ? 3 : 4}>
          {eventDetails.hosts && <DetailedEventCard {...eventDetails} />}
        </Col>
        <Col
          sm={12}
          md={12}
          lg={7}
          xl={showMenu ? 6 : 7}
          className="discussion-forum-col p-0"
        >
          {eventDetails.hosts && (
            <DiscussionForum
              eventDetails={eventDetails}
              postType={collabPost}
            />
          )}
        </Col>
        {showMenu ? (
          <Col
            sm={12}
            md={0}
            lg={3}
            xl={3}
            className="todo-partipants-col d-flex justify-content-end"
          >
            {eventDetails.hosts && (
              <TodoList setShowMenu={setShowMenu} showAddToDo={showAddToDo} approvedVolunteers={[]} hosts={null}/>
            )}
          </Col>
        ) : <Box position="relative" >
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <IconButton 
                style={{
                position: 'absolute',
                top: 0,
                left: 0,
                }}
                onClick={toggleDrawer(false)}>
                    <CloseIcon />
                 </IconButton>
                {<TodoList setShowMenu={setShowMenu} showAddToDo={showAddToDo} approvedVolunteers={[]} hosts={null} />}
            </Drawer>
        </Box>}
      </Row>
        {!showMenu && <Box
        position= "fixed"
        top="40%"
        right="0"
        margin="0"
        display="flex"
        alignItems="center"
        >
            <Button
            variant="outlined"
            margin="0"
            style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'bottom right',
            }}
            onClick={toggleDrawer(!open)}
            >
            To-Do List
            <ExpandLessIcon />
            </Button>
        </Box>}
    </Container>
  );
}

export default EventCollab;
