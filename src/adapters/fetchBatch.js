import { hapDatabase } from "./db/config";
import axios from "axios";

const fetchBatch = async () => {
  var snapshot = await hapDatabase.ref("batchList").once("value");
  if (snapshot.val()) {
    return snapshot.val();
  } else {
    try {
      var response = await axios({
        method: "post",
        url: "https://leather-knowledgeable-trombone.glitch.me/batch",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      return 0;
    }
  }
};

export default fetchBatch;
