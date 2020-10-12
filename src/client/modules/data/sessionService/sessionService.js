//const URL = 'https://conference-lwc-app.herokuapp.com/api/sessions';
const URL = '/api/cases';
let cases = [];
export const getCases = () => fetch(URL)
  .then(response => {
    if (!response.ok) {
      throw new Error('No response from server');
    }
    return response.json();
  })
  .then(result => {
    cases = result.data;
    return cases;
  });
export const getCase = caseNumber => {
  return cases.find(caseObj => {
    return caseObj.caseNumber === caseNumber;
  });
}
