const CLIENT_ID = "762633836570-vpbro17viheb27tl43n2v7qq76aljd8b.apps.googleusercontent.com";
const API_KEY = "AIzaSyC1UIZ4AhrqAxk_7mc3R2RUjlwoJvZaKbI";

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

const SCOPES = 'https://www.googleapis.com/auth/calendar';

let tokenClient;
let gapiInited = false;
let gisInited = false;

export function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

export async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
}

export function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // defined later
  });
  gisInited = true;
}

export function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    
    await listUpcomingEvents();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({prompt: 'consent'});
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({prompt: ''});
  }
}

export async function listUpcomingEvents() {
  let response;
  try {
    const request = {
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    document.getElementById('content').innerText = 'No events found.';
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
      (str, event) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      'Events:\n');
  console.log(output)
}