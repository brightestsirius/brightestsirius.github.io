export class User{
	constructor(name){
		this.name = name;
	}

	sayHello(){
		return `Hello, my name is ${this.name}`
	};
}