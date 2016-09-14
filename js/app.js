"use strict";
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

/*
extending a native element
Currently Not Supported
See https://github.com/webcomponents/custom-elements/issues/6#issuecomment-245968827
*/
class myAwesomeDiv extends /*HTMLDivElement*/HTMLElement{

  constructor(){
    super();
    this.addContent();
    this.addEventListener('click',e=>this.toggleFav());
  }
  set animate(val){
    this.removeAttribute('animate');
    if(val){
      this.setAttribute('animate',true);
    }
  }
  get animate(){
    return this.hasAttribute('animate');
  }
  toggleFav(){
    this.classList.toggle('favorite');
    if(this.animate){
      this.classList.toggle('favoured');
    }
    this.addContent();
    if(this.classList.contains('favorite')){
      var para = document.querySelector("#favoured");
      para.innerHTML="Yay! I am favoured By you";
    }

  }
  addContent(){
    this.innerHTML="<style>.favoured #favoured{padding:48px; background-color:red; color:violet;}</style>";
    var div = document.createElement('DIV');
    var para = document.createElement('P');
    para.setAttribute('id',"favoured");
    para.innerHTML = "Click Click Click to favourite Me";
    div.appendChild(para);
    this.appendChild(div);
  }

}
/*Define a custom element that extends a native element
Currently not Supported
*/
//window.customElements.define('awesome-div', myAwesomeDiv,{extends:'div'});

/*Register*/
window.customElements.define('awesome-div', myAwesomeDiv);

$(document).ready(function(){

});
