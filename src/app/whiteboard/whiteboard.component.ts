import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements AfterViewInit {

  title = 'writing';
  private context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  canvasWidth = 0;
  canvasHeight = 0;
  text = '';
  fontInt = 30;
  fontSize = "30px"; 
  lineHeight = 30;
  prevX = 0;
  currX = 0;
  prevY = 0;
  currY = 0;
  dot_flag = false;
  flag = false;
  x = "yellow";
  y = 2;
  xText = 10;
  yText = 10;
		
 @ViewChild('canvasEl') canvasEl: ElementRef;

  constructor() {

  }
  

  ngAfterViewInit(): void {
	this.canvas =  this.canvasEl.nativeElement as HTMLCanvasElement;
	this.context = this.canvas.getContext('2d');
	this.canvasWidth = window.innerWidth + 50;
	this.canvasHeight = window.innerHeight - 100;
	this.context.canvas.width  = this.canvasWidth;
    this.context.canvas.height = this.canvasHeight;
	
    //this.draw();
  }
  
  onKey(event: any) { // without type info
    this.text = event.target.value;
	
  }
  
  onClickMe() {
   this.drawText();
  }
  increaseFont() {
    this.fontInt = this.fontInt + 2;
    this.lineHeight = this.lineHeight +2;
	this.fontSize = this.fontInt.toString() + "px";
    this.drawText();
	this.xText = this.xText + 1;
	this.yText = this.yText + 1;
  }	  

  decreaseFont() {
    this.fontInt = this.fontInt - 2;
	this.lineHeight = this.lineHeight - 2;
	this.fontSize = this.fontInt.toString() + "px";
	this.xText = this.xText - 1;
	this.yText = this.yText -1;
    this.drawText();
  }	  
  
  wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
   }
	  
  private drawText() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.context.font = this.fontSize + " Trace-lxy0";
    this.context.textBaseline = 'top';
    this.context.textAlign = 'left';
    const x = this.xText;
    const y = this.yText;
	var maxWidth = window.innerWidth - 20;
    var lineHeight = this.lineHeight;
    this.wrapText(this.context, this.text, x, y, maxWidth, lineHeight);
  }

  write() {
        this.context.beginPath();
        this.context.moveTo(this.prevX, this.prevY);
        this.context.lineTo(this.currX, this.currY);
        this.context.strokeStyle = this.x;
        this.context.lineWidth = this.y;
        this.context.stroke();
        this.context.closePath();
    }
	
  move(e){
	   this.findxy('move', e);
  }
  
  down(e){
	   this.findxy('down', e);
  }
  
  up(e){
	   this.findxy('up', e);
  }

  out(e){
	   this.findxy('out', e);
  }  
  
  findxy(res, e) {
	    e.preventDefault();
	    if(e.type.startsWith('touch')){
			if (res == 'down') {
				
				this.prevX = this.currX;
				this.prevY = this.currY;
				this.currX = e.touches[0].clientX - this.canvas.offsetLeft;
				this.currY = e.touches[0].clientY - this.canvas.offsetTop;
		
				this.flag = true;
				this.dot_flag = true;
				if (this.dot_flag) {
					this.context.beginPath();
					this.context.fillStyle = this.x;
					this.context.fillRect(this.currX, this.currY, 2, 2);
					this.context.closePath();
					this.dot_flag = false;
				}
			}
			if (res == 'up' || res == "out") {
				this.flag = false;
			}
			if (res == 'move') {
				if (this.flag) {
					this.prevX = this.currX;
					this.prevY = this.currY;
					this.currX = e.touches[0].clientX - this.canvas.offsetLeft;
					this.currY = e.touches[0].clientY - this.canvas.offsetTop;
					this.write();
				}
			}
		}else{			
			if (res == 'down') {
				
				this.prevX = this.currX;
				this.prevY = this.currY;
				this.currX = e.clientX - this.canvas.offsetLeft;
				this.currY = e.clientY - this.canvas.offsetTop;
		
				this.flag = true;
				this.dot_flag = true;
				if (this.dot_flag) {
					this.context.beginPath();
					this.context.fillStyle = this.x;
					this.context.fillRect(this.currX, this.currY, 2, 2);
					this.context.closePath();
					this.dot_flag = false;
				}
			}
			if (res == 'up' || res == "out") {
				this.flag = false;
			}
			if (res == 'move') {
				if (this.flag) {
					this.prevX = this.currX;
					this.prevY = this.currY;
					this.currX = e.clientX - this.canvas.offsetLeft;
					this.currY = e.clientY - this.canvas.offsetTop;
					this.write();
				}
			}
		}
    }
  open() {
    window.open('https://github.com/realappie', '_blank')
  }

}


