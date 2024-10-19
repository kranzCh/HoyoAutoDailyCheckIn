const GIUrl = "https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us&act_id=e202102251931481";
const HSRUrl = "https://sg-public-api.hoyolab.com/event/luna/os/sign?lang=en-us&act_id=e202303301540311";
const BH3Url = "https://sg-public-api.hoyolab.com/event/mani/sign?lang=en-us&act_id=e202110291205111";
const ZZZUrl = "https://sg-public-api.hoyolab.com/event/luna/zzz/os/sign?lang=en-us&act_id=e202406031448091";

const tokenList = [
  {
    GI: true,
    HSR: true,
    BH3: false,
    ZZZ: true,
    token: "HOYOLAB_COOKIE_TOKEN",
  },
];

function main() {
  let hasError = false;

  const errorList = [];

  for (let i = 0; i < tokenList.length; i++) {
    // GI Check-in
    if (tokenList[i].GI) {
      if (!checkIn("GI", tokenList[i].token)) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} GI CHECK IN FAILED`);
      }
    }
    // HSR Check-in
    if (tokenList[i].HSR) {
      if (!checkIn("HSR", tokenList[i].token)) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} HSR CHECK IN FAILED`);
      }
    }
    // BH3 Check-in
    if (tokenList[i].BH3) {
      if (!checkIn("BH3", tokenList[i].token)) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} BH3 CHECK IN FAILED`);
      }
    }
    // ZZZ Check-in
    if (tokenList[i].ZZZ) {
      if (!checkIn("ZZZ", tokenList[i].token)) {
        hasError = true;
        errorList.push(`ACCOUNT ${i} ZZZ CHECK IN FAILED`);
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
    case "ZZZ":
      url = ZZZUrl;
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

  // acceptable status code set
  const acceptSet = new Set([0, -5003]);

  // get response
  const response = UrlFetchApp.fetch(url, options);
  Logger.log(response.getContentText());

  const responseData = JSON.parse(response.getContentText());
  if (acceptSet.has(responseData.statusCode)) {
    // Check-in failed for an unexpected reason.
    Logger.log(`Check-in failed with response: ${JSON.stringify(responseData)}`);
    return false;
  }
  if (responseData.data && responseData.data.is_risk === true) {
    // Hoyolab is sending a challenge, handle this case separately if needed.
    Logger.log(`Check-in triggered a challenge: ${JSON.stringify(responseData)}`);
  }
  // Check-in successful or event expired/already checked in.
  return true;
}
