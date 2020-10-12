import { LightningElement, track } from 'lwc';
import { getCases} from 'data/sessionService';
export default class CaseList extends LightningElement {
  @track cases = [];
  connectedCallback() {
    getCases().then(result => {
      this.cases = this.allCases = result;
    });
  }
  
  handleSearchKeyInput(event) {
    const searchKey = event.target.value.toLowerCase();
    this.cases = this.allCases.filter(
      caseObj => caseObj.subject.toLowerCase().includes(searchKey)
    );
  }

  handleCaseClick(event) {
    const index = event.currentTarget.dataset.index;
    const navigateEvent = new CustomEvent('navigate', {
      detail: this.cases[index].caseNumber
    });
    this.dispatchEvent(navigateEvent);
  }
}
