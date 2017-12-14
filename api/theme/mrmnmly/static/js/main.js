const servicesData = fetch('/static/assets/json/services.json');

(function(){
  Promise.all([servicesData]).then(servicesData => {
    servicesData[0].json().then(data => {
      console.log(data);
    });
  });
}());

alert('blaa');