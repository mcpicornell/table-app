"use client";
import { useEffect } from "react";
import { useState } from "react";
import { getEvents } from "./features/apiCall";
import { useRouter } from "next/navigation";

export default function Home() {
  const [eventsData, setEventsData] = useState();
  const router = useRouter();
  const [originalEventsData, setOriginalEventsData] = useState();

  useEffect(() => {
    if (!eventsData) {
      const fetchEvents = async () => {
        const fetchedEvents = await getEvents();
        console.log(fetchEvents);
        if (fetchedEvents) {
          setEventsData(fetchedEvents);
          setOriginalEventsData(fetchedEvents);
        }
      };
      fetchEvents();
    }
  }, [eventsData]);

  const filterOnChange = (event) => {
    const value = event.target.value;
    if (originalEventsData) {
      const filteredData = originalEventsData.filter((element) => {
        const eventObj = element.name.toLocaleLowerCase();
        return eventObj.includes(value.toLowerCase());
      });
      setEventsData(filteredData);
    } else if (!value) {
      setEventsData(originalEventsData);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Event Table</h1>
        <input
          type="text"
          placeholder="Search by name"
          className="p-2 rounded-md border border-gray-300 bg-white text-gray-800"
          onChange={filterOnChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Description</th>
            </tr>
          </thead>
          <tbody>
            {eventsData?.map((event) => (
              <tr
                key={event.id}
                id="row"
                className="border-b border-gray-300 cursor-pointer transition-colors hover:bg-gray-100"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                <td className="py-2 px-4 text-center">{event.id}</td>
                <td className="py-2 px-4 text-center">{event.name}</td>
                <td className="py-2 px-4 text-center">{event.date}</td>
                <td className="py-2 px-4 text-center">{event.location}</td>
                <td className="py-2 px-4 text-center">{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
