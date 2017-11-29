function1() {
  return fetch().then(result => result.json()).
}

function2() {
  return new Promise((resolve, reject) => {
    resolve(1);
  }).then(one => one + 1)
}

Promise.All([function1(), function2()]).then(([promise1return, promise2return]) => {

})

function fetchReddit() {
  return fetch(a).then().then(return transformedData)
}

fetchReddit().then(transformedData => setState({}))
