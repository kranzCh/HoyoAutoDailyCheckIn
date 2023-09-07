const GIUrl =
  "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481";
const HSRUrl =
  "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311";
const BH3Url =
  "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111";

const tokenList = [
  {
    GI: true,
    HSR: true,
    BH3: false,
    token: "HOYOLAB_COOKIE_TOKEN",
  },
];

function main() {
  let hasError = false;

  const errorList = [];

  for (let i = 0; i < tokenList.length; i++) {
    // GI Check-in
    if (tokenList[i].GI) {
      if (!checkIn("GI", tokenList[i])) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} GI CHECK IN FAILED`);
      }
    }
    // HSR Check-in
    if (tokenList[i].HSR) {
      if (!checkIn("HSR", tokenList[i])) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} HSR CHECK IN FAILED`);
      }
    }
    // BH3 Check-in
    if (tokenList[i].BH3) {
      if (!checkIn("BH3", tokenList[i])) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} BH3 CHECK IN FAILED`);
      }
    }
  }

  // check and throw error after check-in if has error occur
  if (hasError) {
    const errorMessage = errorList.join("\n");
    throw Error(errorMessage);
  }
}

// return true if check-in succeeded, otherwise false
function checkIn(title, token) {
  let url = "";
  switch (title) {
    case "GI":
      url = GIUrl;
      break;
    case "HSR":
      url = HSRUrl;
      break;
    case "BH3":
      url = BH3Url;
      break;
    default:
      return false;
  }

  // set request headers
  const headers = {
    Cookie: token,
  };

  // set request options
  const options = {
    method: "POST",
    headers: headers,
  };

  // get response
  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());

  if (
    // "retcode":0 means check-in successed
    (!response.getContentText().includes(`"retcode":0`) &&
      // "retcode":-5003 means already check-in
    !response.getContentText().includes(`"retcode":-5003`)) 
    // "is_risk":true means hoyolab send challenge when checking-in,
    // if the script encounters a check-in failure, you may need to reset the cookie in hoyolab.
    || response.getContentText().includes(`"success":1,"is_risk":true`)
  ) {
    return false;
  }
  Logger.log(`${title} CHECK IN OK`);
  return true;
}
