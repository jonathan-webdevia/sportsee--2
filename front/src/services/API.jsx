import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:3000";

const ACTIVITY_BY_KIND = {
  1: "Cardio",
  2: "Energie",
  3: "Endurance",
  4: "Force",
  5: "Vitesse",
  6: "Intensité",
};

export function useSportSeeApi(service, userId) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const endpoint = getEndpointByService(service, userId);

  useEffect(() => {
    if (!endpoint) return;

    setIsLoading(true);

    async function fetchData() {
      try {
        const url = `${BASE_URL}/${endpoint}`;

        const response = await fetch(url);
        const data = await response.json();
        const extractedData = extractDataByService(data, service);

        setData(extractedData);
      } catch (err) {
        console.error(`An error occured while fetching ${endpoint} : ${err}`);

        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [service, userId, endpoint]);

  return { data, isLoading, error };
}

function getEndpointByService(service, userId) {
  switch (service) {
    case "activities":
      return `user/${userId}/performance`;

    case "average-sessions":
      return `user/${userId}/average-sessions`;

    case "daily-activity":
      return `user/${userId}/activity`;

    case "firstName":
      return `user/${userId}`;

    case "key-data":
      return `user/${userId}`;

    case "today-score":
      return `user/${userId}`;

    default:
      return null;
  }
}
function extractDataByService(data, service) {
  if (data) {
    switch (service) {
      case "activities":
        return getActivities(data.data.data);

      case "average-sessions":
        return getAverageSessions(data.data.sessions);

      case "daily-activity":
        return getDailyActivity(data.data.sessions);

      case "firstName":
        return getFirstName(data);

      case "key-data":
        return getKeyData(data);

      case "today-score":
        return getTodayScore(data);

      default:
        console.error(
          `extractDataByService error: service "${service}" is not defined.`
        );
        return;
    }
  }

  console.error("extractDataByService error: no data to process.");
  return;
}

export function getDefaultActivities() {
  const activities = [];

  for (let key in ACTIVITY_BY_KIND) {
    activities.push({
      activity: ACTIVITY_BY_KIND[key],
      value: 0,
    });
  }

  return activities;
}

function getActivities(userData) {
  const activities = [];

  if (userData) {
    for (let item of userData) {
      activities.push({
        activity: ACTIVITY_BY_KIND[item.kind],
        value: item.value,
      });
    }

    return activities;
  }

  return getDefaultActivities();
}

export function getDefaultAverageSessions() {
  const averageSessions = [
    {
      day: "L",
      sessionLength: 0,
    },
    {
      day: "M",
      sessionLength: 0,
    },
    {
      day: "M",
      sessionLength: 0,
    },
    {
      day: "J",
      sessionLength: 0,
    },
    {
      day: "V",
      sessionLength: 0,
    },
    {
      day: "S",
      sessionLength: 0,
    },
    {
      day: "D",
      sessionLength: 0,
    },
  ];

  return averageSessions;
}

function getAverageSessions(userData) {
  let averageSessions = getDefaultAverageSessions();

  for (let index in userData) {
    averageSessions[index].sessionLength = userData[index].sessionLength;
  }

  return averageSessions;
}

export function getDefaultDailyActivity() {
  const dailyActivity = [];

  let date = new Date(Date.now());

  // eslint-disable-next-line no-unused-vars
  for (let _ of "1234567") {
    let dateFr = new Intl.DateTimeFormat("fr").format(date);

    dailyActivity.push({
      day: dateFr.slice(0, 5),
      kilogram: 0,
      calories: 0,
    });

    date.setDate(date.getDate() - 1);
  }

  dailyActivity.reverse();

  return dailyActivity;
}

function getDailyActivity(userData) {
  if (userData) {
    const dailyActivity = [];

    for (let item of userData) {
      // eslint-disable-next-line no-unused-vars
      const [yyyy, mm, dd] = item.day.split("-");

      dailyActivity.push({
        day: `${dd}/${mm}`,
        kilogram: item.kilogram,
        calories: item.calories,
      });
    }

    return dailyActivity;
  }

  return getDefaultDailyActivity();
}

function getFirstName(userData) {
  return userData === "can not get user"
    ? "unknown user"
    : userData.data.userInfos.firstName;
}
export function getDefaultKeyData() {
  return {
    calorieCount: 0,
    proteinCount: 0,
    carbohydrateCount: 0,
    lipidCount: 0,
  };
}

function getKeyData(userData) {
  return userData === "can not get user"
    ? getDefaultKeyData()
    : userData.data.keyData;
}

function getTodayScore(userData) {
  return userData === "can not get user" ? 0 : userData.data.todayScore;
}
