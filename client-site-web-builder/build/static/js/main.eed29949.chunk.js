(this["webpackJsonpiterating-design"]=this["webpackJsonpiterating-design"]||[]).push([[0],{167:function(e,t,a){"use strict";a.r(t);var n=a(7),l=a.n(n),r=a(0),o=a.n(r),i=a(44),c=a(24),s=a(175),u=a(174),d=a(41);function m(e){return o.a.createElement(s.a,{bg:"light",variant:"light",sticky:"top"},o.a.createElement(s.a.Brand,{href:"#home"},"WoxGroup"),o.a.createElement(s.a.Collapse,null,o.a.createElement(u.a,{className:"mr-auto"},e.destinations.map((function(t,a){return function(t,a,n){return o.a.createElement(c.a.Item,{onSelect:function(){return e.setDestinationIndex(a)},key:a,className:a===n?"active":"none"},t.title)}(t,a,e.destinationIndex)}))),o.a.createElement(s.a.Text,null,"Welcome, corre"," ",o.a.createElement(d.a,{inline:"true",variant:"outline-success"},"Search"))))}var E=a(32),h=a(33),p=a(37),b=a(34),g=a(38),f=a(171),C=a(170),y=a(25),v=function(e){function t(){return Object(E.a)(this,t),Object(p.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(g.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.props,t=e.destinationIndex,a=e.pages;return o.a.createElement("div",null,o.a.createElement(C.a,{fluid:!0},o.a.createElement(y.BootstrapTable,{ref:"table",data:1===t?a:[],pagination:!0,search:!0,multiColumnSearch:!0},o.a.createElement(y.TableHeaderColumn,{dataField:"Title",isKey:!0,dataSort:!0},"Title"),o.a.createElement(y.TableHeaderColumn,{dataField:"Author",dataSort:!0},"Author"),o.a.createElement(y.TableHeaderColumn,{dataField:"Created",dataSort:!0},"Created"),o.a.createElement(y.TableHeaderColumn,{dataField:"Published",dataSort:!0},"Published"),o.a.createElement(y.TableHeaderColumn,{dataField:"Buttons"}))))}}]),t}(r.Component),k=a(46),T=a(19),x=a(39),j=a(45),O=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(p.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(l)))).standards={collTypes:[{id:"single",look:"\u2588\u2588\u2588\u2588\u2588\u2588\u2588"},{id:"small-left",look:"\u2588\u2588 \u2588\u2588\u2588\u2588"},{id:"small-right",look:"\u2588\u2588\u2588\u2588 \u2588\u2588"},{id:"triple",look:"\u2588 \u2588\u2588\u2588 \u2588"}],backgroundColors:["white","black","dark-blue","dark-green"],navigationBars:["none","simple"]},a.state={collType:a.standards.collTypes[0],backgroundColor:a.standards.backgroundColors[0],navigationBar:a.standards.navigationBars[1]},a.saveLayoutFunction=function(){var e=a.state,t=new XMLHttpRequest;t.onload=function(){var e=t.status,a=t.responseText;console.log("STATUS:",e),console.log("DATA:",a)},t.open("POST","http://localhost:3001/layout",!0),t.setRequestHeader("Content-Type","application/json;charset=UTF-8"),t.send(e)},a.generateButtons=function(){var e=function(e){return function(){a.setState({columns:e})}};return Array(a.standards.maxColls).fill(null).map((function(t,a){return function(t){return o.a.createElement(d.a,{onClick:e(t)},t)}(a+1)}))},a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement(T.a,null,o.a.createElement(x.a,null,o.a.createElement("h4",null,"Edit the site below, finally hit save!")),o.a.createElement(x.a,null,o.a.createElement(T.a,null,o.a.createElement("h2",null,"Choose the your type of columns")),o.a.createElement(T.a,null,o.a.createElement(j.a,{as:k.a,title:this.state.collType.look,id:"bg-nested-dropdown"},this.standards.collTypes.map((function(t){return o.a.createElement(c.a.Item,{key:t.id,eventKey:t.id,onClick:function(){return e.setState({collType:t})}},t.look)}))))),o.a.createElement(x.a,null,o.a.createElement(T.a,null,o.a.createElement("h2",null,"Choose your backgroundcolor")),o.a.createElement(T.a,null,o.a.createElement(j.a,{as:k.a,title:this.state.backgroundColor,id:"bg-nested-dropdown"},this.standards.backgroundColors.map((function(t){return o.a.createElement(c.a.Item,{key:t,eventKey:t,onClick:function(){return e.setState({backgroundColor:t})}},t)}))))),o.a.createElement(x.a,null,o.a.createElement(T.a,null,o.a.createElement("h2",null,"Choose your navigation bar")),o.a.createElement(T.a,null,o.a.createElement(j.a,{as:k.a,title:this.state.navigationBar,id:"bg-nested-dropdown"},this.standards.navigationBars.map((function(t){return o.a.createElement(c.a.Item,{key:t,eventKey:t,onClick:function(){return e.setState({navigationBar:t})}},t)}))))),o.a.createElement(x.a,null,o.a.createElement(d.a,{variant:"success",onClick:this.saveLayoutFunction},"SAVE")))}}]),t}(r.Component),w=function(e){function t(){var e,a;Object(E.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(p.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(l)))).state={pages:[{Title:"Frontpage",Author:"Corneel",Created:new Date("December 17, 1995 03:24:00"),Content:"this is a steaming pile of content",Published:!0},{Title:"Pictures",Author:"Corneel",Created:new Date("December 17, 1995 03:24:00"),Published:!0},{Title:"Blog",Author:"Corneel",Created:new Date("December 17, 1995 03:24:00"),Published:!0}]},a.handleLayoutViewClick=function(){a.setState({inLayoutEditor:!a.state.inLayoutEditor})},a.handleBtnClick=function(){var e=a.state.pages;e[0].Author="aaron",a.setState({pages:e})},a}return Object(g.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e,t=this.props.destinationIndex;return e=4===t?o.a.createElement(O,null):0===t?o.a.createElement(f.a,null,o.a.createElement("h2",null,"Dashboard"),o.a.createElement("p",null,"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae possimus alias fuga culpa libero illum, consequatur facere magnam sapiente ratione ipsam, ea eos necessitatibus earum error enim temporibus, ipsum sunt.")):o.a.createElement(v,{destinationIndex:t,pages:this.state.pages}),o.a.createElement(C.a,null,e,o.a.createElement(d.a,{onClick:this.handleBtnClick},"Test"))}}]),t}(r.Component);function S(e){var t=e.destinations,a=e.destinationIndex;return o.a.createElement(C.a,{fluid:!0},o.a.createElement(x.a,null,o.a.createElement(T.a,{xl:10,lg:8,md:8,sm:8,xs:12},o.a.createElement("h1",null,t[a].title)),o.a.createElement(T.a,{xl:2,lg:4,md:4,sm:4,xs:12},o.a.createElement(j.a,{id:"dropdown-basic-button",title:"Add Content"},o.a.createElement(c.a.Item,{onClick:function(){console.log("Clocked")}},"Page"),o.a.createElement(c.a.Item,{href:"#/action-2"},"Post"),o.a.createElement(c.a.Item,{href:"#/action-3"},"User")))))}var I=a(172),A=a(173);function B(e){var t=e.show,a=e.onHide,n=e.cells;return o.a.createElement(I.a,{show:t,onHide:a,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0},o.a.createElement(I.a.Header,{closebutton:"true"},o.a.createElement(I.a.Title,{id:"insert new content"},"New Page")),o.a.createElement(I.a.Body,null,o.a.createElement(A.a,null,n.map((function(e){return o.a.createElement(A.a.Group,{controlId:e,key:e},o.a.createElement(A.a.Label,null,e),o.a.createElement(A.a.Control,{placeholder:e}))})),o.a.createElement(d.a,{variant:"primary",type:"submit"},"Submit"))),o.a.createElement(I.a.Footer,null,o.a.createElement(d.a,{onClick:e.onHide},"Close")))}function D(e){var t=o.a.useState(!1),a=Object(i.a)(t,2),n=a[0],l=a[1];return o.a.createElement(C.a,{style:{marginTop:"20px"},fluid:!0},o.a.createElement(B,{show:n,onHide:function(){return l(!1)},cells:["Title","Author","Created","Published","Content"]}),o.a.createElement(x.a,null,o.a.createElement(T.a,null,o.a.createElement(S,e))),o.a.createElement(x.a,null,o.a.createElement(T.a,{xl:10,lg:8,md:8,sm:8,xs:12},o.a.createElement(w,e))))}a(165),a(166);l.a.render(o.a.createElement((function(e){var t=Object(r.useState)(0),a=Object(i.a)(t,2),n=a[0],l=a[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement(m,Object.assign({},e,{destinationIndex:n,setDestinationIndex:l})),o.a.createElement(D,Object.assign({},e,{destinationIndex:n,setDestinationIndex:l})))}),{destinations:[{title:"Dashboard"},{title:"Pages"},{title:"WoxComponents"},{title:"Users"},{title:"Layout-Editor"}]}),document.getElementById("root"))},95:function(e,t,a){e.exports=a(167)}},[[95,1,2]]]);
//# sourceMappingURL=main.eed29949.chunk.js.map