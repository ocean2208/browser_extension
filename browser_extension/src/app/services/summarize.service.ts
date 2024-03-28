import { Injectable } from '@angular/core';
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummarizeService {
  private textAnalyticsClient: TextAnalyticsClient;

  constructor() {
    const key = '<Enter_Your_Key>';
    const endpoint = 'https://trialpii.cognitiveservices.azure.com/';

    this.textAnalyticsClient = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
  }

  // Method to summarize text using Azure Text Analytics
  summarizeTextUsingAzure(text: string): Observable<any> {
    return new Observable(observer => {
      this.textAnalyticsClient.recognizePiiEntities([text], "en")
        .then(result => {
          if (result && result.length > 0 && !result[0].error) {
            const document = result[0];
            if (document.redactedText) {
              observer.next({
                redactedText: document.redactedText,
                piiEntities: document.entities
              });
            } else {
              observer.error("Redacted text not found in the response.");
            }
          } else if (result && result.length > 0 && result[0].error) {
            observer.error(result[0].error);
          } else {
            observer.error("No valid response received from the service.");
          }
        })
        .catch(err => {
          observer.error(err);
        });
    });
  }
}
