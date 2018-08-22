import axios from 'axios';

class WindowPopup {
    
    static set(props){
        this.window = {
            url: props.url,
            name: props.winName,
            width: props.width,
            height: props.height
        },
        this.winInstance = null;
    }

    static open(){
        const windowArea = {
            width: Math.floor(window.outerWidth * 0.8),
            height: Math.floor(window.outerHeight * 0.5),
          };
        
          if (windowArea.width < 1000) { windowArea.width = 1000; }
          if (windowArea.height < 630) { windowArea.height = 630; }
          windowArea.left = Math.floor(window.screenX + ((window.outerWidth - windowArea.width) / 2));
          windowArea.top = Math.floor(window.screenY + ((window.outerHeight - windowArea.height) / 8));
        
          const sep = (this.window.url.indexOf('?') !== -1) ? '&' : '?';
          const url = `${this.window.url}${sep}`;
          const windowOpts = `toolbar=0,scrollbars=1,status=1,resizable=1,location=1,menuBar=0,
            width=${windowArea.width},height=${windowArea.height},
            left=${windowArea.left},top=${windowArea.top}`;
        
        const authWindow = window.open(this.window.url, this.window.name, `width=${this.window.width}, height=${this.window.height}`)
        
        
    }
}

export default WindowPopup;