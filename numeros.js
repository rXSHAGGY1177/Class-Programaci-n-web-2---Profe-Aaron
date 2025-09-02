// Jayr Adrian Rodriguez Hernandez

let num1 = 10;
let num2 = 25;
let num3 = 15;

if (num1 > num2 && num1 > num3) {
    console.log("El mayor es: " + num1);
} else if (num2 > num1 && num2 > num3) {
    console.log("El mayor es: " + num2);
} else if (num3 > num1 && num3 > num2) {
    console.log("El mayor es: " + num3);
} else {
    console.log("Hay números iguales");
}

if (num1 < num2 && num1 < num3) {
    console.log("El menor es: " + num1);
} else if (num2 < num1 && num2 < num3) {
    console.log("El menor es: " + num2);
} else if (num3 < num1 && num3 < num2) {
    console.log("El menor es: " + num3);
} else {
    console.log("Hay números iguales");
}
