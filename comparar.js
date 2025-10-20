// Jayr Adrian Rodriguez Hernandez

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("Escribe el primer número: ", num1 => {
    readline.question("Escribe el segundo número: ", num2 => {
        num1 = Number(num1);
        num2 = Number(num2);

        if (num1 > num2) {
            console.log(num1 + " es mayor que " + num2);
        } else if (num1 < num2) {
            console.log(num1 + " es menor que " + num2);
        } else {
            console.log("Los dos números son iguales");
        }

        readline.close();
    });
});
