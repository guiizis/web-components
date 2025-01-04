// just some basics features of js
var myName = 'test'
console.log(myName)

myName = 'test2'
console.log(myName)

let myNameLet = 'test'
console.log(myNameLet)

myNameLet = 'test2'
console.log(myNameLet)

// arrow function

function myNormalFunction() {
  console.log('myNormalFunction', this)
}

const myFunc = name => {
  this.name = 'test'
  console.log('myFunc', this)
}

myNormalFunction()
myFunc()