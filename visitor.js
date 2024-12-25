//Интерфейс Посетителя
class Visitor {
  visitSport(car) {}
  visitCompact(car) {}
}

//Конкретный Посетитель
class ConcreteVisitor extends Visitor {
  visitSport(car) {
    console.log(`Visited Sport: ${car.model}`);
  }

  visitCompact(car) {
    console.log(`Visited Compact: ${car.model}`);
  }
}

//Интерфейс Элемента
class Car {
  accept(visitor) {}
}

//Конкретные Элементы
class Sport extends Car {
  constructor(model) {
    super();
    this.model = model;
  }

  accept(visitor) {
    visitor.visitSport(this);
  }
}

class Compact extends Car {
  constructor(model) {
    super();
    this.model = model;
  }

  accept(visitor) {
    visitor.visitCompact(this);
  }
}

// Интрузивный метод
class IntrusiveSport extends Sport {
  accept(visitor) {
    visitor.visitSport(this);
  }
}

// Рефлексивный метод
class ReflectiveVisitor {
  visit(car) {
    const methodName = `visit${car.constructor.name}`;
    if (typeof this[methodName] === "function") {
      this[methodName](car);
    } else {
      console.log(`No visit method for ${car.constructor.name}`);
    }
  }

  visitSport(car) {
    console.log(`Reflectively visited Sport: ${car.model}`);
  }

  visitCompact(car) {
    console.log(`Reflectively visited Compact: ${car.model}`);
  }
}
const cars = [new Sport("Ferrari 488"), new Compact("Honda Fit")];
const visitor = new ConcreteVisitor();

// Классический метод
cars.forEach((car) => car.accept(visitor));

// Интрузивный метод
const intrusiveSport = new IntrusiveSport("Porsche 911");
intrusiveSport.accept(visitor);

// Рефлексивный метод
const reflectiveVisitor = new ReflectiveVisitor();
cars.forEach((car) => reflectiveVisitor.visit(car));

//Классы Sport и Compact реализуют метод accept для принятия посетителя. Класс ConcreteVisitor реализует методы для выполнения операций над элементами.
// Интрузивный метод представлен классом IntrusiveSport, а рефлексивный метод реализован в классе ReflectiveVisitor.
