// https://docs.google.com/spreadsheets/d/1D3bzqZVZpJqOjeQQwHYjlJxB-Na_hQAlEe_O0I9CqhA/edit#gid=0
// https://docs.google.com/spreadsheets/d/1D3bzqZVZpJqOjeQQwHYjlJxB-Na_hQAlEe_O0I9CqhA/edit#gid=0
// https://docs.google.com/spreadsheets/d/1Yrs9yfjZAuZmBh7EBFECBhTLyi44SVd42NM7Kcu4vuE/edit#gid=172020962
// https://docs.google.com/spreadsheets/d/13jSgz3fojt5zuXeshIZoQqjlcHuNnbkDEdOtwJmSAo0/edit#gid=0

//  1D3bzqZVZpJqOjeQQwHYjlJxB-Na_hQAlEe_O0I9CqhA

const { google } = require('googleapis');
// Initializes the Google APIs client library and sets up the authentication using service account credentials.
const auth = new google.auth.GoogleAuth({
    keyFile: './google.json',  // Path to your service account key file.
    scopes: ['https://www.googleapis.com/auth/spreadsheets']  // Scope for Google Sheets API.
});

const spreadsheetId = '1D3bzqZVZpJqOjeQQwHYjlJxB-Na_hQAlEe_O0I9CqhA';

async function appendToSheet(values) {
    const sheets = google.sheets({ version: 'v4', auth }); // Create a Sheets API client instance
    const range = 'A1'; // The range in the sheet to start appending
    const valueInputOption = 'USER_ENTERED'; // How input data should be interpreted

    const resource = { values: values };

    try {
        const res = await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption,
            resource,
        });
        return res; // Returns the response from the Sheets API
    } catch (error) {
        console.error('error', error); // Logs errors
    }
}

async function readSheet(range) {
    const sheets = google.sheets({
        version: 'v4', auth
    });

    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId, range
        });
        const rows = response.data.values; // Extracts the rows from the response.
        return rows; // Returns the rows.
    } catch (error) {
        console.error('error', error); // Logs errors.
    }
}

module.exports = { appendToSheet, readSheet }