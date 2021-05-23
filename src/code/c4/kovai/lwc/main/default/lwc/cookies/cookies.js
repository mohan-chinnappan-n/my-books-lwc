import { LightningElement } from "lwc";

const columns = [

   {fieldName: "name", label: 'Name'},
   {fieldName: "value", label: 'Value'},
    
];

export default class App extends LightningElement {
  title = "Cookies";

  columns = columns;




  get cookies() {
    document.cookie = "favorite_fruit=apple";
    const citems = document.cookie.split(';');
    console.log('cookie', document.cookie);
    const cookies = [];
    citems.forEach( item => {
      const [name, value] = item.split('=');
      console.log(`name: ${name}, value: ${value}`);
      cookies.push( {name, value});
    });
    return cookies;

  }
  
}
