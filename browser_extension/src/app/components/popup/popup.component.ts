import { Component } from '@angular/core';
import { DictionaryService } from 'src/app/services/dictionary.service';
import { SummarizeService } from 'src/app/services/summarize.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  word: string = '';
  definition: any;
  errorMessage: string = '';
  tabText: any;
  alltext: any;
  analysedData: boolean = false;
  summarizedText: string ='';

  constructor(
    private dictionaryService: DictionaryService,
    private summarizeService: SummarizeService
  ) { }

  analyseData() {
    this.analysedData = true;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id !== undefined) {
        try {
          chrome.tabs.sendMessage(activeTab.id, { method: "getText" }, (response) => {
            if (response && response.method == "getText") {
              this.alltext = response.data;
              this.summarizeText(this.alltext);
            }
          });
        } catch (error) {
          console.error('Problem fetching text:', error);
        }
      }
    });
  }

  async summarizeText(alltext: string) {
    try {
      const dataObservable: Observable<any> = this.summarizeService.summarizeTextUsingAzure(alltext);
      dataObservable.subscribe((item: any) => {
        console.log(item);
        this.summarizedText = item;
      });
    } catch (error) {
      console.error('Error summarizing text:', error);
      this.errorMessage = 'An error occurred while summarizing the text';
    }
  }


  searchWord(word?: string) {
    let val = ""
    if (word) {
      val = word;
    } else {
      val = this.word;
    }

    if (val.trim() !== '') {
      this.errorMessage = '';
      
      if (!isNaN(Number(val))) {
        this.errorMessage = 'Please enter a valid word';
        return;
      }

      this.dictionaryService.getDefinition(val).subscribe(
        (definition: any) => {
          if (definition) {
            console.log(definition[0]);
            this.definition = definition[0]['meanings']
          } else {
            this.errorMessage = 'No definition found for the word';
          }
        },
        (error: any) => {
          console.log(error);
          this.errorMessage = 'An error occurred while fetching the definition';
        }
      );
    } else {
      this.errorMessage = 'Please enter a word';
    }
  }
}
