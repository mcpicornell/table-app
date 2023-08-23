"use client";
import { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEventById, getNumberEvents } from "../../features/apiCall";
import { Progress } from "@/components/ui/progress";

export default function Event({ params }) {
  const [eventObj, setEventObj] = useState();
  const router = useRouter();
  const eventId = params.id[0];
  const [numberEvents, setNumberEvents] = useState();

  useEffect(() => {
    if (!eventObj) {
      const fetchEvents = async () => {
        const fetchedEvent = await getEventById(eventId);
        if (fetchedEvent) {
          setEventObj(fetchedEvent);
        }
      };
      fetchEvents();
    } else if (!numberEvents) {
      const fetchNumberEvents = async () => {
        const responseNumberEvents = await getNumberEvents();
        if (responseNumberEvents) {
          setNumberEvents(responseNumberEvents);
        }
      };
      fetchNumberEvents();
    }
  }, [eventObj, numberEvents]);

  const prevEvent = () => {
    if (eventId == 1) {
      return eventId;
    }
    return parseInt(eventId) - 1;
  };
  const nextEvent = () => {
    if (eventId == numberEvents) {
      return eventId;
    }
    return parseInt(eventId) + 1;
  };

  const navToPrevEvent = prevEvent();
  const navToNextEvent = nextEvent();

  return (
    <Container>
      <div class="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-lg">
        {!eventObj && !numberEvents ? (
          <Progress value={5} />
        ) : (
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 rounded-lg shadow-lg">
            <div className="text-white">
              <p className="text-2xl font-semibold">Event: {eventObj.id}</p>
              <p className="mt-2 text-gray-300">Date: {eventObj.date}</p>
              <p className="mt-1 text-gray-300">
                Location: {eventObj.location}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-white text-lg">Description:</p>
              <p className="mt-2 text-gray-300">{eventObj.description}</p>
            </div>
          </div>
        )}
      </div>
      {!eventObj && !numberEvents ? (
        <Progress value={5} />
      ) : (
        <ButtonsContainer>
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push(`/events/${navToPrevEvent}`)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.push(`/events/${navToNextEvent}`)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </ButtonsContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
  position: relative;
`;
const ButtonsContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  bottom: 120px;
`;
