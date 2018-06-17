import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  conversation = [];
  text = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  sendMessage() {
    this.conversation.push({
      type: 'send',
      text: this.text
    });

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.post('http://localhost:4201', JSON.stringify({text: this.text}), {headers: headers})
      .subscribe(message => {
        this.text = '';
        this.conversation.push({
          type: 'received',
          text: message
        });
      });
  }

  userTextChanged(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }
}
