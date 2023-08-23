"use client";
import data from "../../dataEvents.json";

export const getEvents = async () => {
  try {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 200);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getEventById = async (id) => {
  try {
    const foundEvent = data.find((element) => element.id === parseInt(id));
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(foundEvent);
      }, 200);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getNumberEvents = async () => {
  try {
    let totalEvents = 0;
    for (let i = 0; i < data.length; i++) {
      totalEvents++;
    }
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(totalEvents);
      }, 200);
    });
  } catch (err) {
    console.log(err);
  }
};
