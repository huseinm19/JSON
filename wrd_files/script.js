$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);
 
 
$("#forma").validate({
    rules:{
        ime:{
            regex:/^[a-zA-Z]+$/
        },
        adresa:{
            regex:/^[a-zA-Z]+$/
        },
        postanski:{
            regex:/^\d{5}$/
        },
        telefon:{
            regex:/^[+](\d{3})[-](\d{2})[-](\d{3})[-](\d{4})$/
        }
    }
})
 
//ZADATAK 2
var podaci=[];
 
function preuzmi(){
 
        var zahtjev = new XMLHttpRequest();
        var mojUrl = 'http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll';
       
       
       
        zahtjev.onload  = function() {
            if (zahtjev.status === 200) {  
                podaci=JSON.parse(zahtjev.responseText);
                addRows();
            }
            else {  
                alert("Server javlja grešku: " + zahtjev.statusText);  
            }  
        }
       
        zahtjev.onerror = function() {
            alert("Greška u komunikaciji sa serverom.");  
        };
       
        // zahtjev.setRequestHeader("Content-Type", "application/json");
        zahtjev.open("GET", mojUrl, true);
        zahtjev.send(null);
}
 
function addRows(){
    izbrisi();
    for (var i=0;i<podaci.length;i++){
        $("table tbody").append("<tr>"+
            "<td>"+podaci[i].narudzbaId+
            "</td>"+"<td>"+podaci[i].datumNarudzbe.slice(0,10)+
            "</td>"+"<td>"+podaci[i].dostavaIme+"</td>"+
            "<td>"+podaci[i].dostavaAdresa+"</td>"+
            "<td>"+podaci[i].dostavaPostanskiBroj+"</td>"+
            "<td>"+podaci[i].dostavaTelefon+"</td>"+
            "<td>"+podaci[i].napomena+"</td>"+
            "</tr>");
    }
}
 
function izbrisi(){
    $("table tbody").empty();
}
 
function Dodaj(){
    var zahtjev = new XMLHttpRequest();
    var mojUrl = "http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj";
   
    var obj ={
        dostavaAdresa:$("#dostavaAdresa").val(),
        dostavaIme:$("#dostavaIme").val(),
        dostavaPostanskiBroj:$("#dostavaPostanskiBroj").val(),
        dostavaTelefon:$("#dostavaTelefon").val(),
        napomena:$("#napomena").val()
    }
   
   
    zahtjev.onload  = function() {
        if (zahtjev.status === 200) {
            preuzmi();
        }
        else {  
            alert("Server javlja grešku: " + zahtjev.statusText);  
        }  
    }
   
    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");  
    };
   
    zahtjev.open("POST", mojUrl, true);
    zahtjev.setRequestHeader("Content-Type", "application/json");
    zahtjev.send(JSON.stringify(obj));
}
 
preuzmi();
 
function Trazenje(a){
    izbrisi();
   
    for (var i=0;i<podaci.length;i++){
        if(podaci[i].dostavaIme.startsWith(a)){
            $("table tbody").append("<tr>"+
                "<td>"+podaci[i].narudzbaId+
                "</td>"+"<td>"+podaci[i].datumNarudzbe.slice(0,10)+
                "</td>"+"<td>"+podaci[i].dostavaIme+"</td>"+
                "<td>"+podaci[i].dostavaAdresa+"</td>"+
                "<td>"+podaci[i].dostavaPostanskiBroj+"</td>"+
                "<td>"+podaci[i].dostavaTelefon+"</td>"+
                "<td>"+podaci[i].napomena+"</td>"+
                "</tr>");
        }
 
    }
}
 
$("#filtiranje").on("change",function(){
    var vrijednost=$("#filtiranje").val();
    Trazenje(vrijednost);
})