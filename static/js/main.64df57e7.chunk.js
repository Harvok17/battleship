(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{35:function(e,n,t){"use strict";t.r(n);var r,i,o,a,c,s,u,d,l,h,b,f,p,j,m,y,g,v,O,S,x=t(0),k=t(13),q=t.n(k),w=t(2),E=t(3),z=E.b.div(r||(r=Object(w.a)(['\n  height: 100vh;\n  display: grid;\n  grid-template-rows: 70px minmax(500px, 1fr) 75px;\n  grid-template-areas:\n    "header "\n    "main"\n    "footer";\n']))),B=E.b.header(i||(i=Object(w.a)(['\n  font-family: "Press Start 2P", cursive;\n  grid-area: header;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n']))),L=E.b.footer(o||(o=Object(w.a)(['\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  grid-area: footer;\n  border: 2px solid white;\n  .logo-container {\n    margin-right: 1em;\n  }\n\n  svg {\n    height: 35px;\n    width: 35px;\n    background: white;\n    border-radius: 50%;\n    border: 2px solid white;\n  }\n\n  span {\n    font-family: "Press Start 2P", cursive;\n    font-size: 0.6em;\n  }\n']))),P=E.b.div(a||(a=Object(w.a)(["\n  grid-area: main;\n"]))),M=Object(E.a)(c||(c=Object(w.a)(["\n    * {\n        margin: 0;\n        padding: 0;\n        box-sizing: border-box;\n    }\n\n    body {\n        background: black;\n        color: white;\n        user-select: none;\n    }\n"]))),T=t(8),A=t(9),R=t(12),_=function(){function e(n){var t=n.type,r=n.length;Object(T.a)(this,e),this.length=r,this.locations=Array(r).fill(-1),this.adjacentLocations=[],this.type=t,this.hits=[]}return Object(A.a)(e,[{key:"hit",value:function(e){this.hits.push(e)}},{key:"isSunk",value:function(){return!!this.checkHit()}},{key:"checkHit",value:function(){var e=this;return this.locations.every((function(n){return e.hits.includes(n)}))}}]),e}(),I=[{type:"carrier",length:5},{type:"battleship",length:4},{type:"cruiser",length:3},{type:"submarine",length:3},{type:"destroyer",length:2},{type:"corvette-1",length:1},{type:"corvette-2",length:1}],C=function(){function e(){Object(T.a)(this,e),this.boardSize=10,this.board=[],this.ships=[],this.adjacentSquares=[],this.leftEdge=[0,10,20,30,40,50,60,70,80,90],this.rightEdge=[9,19,29,39,49,59,69,79,89,99],this.shipsLeft=I.length,this.init()}return Object(A.a)(e,[{key:"init",value:function(){var e=this;I.forEach((function(n){e.ships.push(new _(n))}));for(var n=0;n<this.boardSize*this.boardSize;n++)this.board.push({occupied:!1,shot:!1,coord:n})}},{key:"resetBoard",value:function(){this.board=[],this.ships=[],this.adjacentSquares=[],this.init()}},{key:"receiveAttack",value:function(e){var n=this,t=this.board.find((function(n){return n.coord===e}));this.ships.forEach((function(r){r.locations.includes(e)?(t.shot=!0,r.hit(e),r.isSunk()&&(r.adjacentLocations.forEach((function(e){var t=n.board.find((function(n){return n.coord===e}));t&&!t.shot&&(t.shot=!0)})),n.setShipSankOnBoard(r),n.shipsLeft--)):t.shot=!0}))}},{key:"generateShipLocations",value:function(){var e=this;this.ships.forEach((function(n){var t;do{t=e.generateLocations(n)}while(e.collision(t.locations));n.locations=t.locations,e.addShipLocationsOnBoard(t.locations,n.type,t.direction),e.addAdjacentSquares(t.locations,t.direction,n)}))}},{key:"generateLocations",value:function(e){var n,t,r=Math.floor(2*Math.random());1===r?(n=Math.floor(Math.random()*this.boardSize),t=Math.floor(Math.random()*(this.boardSize-e.length))):(n=Math.floor(Math.random()*(this.boardSize-e.length)),t=Math.floor(Math.random()*this.boardSize));for(var i=[],o=0;o<e.length;o++)1===r?i.push(10*n+(t+o)):i.push(10*(n+o)+t);return{locations:i,direction:1===r?"horizontal":"vertical"}}},{key:"outOfBounds",value:function(e){var n=this;return!!e.some((function(e){return!n.board[e]}))||!!this.rightEdge.some((function(n){return[n,n+1].every((function(n){return e.includes(n)}))}))}},{key:"collision",value:function(e){var n=this;return e.some((function(e){return n.adjacentSquares.includes(e)}))}},{key:"manualShipLocations",value:function(e,n,t){var r=this.manualLocations(e,n,t),i=this.ships.find((function(e){return e.type===n.type}));i.locations=r,this.addShipLocationsOnBoard(r,n.type,t),this.addAdjacentSquares(r,t,i)}},{key:"manualLocations",value:function(e,n,t){for(var r=[],i=0;i<n.length;i++)"horizontal"===t?r.push(e+i):r.push(e+10*i);return r}},{key:"addShipLocationsOnBoard",value:function(e,n,t){var r=this;e.forEach((function(e,i,o){var a=r.board.find((function(n){return n.coord===e}));0===i?a.shipPart="".concat(n,"-start-").concat(t):i===o.length-1?a.shipPart="".concat(n,"-end-").concat(t):a.shipPart="".concat(n,"-body-").concat(t),a.occupied=!0,a.isSunk=!1}))}},{key:"setShipSankOnBoard",value:function(e){var n=this;e.locations.forEach((function(e){n.board.find((function(n){return n.coord===e})).isSunk=!0}))}},{key:"checkAllShipsSank",value:function(){return this.ships.every((function(e){return e.isSunk()}))}},{key:"addAdjacentSquares",value:function(e,n,t){var r=e[0],i=e[e.length-1];if("horizontal"===n){var o=this.leftEdge.includes(r)?[].concat(Object(R.a)(e),[i+1]):this.rightEdge.includes(i)?[r-1].concat(Object(R.a)(e)):[r-1].concat(Object(R.a)(e),[i+1]),a=o.map((function(e){return e-10})),c=o.map((function(e){return e+10})),s=o.concat(a).concat(c);t.adjacentLocations=s,this.adjacentSquares=this.adjacentSquares.concat(s)}if("vertical"===n){var u=[r-10].concat(Object(R.a)(e),[i+10]),d=this.leftEdge.includes(r)?[]:u.map((function(e){return e-1})),l=this.rightEdge.includes(r)?[]:u.map((function(e){return e+1})),h=u.concat(d).concat(l);t.adjacentLocations=h,this.adjacentSquares=this.adjacentSquares.concat(h)}}}]),e}(),N=function(){function e(n){Object(T.a)(this,e),this.name=n,this.gameBoard=new C}return Object(A.a)(e,[{key:"fire",value:function(e,n){return!n.board.find((function(n){return n.coord===e})).shot&&(n.receiveAttack(e),!0)}}]),e}(),D=t(5),H="INITIALIZE_PLAYERS",U="PLACE_SHIP",W="GENERATE_COMPUTER_SHIPS",Y="RESET_BOARD",G="FIRE_SHOT",J="RESET",X="SETUP",F="GAME",V="RESULT",Z="TURN",K="WINNER",Q=E.b.div(s||(s=Object(w.a)(['\n  text-align: center;\n  font-family: "Press Start 2P", cursive;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 100%;\n']))),$=E.b.div(u||(u=Object(w.a)(["\n  margin-bottom: 100px;\n  line-height: 2;\n"]))),ee=E.b.div(d||(d=Object(w.a)(["\n  background: ",";\n  height: 550px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-around;\n  align-items: center;\n  opacity: ",";\n  transition: 0.7s;\n\n  @media (max-width: 500px) {\n    display: ",";\n  }\n"])),(function(e){return e.background}),(function(e){return e.opacity}),(function(e){return e.display})),ne=E.b.div(l||(l=Object(w.a)(["\n  position: relative;\n  height: 100%;\n  width: 920px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  text-align: center;\n  line-height: 2;\n\n  @media (max-width: 500px) {\n    flex-direction: column;\n    justify-content: center;\n    width: 100%;\n  }\n"]))),te=Object(E.c)(h||(h=Object(w.a)(["\n  0% {\n    transform: translateY(30px);\n    opacity: 0;\n  }\n\n  100% {\n    transform: translateY(0);\n    opacity: 1;\n  }\n"]))),re=E.b.h1(b||(b=Object(w.a)(["\n  font-size: ",";\n  animation: "," 1s ease;\n\n  @media (max-width: 500px) {\n    font-size: ",";\n  }\n"])),(function(e){return e.small?"2.5em":"4em"}),te,(function(e){return e.small?"1.5em":"2em"})),ie=E.b.button(f||(f=Object(w.a)(["\n  border: 2px solid white;\n  color: white;\n  padding: ",";\n  border-radius: 5px;\n  background: transparent;\n  font-family: inherit;\n  font-size: ",";\n  cursor: pointer;\n  &:hover {\n    background: white;\n    color: black;\n  }\n"])),(function(e){return e.mini?"0.9em 1.5em":"1.5em 2em"}),(function(e){return e.mini?"0.6em":""})),oe=E.b.div(p||(p=Object(w.a)(["\n  display: flex;\n  width: 50%;\n  justify-content: space-between;\n"]))),ae=E.b.table(j||(j=Object(w.a)(["\n  border-collapse: collapse;\n"]))),ce=E.b.td(m||(m=Object(w.a)(["\n  height: 37px;\n  width: 37px;\n  border: 1px solid lightgrey;\n  cursor: pointer;\n  background-color: ",";\n\n  &:hover {\n    cursor: ",";\n    background-color: ",";\n  }\n\n  &.carrier-start-horizontal {\n    border-right: 0;\n  }\n\n  &.carrier-body-horizontal {\n    border-left: 0;\n    border-right: 0;\n  }\n\n  &.carrier-end-horizontal {\n    border-left: 0;\n  }\n\n  &.carrier-start-vertical {\n    border-bottom: 0;\n  }\n\n  &.carrier-body-vertical {\n    border-top: 0;\n    border-bottom: 0;\n  }\n\n  &.carrier-end-vertical {\n    border-top: 0;\n  }\n\n  &.battleship-start-horizontal {\n    border-right: 0;\n  }\n\n  &.battleship-body-horizontal {\n    border-left: 0;\n    border-right: 0;\n  }\n\n  &.battleship-end-horizontal {\n    border-left: 0;\n  }\n\n  &.battleship-start-vertical {\n    border-bottom: 0;\n  }\n\n  &.battleship-body-vertical {\n    border-top: 0;\n    border-bottom: 0;\n  }\n\n  &.battleship-end-vertical {\n    border-top: 0;\n  }\n\n  &.cruiser-start-horizontal {\n    border-right: 0;\n  }\n\n  &.cruiser-body-horizontal {\n    border-left: 0;\n    border-right: 0;\n  }\n\n  &.cruiser-end-horizontal {\n    border-left: 0;\n  }\n\n  &.cruiser-start-vertical {\n    border-bottom: 0;\n  }\n\n  &.cruiser-body-vertical {\n    border-top: 0;\n    border-bottom: 0;\n  }\n\n  &.cruiser-end-vertical {\n    border-top: 0;\n  }\n\n  &.submarine-start-horizontal {\n    border-right: 0;\n  }\n\n  &.submarine-body-horizontal {\n    border-left: 0;\n    border-right: 0;\n  }\n\n  &.submarine-end-horizontal {\n    border-left: 0;\n  }\n\n  &.submarine-start-vertical {\n    border-bottom: 0;\n  }\n\n  &.submarine-body-vertical {\n    border-top: 0;\n    border-bottom: 0;\n  }\n\n  &.submarine-end-vertical {\n    border-top: 0;\n  }\n\n  &.destroyer-start-horizontal {\n    border-right: 0;\n  }\n\n  &.destroyer-body-horizontal {\n    border-left: 0;\n    border-right: 0;\n  }\n\n  &.destroyer-end-horizontal {\n    border-left: 0;\n  }\n\n  &.destroyer-start-vertical {\n    border-bottom: 0;\n  }\n\n  &.destroyer-body-vertical {\n    border-top: 0;\n    border-bottom: 0;\n  }\n\n  &.destroyer-end-vertical {\n    border-top: 0;\n  }\n"])),(function(e){return e.highlight||e.sunk?"lightgrey":e.occupied&&!e.sunk?"royalblue":""}),(function(e){return e.highlight||e.enemy?"":"not-allowed"}),(function(e){return e.highlight||e.player||e.occupied||e.sunk?"":e.enemy?"lightgreen":"firebrick"})),se=Object(E.c)(y||(y=Object(w.a)(["\n0% {\n  transform: scale(5);\n}\n\n100% {\n  transform: scale(1);\n}\n"]))),ue=E.b.div(g||(g=Object(w.a)(["\n  color: red;\n  animation: "," 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  @media (max-width: 500px) {\n    animation: none;\n  }\n"])),se),de=E.b.div(v||(v=Object(w.a)(["\n  color: grey;\n  animation: "," 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  @media (max-width: 500px) {\n    animation: none;\n  }\n"])),se),le=E.b.span(O||(O=Object(w.a)(["\n  color: ",";\n  @media (max-width: 500px) {\n    position: absolute;\n    display: ",";\n    font-size: 2em;\n  }\n"])),(function(e){return e.color}),(function(e){return e.display})),he={randomSquare:null,selectedSquare:null,startingSquare:null,direction:null,validSquares:[],filteredDirections:[],directions:[1,-1,10,-10]},be=[0,10,20,30,40,50,60,70,80,90],fe=[9,19,29,39,49,59,69,79,89],pe=function(){var e=he.validSquares.map((function(e){return e.coord}));he.filteredDirections=he.directions.filter((function(n){var t,r=n+he.randomSquare.coord;return(be.includes(he.randomSquare.coord)&&fe.includes(r)||fe.includes(he.randomSquare.coord)&&be.includes(r))&&(t=r),e.includes(r)&&r!==t}))},je=function(){return he.randomSquare=he.validSquares[Math.floor(Math.random()*he.validSquares.length)],he.randomSquare.occupied&&(he.startingSquare=he.randomSquare.coord,pe()),he.randomSquare.coord},me=function(e){he.validSquares=e.board.filter((function(e){return!e.shot}))},ye=function(e){return-e},ge=function(e){return e.ships.find((function(e){return e.locations.includes(he.startingSquare)})).isSunk()},ve=function(e){return Se(),me(e),je()},Oe=function(){he.direction=ye(he.direction);var e=he.startingSquare+he.direction;he.selectedSquare=he.validSquares.find((function(n){return n.coord===e}))},Se=function(){he.randomSquare=null,he.selectedSquare=null,he.startingSquare=null,he.direction=null,he.validSquares=[],he.filteredDirections=[],he.directions=[1,-1,10,-10]},xe=function(e){if(me(e),!he.selectedSquare){if(!he.randomSquare)return je();if(he.randomSquare&&he.randomSquare.occupied){pe(),he.direction=he.filteredDirections[Math.floor(Math.random()*he.filteredDirections.length)];var n=he.randomSquare.coord+he.direction,t=he.validSquares.find((function(e){return e.coord===n}));return t?(t.occupied&&(he.selectedSquare=t),t.coord):ve(e)}return je()}var r;return he.selectedSquare.occupied?ge(e)?ve(e):(be.includes(he.selectedSquare.coord)&&(1===he.direction||-1===he.direction)||fe.includes(he.selectedSquare.coord)&&(1===he.direction||-1===he.direction)?(he.direction=ye(he.direction),r=he.startingSquare+he.direction,he.selectedSquare=he.validSquares.find((function(e){return e.coord===r}))):(r=he.selectedSquare.coord+he.direction,he.selectedSquare=he.validSquares.find((function(e){return e.coord===r}))),he.selectedSquare=he.validSquares.find((function(e){return e.coord===r})),he.selectedSquare||ge(e)||Oe(),he.selectedSquare?he.selectedSquare.coord:ve(e)):he.selectedSquare.occupied?void 0:(Oe(),he.selectedSquare?he.selectedSquare.coord:ve(e))},ke=t(1),qe=Object(D.b)((function(e){return{winner:e.winner}}),{initializePlayers:function(e){return{type:H,payload:e}},generateComputerShips:function(){return{type:W}},setup:function(){return{type:X}},reset:function(){return{type:J}}})((function(e){var n=e.screen,t=e.initializePlayers,r=e.generateComputerShips,i=e.setup,o=e.reset,a=e.winner,c=function(){var e=new N("Player"),n=new N("Enemy");t({player1:e,player2:n}),r(),i()};return Object(ke.jsxs)(Q,{children:[Object(ke.jsx)($,{children:Object(ke.jsx)(re,{small:"result"===n,children:"result"===n?"Winner: ".concat(a):"Battleship"})}),Object(ke.jsx)(ie,{onClick:function(){"result"===n?(o(),Se(),c()):c()},children:"result"===n?"Play again":"Start game"})]})})),we=t(15),Ee=t(4),ze=function(e){return function(n){return Object(ke.jsx)(ae,{children:Object(ke.jsxs)("tbody",{children:[Object(ke.jsx)(e,Object(Ee.a)({start:0,end:10},n)),Object(ke.jsx)(e,Object(Ee.a)({start:10,end:20},n)),Object(ke.jsx)(e,Object(Ee.a)({start:20,end:30},n)),Object(ke.jsx)(e,Object(Ee.a)({start:30,end:40},n)),Object(ke.jsx)(e,Object(Ee.a)({start:40,end:50},n)),Object(ke.jsx)(e,Object(Ee.a)({start:50,end:60},n)),Object(ke.jsx)(e,Object(Ee.a)({start:60,end:70},n)),Object(ke.jsx)(e,Object(Ee.a)({start:70,end:80},n)),Object(ke.jsx)(e,Object(Ee.a)({start:80,end:90},n)),Object(ke.jsx)(e,Object(Ee.a)({start:90,end:100},n))]})})}},Be=ze((function(e){var n=e.start,t=e.end,r=e.player,i=e.handleAttack;return Object(ke.jsx)("tr",{children:r.gameBoard.board.slice(n,t).map((function(e){return Object(ke.jsx)(ce,{className:e.isSunk&&e.shipPart,sunk:e.isSunk,enemy:!0,onClick:function(){i(e)},children:!e.occupied&&e.shot?Object(ke.jsx)(de,{children:"\u2715"}):e.occupied&&e.shot?Object(ke.jsx)(ue,{children:"\u274c"}):null},e.coord)}))})}));function Le(){return(Le=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function Pe(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}function Me(e,n){var t=e.title,r=e.titleId,i=Pe(e,["title","titleId"]);return x.createElement("svg",Le({xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",ref:n,"aria-labelledby":r},i),t?x.createElement("title",{id:r},t):null,S||(S=x.createElement("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})))}var Te=x.forwardRef(Me),Ae=(t.p,function(){return Object(ke.jsxs)(L,{children:[Object(ke.jsx)("a",{href:"https://github.com/Harvok17",target:"_blank",rel:"noreferrer",className:"logo-container",children:Object(ke.jsx)(Te,{})}),Object(ke.jsx)("span",{children:"Made by Harvok17"})]})}),Re=function(e){var n=e.screen;return Object(ke.jsx)(B,{children:"start"===n?null:Object(ke.jsx)("h1",{children:"Battleship"})})},_e=ze((function(e){var n=e.start,t=e.end,r=e.player;return Object(ke.jsx)("tr",{children:r.gameBoard.board.slice(n,t).map((function(e){return Object(ke.jsx)(ce,{occupied:e.occupied,className:e.shipPart,sunk:e.isSunk,player:!0,children:!e.occupied&&e.shot?Object(ke.jsx)(de,{children:"\u2715"}):e.occupied&&e.shot?Object(ke.jsx)(ue,{children:"\u274c"}):null},e.coord)}))})})),Ie=ze((function(e){var n=e.start,t=e.end,r=e.player,i=e.hovered,o=e.handlePlaceShip,a=e.handleMouseEnter,c=e.handleMouseLeave;return Object(ke.jsx)("tr",{children:r.gameBoard.board.slice(n,t).map((function(e){return Object(ke.jsx)(ce,{highlight:i.includes(e.coord),occupied:e.occupied,className:e.shipPart,onClick:function(){o(e.coord,r.gameBoard)},onMouseEnter:function(){a(e.coord,r.gameBoard)},onMouseLeave:c},e.coord)}))})})),Ce=Object(D.b)((function(e){return{player1:e.players.player1}}),{placeShip:function(e){return{type:U,payload:e}},resetBoard:function(){return{type:Y}},gameStart:function(){return{type:F}}})((function(e){var n=e.player1,t=e.placeShip,r=e.resetBoard,i=e.gameStart,o=Object(x.useState)(0),a=Object(we.a)(o,2),c=a[0],s=a[1],u=Object(x.useState)("horizontal"),d=Object(we.a)(u,2),l=d[0],h=d[1],b=Object(x.useState)([]),f=Object(we.a)(b,2),p=f[0],j=f[1];return Object(ke.jsx)(Q,{children:Object(ke.jsxs)(ee,{children:[c===I.length?"All ships are set!":"Place your ships",Object(ke.jsx)(ie,{mini:!0,onClick:function(){h("horizontal"===l?"vertical":"horizontal")},children:l}),Object(ke.jsx)(Ie,{player:n,hovered:p,handlePlaceShip:function(e,n){if(c!==I.length){var r=n.manualLocations(e,I[c],l);n.outOfBounds(r)||n.collision(r)||(t({coord:e,ship:I[c],direction:l}),s(c+1))}},handleMouseEnter:function(e,n){if(c!==I.length){for(var t=I[c].length,r=[],i=0;i<t;i++)"horizontal"===l?r.push(e+i):r.push(e+10*i);n.collision(r)||n.outOfBounds(r)||j(r)}},handleMouseLeave:function(){j([])}}),c===I.length?Object(ke.jsxs)(oe,{children:[Object(ke.jsx)(ie,{mini:!0,onClick:function(){i(),s(0),h("horizontal")},children:"Play"}),Object(ke.jsx)(ie,{mini:!0,onClick:function(){r(),s(0),h("horizontal")},children:"Reset"})]}):"".concat(I[c].type[0].toUpperCase()).concat(I[c].type.slice(1))]})})})),Ne=Object(D.b)((function(e){var n=e.players;return{player1:n.player1,player2:n.player2,turn:e.turn}}),{fireShot:function(e){var n=e.coord,t=e.attacker,r=e.receiver;return{type:G,payload:{coord:n,attacker:t,receiver:r}}},setTurn:function(e){return{type:Z,payload:e}},showResult:function(){return{type:V}},declareWinner:function(e){return{type:K,payload:e}}})((function(e){var n=e.player1,t=e.player2,r=e.turn,i=e.setTurn,o=e.showResult,a=e.declareWinner,c=e.fireShot,s=function e(n,t){var r=xe(n.gameBoard);c({coord:r,attacker:"player2",receiver:"player1"}),n.gameBoard.checkAllShipsSank()&&(a(t.name),setTimeout((function(){return o()}),1500)),n.gameBoard.board[r].occupied?(setTimeout((function(){return i(6)}),500),setTimeout((function(){return i(1)}),1e3),setTimeout((function(){e(n,t)}),2e3)):(i(5),setTimeout((function(){return i(0)}),1e3))};return Object(ke.jsx)(Q,{children:Object(ke.jsxs)(ne,{children:[Object(ke.jsxs)(ee,{opacity:0===r||3===r||4===r?"0.5":"1",background:0===r||3===r||4===r?"":"hsl(0, 0%, 12.82%)",display:0===r||3===r||4===r?"none":"flex",children:[n.name," Ships",Object(ke.jsx)(_e,{player:n}),"Ships Left: ",n.gameBoard.shipsLeft]}),Object(ke.jsx)(le,{display:r&&1!==r?"block":"none",color:r&&1!==r?3===r||5===r?"red":"limegreen":"white",children:r?1===r?"Enemy turn":3===r||5===r?"Miss":"Hit!":"Your turn"}),Object(ke.jsxs)(ee,{turn:r,opacity:1===r||5===r||6===r?"0.5":"1",background:1===r||5===r||6===r?"":"hsl(0, 0%, 12.82%)",display:1===r||5===r||6===r?"none":"flex",children:[t.name," Ships",Object(ke.jsx)(Be,{player:t,handleAttack:function(e){e.shot||1===r||3===r||4===r||5===r||6===r||(c({coord:e.coord,attacker:"player1",receiver:"player2"}),t.gameBoard.checkAllShipsSank()?(i(4),a(n.name),setTimeout((function(){return o()}),1500)):e.occupied||r?(i(4),setTimeout((function(){return i(0)}),1e3)):(i(3),setTimeout((function(){return i(1)}),1e3),setTimeout((function(){return s(n,t)}),2e3)))}}),"Ships Left: ",t.gameBoard.shipsLeft]})]})})})),De=function(e){var n=e.screen;return Object(ke.jsx)(P,{children:"start"===n||"result"===n?Object(ke.jsx)(qe,{screen:n}):"setup"===n?Object(ke.jsx)(Ce,{}):Object(ke.jsx)(Ne,{})})},He=Object(D.b)((function(e){return{screen:e.screen}}))((function(e){var n=e.screen;return Object(ke.jsxs)(z,{children:[Object(ke.jsx)(M,{}),Object(ke.jsx)(Re,{screen:n}),Object(ke.jsx)(De,{screen:n}),Object(ke.jsx)(Ae,{})]})})),Ue=t(6),We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0,t=n.type,r=n.payload;switch(t){case H:return Object(Ee.a)(Object(Ee.a)({},e),r);case U:var i=Object(Ee.a)({},e);return i.player1.gameBoard.manualShipLocations(r.coord,r.ship,r.direction),Object(Ee.a)({},i);case Y:var o=Object(Ee.a)({},e);return o.player1.gameBoard.resetBoard(),Object(Ee.a)({},o);case W:var a=Object(Ee.a)({},e);return a.player2.gameBoard.generateShipLocations(),Object(Ee.a)({},a);case G:var c=Object(Ee.a)({},e);return c[r.attacker].fire(r.coord,c[r.receiver].gameBoard),Object(Ee.a)({},c);default:return e}},Ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0,t=n.type,r=n.payload;switch(t){case K:return r;default:return e}},Ge=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"start",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case X:return"setup";case F:return"game";case V:return"result";default:return e}},Je=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=arguments.length>1?arguments[1]:void 0,t=n.type,r=n.payload;switch(t){case Z:return r;default:return e}},Xe=Object(Ue.b)({players:We,screen:Ge,turn:Je,winner:Ye}),Fe=function(e,n){return n.type===J&&(e=void 0),Xe(e,n)},Ve=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ue.c,Ze=Object(Ue.d)(Fe,Ve());q.a.render(Object(ke.jsx)(D.a,{store:Ze,children:Object(ke.jsx)(He,{})}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.64df57e7.chunk.js.map