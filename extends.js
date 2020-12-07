class Animal {
  constructor() {
    console.log(123)
  }
}

class Dog extends Animal{
  constructor() {
    console.log(456)
    super(arguments)
  }
}
new Dog();