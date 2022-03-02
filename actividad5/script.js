Array.prototype.clean = function () {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === "") {
      this.splice(i, 1);
    }
  }
  return this;
};

String.prototype.isNumeric = function () {
  return !isNaN(parseFloat(this)) && isFinite(this);
};

class Calculadora {

  infixToPostfix (infix){
    console.log(infix,eval(infix));
      var outputQueue = "";
      var operatorStack = [];
      var operators = {
          "^": {
              precedence: 4,
              associativity: "Right"
          },
          "/": {
              precedence: 3,
              associativity: "Left"
          },
          "*": {
              precedence: 3,
              associativity: "Left"
          },
          "+": {
              precedence: 2,
              associativity: "Left"
          },
          "-": {
              precedence: 2,
              associativity: "Left"
          }
      }
      infix = infix.replace(/\s+/g, "");
      infix = infix.split(/([\+\-\*\/\^\(\)])/).clean();
      console.log("infix",infix)
      for(var i = 0; i < infix.length; i++) {
          var token = infix[i];
          if(token.isNumeric()) {
              outputQueue += token + " ";
          }
          else if("^*/+-".indexOf(token) !== -1) {
              var o1 = token;
              var o2 = operatorStack[operatorStack.length - 1];
              while("^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                  outputQueue += operatorStack.pop() + " ";
                  o2 = operatorStack[operatorStack.length - 1];
              }
              operatorStack.push(o1);
          } else if(token === "(") {
              operatorStack.push(token);
          } else if(token === ")") {
              while(operatorStack[operatorStack.length - 1] !== "(") {
                  outputQueue += operatorStack.pop() + " ";
              }
              operatorStack.pop();
          }
      }
      while(operatorStack.length > 0) {
          outputQueue += operatorStack.pop() + " ";
      }
      return outputQueue.trim().split(/\s/g).map((z) => (z.isNumeric(z) ? parseFloat(z) : z));
  }
  operacion(operando,op1,op2){
    console.log(op1,operando,op2)
    switch (operando) {
      case '+': return op1+op2;
      case '-': return op1-op2;
      case '/': return op1/op2;
      case '*': return op1*op2;
      case '^': return Math.pow(op1,op2);
    }
  }
  evaluar(lista){
    let rpila=[...lista];
    let pila=[];
    let actual;
    do {
      actual=rpila.shift();
      if(Number.isFinite(actual)){
        pila.push(actual);
      }
      else if("^*/+-".indexOf(actual) !== -1){
        let op2=pila.pop();
        let op1=pila.pop();
        let res=this.operacion(actual,op1,op2);
        pila.push(res);
      }
      console.log("pila",pila)
    }while (rpila.length>0);
    return (pila.length==1)? pila[0]:Number.NaN;
  }

}
var ms = new Calculadora();
let op="-5.2 + 3 * 6 - ( 5 / 3 ) + 7";
console.log("parsear",ms.infixToPostfix(op).join(" "));
console.log(ms.evaluar(ms.infixToPostfix(op)));