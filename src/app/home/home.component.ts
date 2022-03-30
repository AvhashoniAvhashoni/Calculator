import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public calculation: any = '0';
  private calc_arr: Array<any> = [];
  private isResult = false;
  constructor() { }

  ngOnInit(): void { }

  public calculate(val: any): void {
    if (this.isResult) {
      this.clear();
      this.isResult = false;
    }
    if (this.calculation == 0 && (!isNaN(parseFloat(val)) || val == '-')) {
      this.clear();
      this.calculation = val;
      this.calc_arr.push(val);
    } else if (this.calc_arr.length != 0) {
      this.calculation += val;
      this.calc_arr.push(val);
    }
  }

  @HostListener('window:keyup', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    if (event.key == "Enter") {
      this.result();
    } else if (
      !isNaN(parseFloat(event.key)) ||
      event.key == "-" ||
      event.key == "+" ||
      event.key == "*" ||
      event.key == "/" ||
      event.key == "%" ||
      event.key == "=") {
      this.calculate(event.key);
    }
  }

  public clear(): void {
    this.calculation = 0;
    this.calc_arr = [];
  }

  public result() {
    let result: string = "";
    if (!isNaN(parseInt(this.calc_arr[this.calc_arr.length - 1]))) {
      this.calc_arr.forEach(value => {
        result += value;
      });
      this.clear();
      this.calculate(eval(result));
      this.isResult = true;
    }
  }
}
