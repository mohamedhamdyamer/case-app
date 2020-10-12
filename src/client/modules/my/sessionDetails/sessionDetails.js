import { LightningElement, api, track } from 'lwc';
import { getCase } from 'data/sessionService';
export default class caseDetails extends LightningElement {
  @track caseObj;
  @api

  set caseNumber(caseNumber) {
    this._caseNumber = caseNumber;
    this.caseObj = getCase(caseNumber);
  }

  get caseNumber() {
    return this._caseNumber;
  }
}
