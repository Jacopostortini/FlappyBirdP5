console.log("const points = [");
for(let i = 0; i < 5000; i++){
    const x1 = Math.random();
    const x2 = Math.random();
    const y1 = x2 > x1/5 + 0.1 ? 1 : 0;
    const y2 = 1-y1;
    console.log("   {");
    console.log("       x: [["+x1+","+x2+"]],");
    console.log("       y: [["+y1+","+y2+"]]");
    console.log("   },");
}
console.log("];");

console.log();
console.log("const testPoints = [");
for(let i = 0; i < 100; i++){
    const x1 = Math.random();
    const x2 = Math.random();
    const y1 = x2 > x1/5 + 0.1 ? 1 : 0;
    const y2 = 1-y1;
    console.log("   {");
    console.log("       x: [["+x1+","+x2+"]],");
    console.log("       y: [["+y1+","+y2+"]]");
    console.log("   },");
}
console.log("];");