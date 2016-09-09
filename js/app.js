//Demonstrating Custom Element Definitions as per V1 specs

/* Constructing custom element using innerHTML for shadowTree
*/
class myElement extends HTMLElement{
    constructor(){
      super();
      //Not using shadowDoM V1 yet.
      var shadowRoot = this.createShadowRoot();

      //create shadowDoM using innerHTML
      shadowRoot.innerHTML = "<div class=\"\">"+
          "<h1>I am the shadow for &lt;my-div&gt;</h1>"+
          //Whatever is between <mydiv></my-div> will go into this
          "<content></content>"+
      "</div>";


      if(this.testV1){
        console.log(this.testV1);
      }
    }
    //setters and getters
    set testV1(val){
        this.removeAttribute('testV1');
        if(val){
          this.setAttribute('testV1',val);
        }
    }
    get testV1(){
      return this.getAttribute('testV1');
    }
}
//register custom element myElement with the browser
window.customElements.define('my-div',myElement);

//console.log(window.HTMLImports);

/*
Constructing custom element from a template
*/
class myDecoratedDiv extends HTMLElement{
  constructor(){
    super();
      //Not using shadowDoM V1 yet.
      var link = document.querySelector('link[href="templates/default.html"]');

      // Clone the <template> in the import.
      var myTemplate = link.import.querySelector('#my-decorated-div');
      let shadowRoot = this.createShadowRoot();
      //var myTemplate = document.querySelector("#my-decorated-div");
      var shadowTree = myTemplate.content.cloneNode(true);
      shadowRoot.appendChild(shadowTree);
  }
}
function load(){//register custom element myDecoratedDiv with the browser
window.customElements.define('my-decorated-div',myDecoratedDiv);
}
/*
Constructing custom element from a template - 2
*/
class mySpecialDiv extends HTMLElement{
  constructor(){
    super();
      //Not using shadowDoM V1 yet.
      var link = document.querySelector('link[href="templates/special.html"]');

      // Clone the <template> in the import.
      var myTemplate = link.import.querySelector('#my-special-div');
      let shadowRoot = this.createShadowRoot();
      //var myTemplate = document.querySelector("#my-decorated-div");
      var shadowTree = myTemplate.content.cloneNode(true);
      shadowRoot.appendChild(shadowTree);
  }
}
function loadSpecial(){//register custom element myDecoratedDiv with the browser
window.customElements.define('my-special-div',mySpecialDiv);
}
