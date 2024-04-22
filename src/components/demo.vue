// Questions // semantic tag? specific meaning benefit ( code optimization and
//SEO) // // Head Tag to iclude some css files and title meta description and js
//files // use defer attribute in script to put on top // attribute additional
//information . //diference btw div vs span ? block level and inline // css full
//form //cascading means? //important keyword in css //box model //box sizing
//border-box content-box //data types? //primitive vs non-primitive. // DOM
//document means html documnet // object repesentation of html document //in DOM
//every html element will be represented //and html have tree type structure //
// like parent to child ... //10 rupee // 10 crore //algorithm ki time
//complexity k liye big 0 notation //time c is a function //big off 1 //
///////////////////////////// constant /* Types of Time Complexity 1. Constant
// time complexity 2. Linear time complexity 3. Quadratic time complexity*/
//login time compexity (binary search me use hota hai log(n)) //what is log in
// maths??? // 0(n log n) goood notation commonlyy in sorting //exponential time
// complexity is used in recursion 0(2 n ) //recursion me decision tree bnta //
// hai. to better this exponential tc we use dynamic programming like //
//memoaization// // and tabulation //last is n fictorial (n!) // n fictorial //
// generally used when we calculate permutations // 1 sec k andr hum 10 ki power
// 8 operations perfom krwa skty hain. //n > 10'8 0(log(n)) // router/index.js
//............................................................................//
next(); } }); async hashedPassword = () => { const salt = bcrypt.saltSync(10);
const hashed = await bcrypt.hashSync( this.form.passoword , salt); return
hashed; } // this function return a promise because it is asynchronous function
// and if not right return then it will return undefined
