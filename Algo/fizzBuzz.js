function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    console.log((i % 3 ? "" : "fizz") + (i % 5 ? "" : "buzz") || i);
  }
}

fizzBuzz(100);
