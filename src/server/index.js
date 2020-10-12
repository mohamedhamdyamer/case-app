const jsforce = require('jsforce');
require('dotenv').config();
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}
const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});

// eslint-disable-next-line no-undef
module.exports = app => {
  // put your express app logic here
  app.get('/api/cases', (req, res) => {
    /*const soql = `SELECT Id, Name, toLabel(Room__c), Description__c, format(Date_and_Time__c) formattedDateTime,
      (SELECT Speaker__r.Id, Speaker__r.Name, Speaker__r.Description, Speaker__r.Email, Speaker__r.Picture_URL__c FROM Session_Speakers__r)
       FROM Session__c ORDER BY Date_and_Time__c LIMIT 100`;*/

	const soql = `SELECT CaseNumber, Subject, Priority, Status, Description FROM Case`;

    /* Salesforce connection */
	conn.query(soql, (err, result) => {
      if (err) {
        res.sendStatus(500);
      } else if (result.records.length === 0) {
          res.status(404).send('Session not found.');
      } else {

        /* Work with result data */
	    const formattedData = result.records.map(sessionRecord => {
          //let cases = [];
          return {
            caseNumber: sessionRecord.CaseNumber,
            subject: sessionRecord.Subject,
            priority: sessionRecord.Priority,
            caseStatus: sessionRecord.Status,
			description: sessionRecord.Description
          };
        });
        res.send({ data: formattedData });
      }
    });
  });
};
