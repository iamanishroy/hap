import { hapDatabase } from "./db/config";
import axios from "axios";

var cancelToken;
const fetchTimeTable = async (day, month, year, batch) => {
  var snapshot = await hapDatabase
    .ref(`batch/${batch}/${day}-${month}-${year}`)
    .once("value");
  if (snapshot.val()) {
    return snapshot.val();
  } else {
    var data = {
      day: day,
      month: month,
      year: year,
      batchID: batch,
    };
    try {
      if (typeof cancelToken != typeof undefined) {
        cancelToken.cancel("Canceling the Previous Request");
      }
      cancelToken = axios.CancelToken.source();
      var response = await axios.post(
        "https://leather-knowledgeable-trombone.glitch.me/timetable",
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        },
        { cancelToken: cancelToken.token }
      );
      return response.data;
    } catch {
      return 0;
    }
  }
};

export default fetchTimeTable;
