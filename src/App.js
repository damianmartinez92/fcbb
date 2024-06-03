import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-timezone";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const App = () => {
  const { width, height } = useWindowSize();
  const [currentTime, setCurrentTime] = useState(
    moment().tz("America/Argentina/Buenos_Aires")
  );
  // eslint-disable-next-line no-unused-vars
  const [birthday, setBirthday] = useState("06-03");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment().tz("America/Argentina/Buenos_Aires"));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTimeToNextBirthday = () => {
    const now = moment().tz("America/Argentina/Buenos_Aires");
    let nextBirthday = moment(`${now.year()}-${birthday}`, "YYYY-MM-DD").tz(
      "America/Argentina/Buenos_Aires"
    );

    if (now.isSame(nextBirthday, "day")) {
      nextBirthday = nextBirthday.add(1, "year");
    } else if (now.isAfter(nextBirthday, "day")) {
      nextBirthday = nextBirthday.add(1, "year");
    }

    const duration = moment.duration(nextBirthday.diff(now));
    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  const { days, hours, minutes, seconds } = calculateTimeToNextBirthday();
  const isBirthdayToday = currentTime.format("MM-DD") === birthday;

  return (
    <div className="App">
      <div className="mensaje-info">
        {birthday &&
          (isBirthdayToday ? (
            <>
              <h1>¡Feliz cumpleaños bb!</h1>
              <h2>Te deseo lo mejor hoy y siempre 🫶</h2>
              <p>
                Faltan {days} días, {hours} horas, {minutes} minutos, y{" "}
                {seconds} segundos para tu próximo cumpleaños
              </p>
              <Confetti width={width} height={height} numberOfPieces={100} />
            </>
          ) : (
            <p>
              Faltan {days} días, {hours} horas, {minutes} minutos, y {seconds}{" "}
              segundos para tu cumpleaños
            </p>
          ))}
      </div>
      <p style={{ color: "white", fontSize: "12px" }}>
        De -_*gArRa*_- para pilu_zac
      </p>
    </div>
  );
};

export default App;
