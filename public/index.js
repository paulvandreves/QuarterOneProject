$(document).ready(function () {
 $('.carousal').slick({
  dots: true,
  adaptiveHeight: true
 });

 // X1 - ZWz19did0vy0az_3v2ae zillow identifer
 // search results api then zestimate
 $(".zestimate").click(function () {
  var streetNum = $(".streetNum").val();
  var streetName = $(".streetName").val();
  var streetType = $(".streetType").val();
  var city = $(".city").val();
  var state = $(".state").val();


  // ` back-tick  denotes template literal.
  $.get(`https://galvanize-cors-proxy.herokuapp.com/http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19did0vy0az_3v2ae&address=${streetNum}+${streetName}+${streetType}&citystatezip=${city}%2C+${state}`)
   // calls to get search results api
   // $(selector).append(content,function(index,html))
   .then(function (results) {
    console.log(results);
    var zpid = results.querySelector('zpid').innerHTML;
    // append the price of the house
    console.log(zpid);

    var zillowurl = `https://galvanize-cors-proxy.herokuapp.com/http://www.zillow.com/homedetails/${zpid}_zpid/`
    // set zpid equal to house enterted into form
    $.ajax({
      type: 'Get',
      url: zillowurl,
      xhrFeilds: {
       withCredentials: false
      },

     })
     .then(function (result) {
      var upsells = $($.parseHTML(result))
       .find('#home-digs-upsell')
       .find('.digs-value-project')
       .map(function (i, tr) {
        //console.log(tr)
        // we nedd to find the name of the element that contains the estimated appeation for that remodel name
        return [
         $(tr).find("td").eq(0).find('a').text(),
         $(tr).find("td").eq(2).text() // value of estimated equity improvment
        ];
       })
      var j = 1;
      for (var i = 0; i < upsells.length; i += 2) {
       var tableRow = $('<tr>');
       var remodel = $('<td>').text(upsells[i]);
       var valGanied = $('<td>').text(upsells[j]);
       tableRow.append(remodel, valGanied);
       $('.possibleEquity').append(tableRow);
       j += 2;
      }

      console.log(upsells); // returns an array of the Name of the project and the cost of that project
     })
   })

 })
});
